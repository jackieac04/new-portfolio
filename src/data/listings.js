/*
  What each artwork is actually for sale as, and for how much. Kept free of
  any Vite-only imports so the checkout server (server/index.js) can load it
  too: the server prices every order from this file, never from what the
  browser sends.

  Prices are placeholder tiers -- small / mid / large for prints, and a flat
  number for one-of-a-kind work. Edit the numbers here; everything else
  (images, colour, medium, dimensions) follows the artwork automatically.

  Shape:
    print:    { price?, size, edition?, label? } -> a reproduction, stock > 1
    digital:  { price }                          -> a download
    original: { price, note? }                   -> the actual object, stock 1
  Omit a key to not sell that form. A piece with none is not listed.
*/

export const PRINT_TIER = {
  small: 1000, // up to ~8x10
  mid:   1500, // up to ~11x14
  large: 5000, // bigger than that
};

export const PRINT_DIMS = {
  small: '8×10 in / 20×25 cm',
  mid:   '11×14 in / 28×35 cm',
  large: '18×24 in / 46×61 cm',
};

export const LISTINGS = {
  'A Handful':                        { original: { price: 3000 } },
  'Acrylic Paintings':                { },
  'Becoming':                         {  },
  'By the Pond':                      { print: { size: 'mid' }},
  'Digital Paintings':                { print: { size: 'small' } },
  'Egghunt':                          {  },
  'Fireflies':                        { print: { size: 'mid', edition: 15 } },
  'Geese':                            { print: { size: 'small', edition: 30 } },
  "Heart's Content":                  { print: { size: 'mid', edition: 20 } },
  'Little Home':                      {  },
  'Little Things I Love About Humans':{ original: { price: 6000 } },
  'Monoprints':                       { original: { price: 2000, note: 'Each monoprint is unique — email to choose which one.' } },
  'Moving On':                        { original: { price: 10000 } },
  'Passengers':                       {  },
  'Pigeons':                          { print: { size: 'mid', edition: 25 } },
  'Scraps':                           { },
  'Sketches':                         { },
  'Thank You':                        { print: { size: 'mid', edition: 16, label: 'Book' } },
  // Documentation of the thesis install rather than a work for sale.
  'Open-Hearted: Thesis Setup':       {},
};

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The sellable forms of one artwork, in display order. The id, title, price
// and stock here are the source of truth for both the store page and checkout.
export function offersFor(art) {
  const listing = LISTINGS[art];
  if (!listing) return [];
  const offers = [];

  if (listing.print) {
    const { size, edition, label = 'Print' } = listing.print;
    offers.push({
      kind:  'print',
      id:    `print-${slug(art)}`,
      title: `${art} — ${label}`,
      price: listing.print.price ?? PRINT_TIER[size],
      stock: edition ?? 25,
    });
  }
  if (listing.digital) {
    offers.push({
      kind:  'digital',
      id:    `digital-${slug(art)}`,
      title: `${art} — Digital Download`,
      price: listing.digital.price,
      stock: 999,
    });
  }
  if (listing.original) {
    offers.push({
      kind:  'original',
      id:    `original-${slug(art)}`,
      title: `${art} — Original`,
      price: listing.original.price,
      stock: 1,
    });
  }
  return offers;
}

// Every offer by id -- what the server looks orders up against.
export const catalog = new Map(
  Object.keys(LISTINGS).flatMap(offersFor).map((o) => [o.id, o])
);
