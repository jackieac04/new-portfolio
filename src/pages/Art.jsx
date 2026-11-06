import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import Poster from '../components/Poster';
import { visualArt, writing, writingTagKind } from '../data/art';
import './Art.css';

const SIZE_HEIGHT = { tall: 280, wide: 180, square: 220 };

// Filter buttons, most-used tag first; ties keep the order tags first appear.
function tagsByCount(items) {
  const counts = new Map();
  for (const tag of items.flatMap((item) => item.tags ?? [])) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return ['All', ...[...counts].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)];
}
const VISUAL_TAGS = tagsByCount(visualArt);
// Writing filters come in two groups -- themes on the left, structure on the
// right -- each ordered by how many pieces use the tag.
const WRITING_TAG_GROUPS = (() => {
  const [, ...tags] = tagsByCount(writing);
  return {
    theme: ['All', ...tags.filter((tag) => writingTagKind(tag) === 'theme')],
    structure: tags.filter((tag) => writingTagKind(tag) === 'structure'),
  };
})();
const WRITING_TAG_RANK = new Map(
  [...WRITING_TAG_GROUPS.theme, ...WRITING_TAG_GROUPS.structure].map((tag, i) => [tag, i]),
);

const withTag = (items, tag) =>
  tag === 'All' ? items : items.filter((item) => item.tags?.includes(tag));

