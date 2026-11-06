import { visualArt } from './art';

import { LISTINGS, PRINT_DIMS, offersFor } from './listings';

/*
  The store is derived from the gallery rather than duplicated from it, so a
  piece only ever has one set of photos, one colour, and one spelling of its
  title. What's for sale and for how much lives in ./listings.js, which the
  checkout server reads as well.
*/

function buildItems() {
  const items = [];

  for (const piece of visualArt) {
    const listing = LISTINGS[piece.title];

    for (const { kind, id, title, price, stock } of offersFor(piece.title)) {
      const base = {
        art:    piece.title,
        images: piece.images,   // 2200px, for the detail modal
        thumbs: piece.thumbs,   // 1000px, for the masonry grid
        color:  piece.color,
        id, title, price, stock,
      };

      if (kind === 'print') {
        const { size, edition, label = 'Print' } = listing.print;
        items.push({
          ...base,
          category: 'prints',
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

      if (kind === 'digital') {
        items.push({
          ...base,
          category: 'digital',
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

      if (kind === 'original') {
        items.push({
          ...base,
          category: 'originals',
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
