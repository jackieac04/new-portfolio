require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express = require('express');
const cors    = require('cors');
const Stripe  = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌  STRIPE_SECRET_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

const stripe     = Stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const PORT       = process.env.PORT || 3001;

// Prices come from the same listings the store page renders, never from the
// request -- otherwise anyone could edit the cart and pay a cent.
const catalogReady = import('../src/data/listings.js').then((m) => m.catalog);

/* ── Originals: one of each, ever ─────────────
   There's no database -- Render's free disk is wiped on every restart -- so
   Stripe is the record. Every session that includes an original is tagged
   with metadata.originals; a paid one means sold, an open one means someone
   is at the payment page right now and the piece is held until it expires.
   This scans all sessions, which is fine at an art store's volume. */
const HOLD_MINUTES = 31; // Stripe's minimum session lifetime is 30; one spare for clock skew

async function originalsStatus() {
  const sold = new Set();
  const held = new Set();
  for await (const session of stripe.checkout.sessions.list({ limit: 100 })) {
    const ids = session.metadata?.originals?.split(',').filter(Boolean) ?? [];
    if (ids.length === 0) continue;
    if (session.status === 'complete' && session.payment_status !== 'unpaid') {
      ids.forEach((id) => sold.add(id));
    } else if (session.status === 'open') {
      ids.forEach((id) => held.add(id));
    }
  }
  return { sold, held };
}

// Checkouts that include an original run one at a time, so two shoppers
// can't both pass the check before either session exists.
let originalsLock = Promise.resolve();
function withOriginalsLock(fn) {
  const run = originalsLock.then(fn, fn);
  originalsLock = run.catch(() => {});
  return run;
}

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

/* ── Health check ────────────────────────────── */
app.get('/api/health', (_req, res) => res.json({ ok: true }));

/* ── Sold originals, for the store page ─────── */
app.get('/api/sold', async (_req, res) => {
  try {
    const { sold } = await originalsStatus();
    res.json({ sold: [...sold] });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Could not load availability.' });
  }
});

/* ── Create Stripe Checkout Session ─────────── */
app.post('/api/checkout', async (req, res) => {
  const { items } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }

  const catalog = await catalogReady;
  const lines = [];
  for (const item of items) {
    const offer = catalog.get(item?.id);
    if (!offer) {
      return res.status(400).json({ error: 'Something in your cart is no longer for sale.' });
    }
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > offer.stock) {
      return res.status(400).json({ error: `Invalid quantity for ${offer.title}.` });
    }
    lines.push({ offer, qty: item.qty, description: item.description });
  }

  const originals = lines.filter(({ offer }) => offer.kind === 'original').map(({ offer }) => offer);

  const createSession = async () => {
    if (originals.length > 0) {
      const { sold, held } = await originalsStatus();
      for (const offer of originals) {
        if (sold.has(offer.id)) {
          return { status: 409, error: `${offer.title} has already sold.` };
        }
        if (held.has(offer.id)) {
          return { status: 409, error: `Someone is checking out with ${offer.title} right now. Try again in a little while.` };
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lines.map(({ offer, qty, description }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: offer.title,
            ...(typeof description === 'string' && description ? { description: description.slice(0, 200) } : {}),
          },
          unit_amount: offer.price, // in cents
        },
        quantity: qty,
      })),
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US'] },
      ...(originals.length > 0 ? { metadata: { originals: originals.map((o) => o.id).join(',') } } : {}),
      expires_at: Math.floor(Date.now() / 1000) + HOLD_MINUTES * 60,
      success_url: `${CLIENT_URL}/store?success=true`,
      // Stripe fills in the id, so a shopper who backs out can release their hold.
      cancel_url:  `${CLIENT_URL}/store?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
    });
    return { url: session.url };
  };

  try {
    const result = originals.length > 0
      ? await withOriginalsLock(createSession)
      : await createSession();
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json({ url: result.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── Release a hold when the shopper backs out ─ */
app.post('/api/release', async (req, res) => {
  const { sessionId } = req.body ?? {};
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Missing session.' });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status === 'open') await stripe.checkout.sessions.expire(sessionId);
    res.json({ ok: true });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Could not release the hold.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅  Stripe server running at http://localhost:${PORT}`);
  console.log(`    Checkout endpoint: POST /api/checkout`);
});
