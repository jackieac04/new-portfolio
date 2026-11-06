import { visualArt } from './art';

/*
  The store is derived from the gallery rather than duplicated from it, so a
  piece only ever has one set of photos, one colour, and one spelling of its
  title. LISTINGS below is the only hand-maintained part: what each artwork is
  actually for sale as, and for how much.

  Prices are placeholder tiers -- small / mid / large for prints, and a flat
  number for one-of-a-kind work. Edit the numbers here; everything else
  (images, colour, medium, dimensions) follows the artwork automatically.

  Shape:
    print:    { price, size, edition? }  -> a reproduction, stock > 1
    original: { price, note? }           -> the actual object, stock 1
  Omit either key to not sell that form. A piece with neither is not listed.
*/

const PRINT_TIER = {
  small: 1000, // up to ~8x10
  mid:   1500, // up to ~11x14
  large: 5000, // bigger than that
};

const LISTINGS = {
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

const PRINT_DIMS = {
  small: '8×10 in / 20×25 cm',
  mid:   '11×14 in / 28×35 cm',
  large: '18×24 in / 46×61 cm',
};

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function buildItems() {
  const items = [];

  for (const piece of visualArt) {
    const listing = LISTINGS[piece.title];
    if (!listing) continue;

    const base = {
      art:    piece.title,
      images: piece.images,   // 2200px, for the detail modal
      thumbs: piece.thumbs,   // 1000px, for the masonry grid
      color:  piece.color,
    };

    if (listing.print) {
      const { size, edition, label = 'Print' } = listing.print;
      items.push({
        ...base,
        id:       `print-${slug(piece.title)}`,
        title:    `${piece.title} — ${label}`,
        price:    listing.print.price ?? PRINT_TIER[size],
        category: 'prints',
        stock:    edition ?? 25,
        badge:    edition ? `Edition of ${edition}` : undefined,
        description: `${piece.description} Reproduced as an archival ${label.toLowerCase()} on 300gsm fine art paper with pigment inks.`,
        details: [
          PRINT_DIMS[size],
          `After the original ${piece.medium.toLowerCase()}, ${piece.year}`,
          edition ? `Limited edition of ${edition}, signed & numbered` : 'Signed on the reverse',
          'Unframed · ships flat in 5–7 business days',
        ],
      });
    }

    if (listing.digital) {
      items.push({
        ...base,
        id:       `digital-${slug(piece.title)}`,
        title:    `${piece.title} — Digital Download`,
        price:    listing.digital.price,
        category: 'digital',
        stock:    999,
        badge:    'Digital',
        description: `${piece.description} Delivered as high-resolution files to print at home or at a local shop.`,
        details: [
          'Instant download after purchase',
          '300 DPI · JPEG + PNG',
          'Multiple print sizes included',
          'For personal use',
        ],
      });
    }

    if (listing.original) {
      items.push({
        ...base,
        id:       `original-${slug(piece.title)}`,
        title:    `${piece.title} — Original`,
        price:    listing.original.price,
        category: 'originals',
        stock:    1,
        badge:    'One of a Kind',
        description: `${piece.description}${listing.original.note ? ` ${listing.original.note}` : ''}`,
        details: [
          piece.dimensions || 'Dimensions on request',
          piece.medium,
          `${piece.year} · signed`,
          'One of a kind · packed and shipped with tracking',
        ].filter(Boolean),
      });
    }
  }

  return items;
}

export const storeItems = buildItems();

// Only offer filters that actually have something behind them.
export const storeCategories = [
  'All',
  ...['originals', 'prints', 'digital'].filter((c) =>
    storeItems.some((i) => i.category === c)
  ),
];
