import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { writing } from '../data/art';
import './WritingDetail.css';

const PROSE_GENRES = ['Essay', 'Short Story'];

function Stanza({ text, right }) {
  return (
    <div className={`wd-stanza ${right ? 'wd-stanza--right' : ''}`}>
      {text.split('\n').map((line, li) => (
        <span key={li} className="wd-line">
          {line || <>&nbsp;</>}
        </span>
      ))}
    </div>
  );
}

const firstLine = (stanza = '') => stanza.trim().split('\n')[0];

/*
  Stanzas are split on \n\n. A run of stanzas named in layout.columns (by
  their first lines) is grouped into one row so they render side by side;
  everything else is a row of one.
*/
function stanzaRows(piece) {
  const stanzas = piece.content.split('\n\n');
  const groups = piece.layout?.columns ?? [];
  const rows = [];
  for (let i = 0; i < stanzas.length; i++) {
    const group = groups.find((labels) =>
      labels.every((label, k) => firstLine(stanzas[i + k]) === label));
    if (group) {
      rows.push(stanzas.slice(i, i + group.length));
      i += group.length - 1;
    } else {
      rows.push([stanzas[i]]);
    }
  }
  return rows;
}

function renderContent(piece) {
  const isPoetry = !PROSE_GENRES.includes(piece.genre);

  if (isPoetry) {
    const centered = piece.layout?.align === 'center';
    const rightStanzas = piece.layout?.right ?? [];
    const isRight = (stanza) => rightStanzas.includes(firstLine(stanza));
    return (
      <div className={`wd-poetry ${centered ? 'wd-poetry--center' : ''}`}>
        {stanzaRows(piece).map((row, ri) => (
          row.length === 1 ? (
            <Stanza key={ri} text={row[0]} right={isRight(row[0])} />
          ) : (
            <div key={ri} className="wd-stanza-row">
              {row.map((stanza, si) => <Stanza key={si} text={stanza} right={isRight(stanza)} />)}
            </div>
          )
        ))}
      </div>
    );
  }

  // Prose: split on \n\n for paragraphs
  return (
    <div className="wd-prose">
      {piece.content.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function WritingDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const piece     = writing.find((w) => w.id === parseInt(id, 10));

  const currentIdx = writing.findIndex((w) => w.id === parseInt(id, 10));
  const prevPiece  = writing[currentIdx - 1] || null;
  const nextPiece  = writing[currentIdx + 1] || null;

  if (!piece) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '120px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-brown)' }}>
          Writing not found.
        </h2>
        <button
          className="btn btn-outline"
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/art', { state: { tab: 'writing' } })}
        >
          ← back to writing
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper wd-page">
      <div className={`container wd-container ${piece.layout?.align === 'center' ? 'wd-container--center' : ''}`}>
        {/* Back */}
        <motion.button
          className="wd-back"
          onClick={() => navigate('/art', { state: { tab: 'writing' } })}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          ← all writing
        </motion.button>

        {/* Header */}
        <motion.header className="wd-header" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="wd-meta">
            <span className="tag">{piece.genre}</span>
            <span className="wd-meta__date">{piece.date}</span>
            <span className="wd-meta__time">{piece.readTime}</span>
          </div>
          <h1 className="wd-title">{piece.title}</h1>
        </motion.header>

        {/* Divider */}
        <motion.div className="wd-divider" style={{ background: piece.color }} variants={fadeUp} initial="hidden" animate="visible" custom={1} />

        {/* Body */}
        <motion.article
          className="wd-article"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {renderContent(piece)}
        </motion.article>

        {/* Prev / Next */}
        <nav className="wd-nav">
          {prevPiece ? (
            <button className="wd-nav__btn" onClick={() => navigate(`/writing/${prevPiece.id}`)}>
              <span className="wd-nav__arrow">←</span>
              <span className="wd-nav__label">
                <small>previous</small>
                {prevPiece.title}
              </span>
            </button>
          ) : <div />}

          {nextPiece ? (
            <button className="wd-nav__btn wd-nav__btn--next" onClick={() => navigate(`/writing/${nextPiece.id}`)}>
              <span className="wd-nav__label wd-nav__label--right">
                <small>next</small>
                {nextPiece.title}
              </span>
              <span className="wd-nav__arrow">→</span>
            </button>
          ) : <div />}
        </nav>
      </div>
    </div>
  );
}