const BREAKPOINTS = { default: 4, 1000: 3, 700: 2, 420: 1 };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Art() {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab || 'visual');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [visualTag, setVisualTag] = useState('All');
  const [writingTag, setWritingTag] = useState('All');

  // Dev-only "arrange" mode: a working copy of the gallery order to drag
  // around, saved back to src/data/art-order.json by the Vite dev server.
  const [arranged, setArranged] = useState(null);
  const arranging = arranged !== null;

  const visibleArt = arranging ? arranged : withTag(visualArt, visualTag);
  const visibleWriting = withTag(writing, writingTag);

  const openModal = useCallback((piece) => setSelectedPiece(piece), []);
  const closeModal = useCallback(() => setSelectedPiece(null), []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  return (
    <div className="page-wrapper art-page">
      <div className="container">
        <motion.div className="art-header" variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="section-title">art</h1>
        </motion.div>

        {/* Sub-tabs */}
        <motion.div className="art-tabs" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <button className={`art-tab ${tab === 'visual' ? 'art-tab--active' : ''}`} onClick={() => setTab('visual')}>
             Visual Art
          </button>
          <button className={`art-tab ${tab === 'writing' ? 'art-tab--active' : ''}`} onClick={() => setTab('writing')}>
            Writing
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === 'visual' ? (
            <motion.div key="visual" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.35 }}>
              {import.meta.env.DEV && (
                <ArrangeBar arranged={arranged} setArranged={setArranged} />
              )}
              {!arranging && (
                <TagFilter tags={VISUAL_TAGS} active={visualTag} onChange={setVisualTag} />
              )}
              <Masonry breakpointCols={BREAKPOINTS} className={`masonry-grid ${arranging ? 'masonry-grid--arranging' : ''}`} columnClassName="masonry-grid__col">
                {visibleArt.map((piece, i) => (
                  <motion.div key={piece.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                    {arranging ? (
                      <ArrangeSlot index={i} setArranged={setArranged}>
                        <ArtCard piece={piece} index={i} onOpen={() => {}} />
                      </ArrangeSlot>
                    ) : (
                      <ArtCard piece={piece} index={i} onOpen={() => openModal(piece)} />
                    )}
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>
          ) : (
            <motion.div key="writing" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
              <TagFilter
                tags={WRITING_TAG_GROUPS.theme}
                aside={WRITING_TAG_GROUPS.structure}
                active={writingTag}
                onChange={setWritingTag}
                limit={{ tags: 9, aside: 6 }}
              />
              <div className="writing-grid">
                {visibleWriting.map((piece, i) => (
                  <motion.div key={piece.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                    <WritingCard piece={piece} index={i} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Art Detail Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <ArtModal piece={selectedPiece} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Tag filter (same buttons as the projects page) ── */
// `aside` is an optional second group set off to the right (structure tags
// on the writing tab). With `limit`, each group shows only its first few tags
// until "more" is pressed; the active tag always stays visible.
function TagFilter({ tags, aside, active, onChange, limit }) {
  const [expanded, setExpanded] = useState(false);
  const shown = (list, n) => (expanded || !n || list.length <= n
    ? list
    : list.filter((tag, i) => i < n || tag === active));
  const hidden = limit
    ? (tags.length - shown(tags, limit.tags).length) + ((aside?.length ?? 0) - shown(aside ?? [], limit.aside).length)
    : 0;

  const buttons = (list) => list.map((tag) => (
    <button
      key={tag}
      className={`filter-btn ${active === tag ? 'filter-btn--active' : ''}`}
      onClick={() => onChange(tag)}
    >
      {tag}
    </button>
  ));
  const toggle = (expanded || hidden > 0) && (
    <button className="filter-btn filter-btn--more" onClick={() => setExpanded((v) => !v)}>
      {expanded ? 'less' : `+ ${hidden} more`}
    </button>
  );

  if (!aside?.length) {
    return <div className="art-filters">{buttons(shown(tags, limit?.tags))}{toggle}</div>;
  }
  return (
    <div className="art-filters art-filters--split">
      <div className="art-filters__group">{buttons(shown(tags, limit?.tags))}{toggle}</div>
      <div className="art-filters__group art-filters__group--aside">{buttons(shown(aside, limit?.aside))}</div>
    </div>
  );
}

/* ── Arrange mode (dev only) ── */
function ArrangeBar({ arranged, setArranged }) {
  const [status, setStatus] = useState('');

  const save = async () => {
    setStatus('saving…');
    const res = await fetch('/__art-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arranged.map((piece) => piece.title)),
    });
    if (res.ok) {
      setStatus('saved');
      setArranged(null);
    } else {
      setStatus(`couldn't save: ${await res.text()}`);
    }
  };

  if (!arranged) {
    return (
      <div className="arrange-bar">
        <button className="filter-btn" onClick={() => { setStatus(''); setArranged([...visualArt]); }}>
          arrange
        </button>
        {status && <span className="arrange-bar__status">{status}</span>}
      </div>
    );
  }
  return (
    <div className="arrange-bar arrange-bar--active">
      <span className="arrange-bar__hint">drag a piece onto another to take its spot</span>
      <button className="filter-btn filter-btn--active" onClick={save}>save</button>
      <button className="filter-btn" onClick={() => { setStatus(''); setArranged(null); }}>cancel</button>
      {status && <span className="arrange-bar__status">{status}</span>}
    </div>
  );
}

function ArrangeSlot({ index, setArranged, children }) {
  const [over, setOver] = useState(false);

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const from = Number(e.dataTransfer.getData('text/plain'));
    if (Number.isNaN(from) || from === index) return;
    setArranged((list) => {
      const next = [...list];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  };

  return (
    <div
      className={`arrange-slot ${over ? 'arrange-slot--over' : ''}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', String(index));
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
      onDragEnter={() => setOver(true)}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOver(false); }}
      onDrop={onDrop}
      // Clicking a card would open its modal; while arranging it does nothing.
      onClickCapture={(e) => { e.stopPropagation(); e.preventDefault(); }}
    >
      <span className="arrange-slot__number">{index + 1}</span>
      {children}
    </div>
  );
}

/* ── Art Card (masonry tile) ── */
function ArtCard({ piece, index, onOpen }) {
  const hasImage = piece.images && piece.images.length > 0;
  const h = SIZE_HEIGHT[piece.size] || 220;
  return (
    <Poster
      index={index}
      onActivate={onOpen}
      className="art-card"
      style={{ '--poster-accent': piece.color }}
      aria-label={`View ${piece.title}`}
    >
      <div className="art-card__image" style={{ height: hasImage ? undefined : h, background: `linear-gradient(135deg, ${piece.color}cc, ${piece.color}66)` }}>
        {hasImage ? (
          <img
            src={(piece.thumbs?.[0]) || piece.images[0]}
            alt={piece.title}
            className="art-card__img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="art-card__image-placeholder"><span>🎨</span></div>
        )}
        <div className="art-card__hover-overlay">
          <span>view details</span>
          {piece.images.length > 1 && (
            <span className="art-card__count">+{piece.images.length} photos</span>
          )}
        </div>
      </div>
      <div className="art-card__body">
        <div className="art-card__meta">
          <span className="art-card__medium">{piece.medium}</span>
          <span className="art-card__year">{piece.year}</span>
        </div>
        <h3 className="art-card__title">{piece.title}</h3>
      </div>
    </Poster>
  );
}

/* ── Art Detail Modal with image swiper ── */
const swipeVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir < 0 ? '60%' : '-60%', opacity: 0, transition: { duration: 0.2 } }),
};

function ArtModal({ piece, onClose }) {
  const images = piece.images && piece.images.length > 0 ? piece.images : [null];
  const thumbs = piece.thumbs || [];
  const [imgIdx, setImgIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir) => {
    setDirection(dir);
    setImgIdx((i) => (i + dir + images.length) % images.length);
  };

  // swipe gesture support
  const [dragStart, setDragStart] = useState(null);
  const onDragStart = (e) => setDragStart(e.clientX ?? e.touches?.[0]?.clientX);
  const onDragEnd = (e) => {
    if (dragStart === null) return;
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50) paginate(diff > 0 ? 1 : -1);
    setDragStart(null);
  };

  return (
    <>
      <motion.div
        className="art-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="art-modal"
        role="dialog"
        aria-modal="true"
        aria-label={piece.title}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {/* Image panel */}
        <div
          className="art-modal__image-panel"
          style={{ '--modal-color': piece.color }}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          <div className="art-modal__image-track">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={imgIdx}
                className="art-modal__image-slide"
                custom={direction}
                variants={swipeVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {images[imgIdx] ? (
                  <img
                    src={images[imgIdx]}
                    /* The grid already fetched the thumbnail, so the browser
                       can paint it instantly and swap in the full file when it
                       lands -- no empty panel while a 2200px WebP downloads. */
                    style={thumbs[imgIdx] ? {
                      backgroundImage: `url(${thumbs[imgIdx]})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    } : undefined}
                    alt={`${piece.title} — ${imgIdx + 1} of ${images.length}`}
                    className="art-modal__img"
                    draggable="false"
                  />
                ) : (
                  <div className="art-modal__placeholder" style={{ background: `linear-gradient(135deg, ${piece.color}cc, ${piece.color}44)` }}>
                    <span>🎨</span>
                    <p>Add your photos to<br /><code>src/data/art.js</code></p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* prev / next */}
          {images.length > 1 && (
            <>
              <button className="art-modal__nav art-modal__nav--prev" onClick={(e) => { e.stopPropagation(); paginate(-1); }} aria-label="Previous image">‹</button>
              <button className="art-modal__nav art-modal__nav--next" onClick={(e) => { e.stopPropagation(); paginate(1); }} aria-label="Next image">›</button>
              <div className="art-modal__dots">
                {images.map((_, i) => (
                  <button key={i} className={`art-modal__dot ${i === imgIdx ? 'art-modal__dot--active' : ''}`} onClick={(e) => { e.stopPropagation(); setDirection(i > imgIdx ? 1 : -1); setImgIdx(i); }} aria-label={`Image ${i + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info panel */}
        <div className="art-modal__info">
          <button className="art-modal__close" onClick={onClose} aria-label="Close">✕</button>

          <div className="art-modal__badges">
            <span className="tag">{piece.medium}</span>
            <span className="art-modal__year">{piece.year}</span>
          </div>

          <h2 className="art-modal__title">{piece.title}</h2>

          {piece.dimensions && (
            <p className="art-modal__dims">{piece.dimensions}</p>
          )}

          <p className="art-modal__desc">{piece.description}</p>

          <div className="art-modal__instagram">
            <a href="https://instagram.com/leafysheepy" target="_blank" rel="noopener noreferrer" className="art-modal__ig-link">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @leafysheepy
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ── Writing Card ── */
function WritingCard({ piece, index }) {
  return (
    <Poster
      index={index}
      to={`/writing/${piece.id}`}
      className="writing-card"
      style={{ '--poster-accent': piece.color }}
      aria-label={piece.title}
    >
      <div className="writing-card__body">
        <div className="writing-card__meta">
          <span className="tag">{piece.genre}</span>
          <span className="writing-card__date">{piece.date}</span>
        </div>
        <h3 className="writing-card__title">{piece.title}</h3>
        <blockquote className="writing-card__excerpt">&ldquo;{piece.excerpt}&rdquo;</blockquote>
        {piece.tags?.length > 0 && (
          <div className="writing-card__tags">
            {['theme', 'structure'].map((kind) => {
              const tags = piece.tags
                .filter((tag) => writingTagKind(tag) === kind)
                .sort((x, y) => WRITING_TAG_RANK.get(x) - WRITING_TAG_RANK.get(y));
              return tags.length > 0 && (
                <span key={kind} className={`writing-card__tag-group writing-card__tag-group--${kind}`}>
                  {tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </span>
              );
            })}
          </div>
        )}
        <div className="writing-card__footer">
          <span className="writing-card__read-time">{piece.readTime}</span>
          <span className="writing-card__read-btn">read more →</span>
        </div>
      </div>
    </Poster>
  );
}
