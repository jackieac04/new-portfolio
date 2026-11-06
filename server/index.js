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

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

/* ── Health check ────────────────────────────── */
app.get('/api/health', (_req, res) => res.json({ ok: true }));

/* ── Create Stripe Checkout Session ─────────── */
app.post('/api/checkout', async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            ...(item.description ? { description: item.description.slice(0, 200) } : {}),
          },
          unit_amount: item.price, // in cents, already stored that way
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `${CLIENT_URL}/store?success=true`,
      cancel_url:  `${CLIENT_URL}/store?canceled=true`,
      // Collect shipping for physical items if needed:
      // shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB'] },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅  Stripe server running at http://localhost:${PORT}`);
  console.log(`    Checkout endpoint: POST /api/checkout`);
});
