import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PondHero from '../components/PondHero';
import Poster from '../components/Poster';
import thumbSoftware from '../assets/thumbs/software.webp';
import thumbArt from '../assets/thumbs/art.webp';
import thumbStore from '../assets/thumbs/store.webp';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

// The signature is held back until the intro animation has mostly bloomed,
// so it arrives with the light rather than competing with it.
const sigIn = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.1 + i * 0.22, duration: 0.9, ease: 'easeOut' },
  }),
};

const HIGHLIGHTS = [
  {
    to: '/projects',
    label: 'Software',
    desc: 'web apps and side quests',
    color: 'var(--card-blue)',
    thumb: thumbSoftware,
  },
  {
    to: '/art',
    label: 'Art',
    desc: 'visual art and writing',
    color: 'var(--card-warm)',
    thumb: thumbArt,
  },
  {
    to: '/',
    label: 'Store',
    desc: 'originals and prints',
    color: 'var(--card-green)',
    thumb: thumbStore,
  },
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`home home--${theme}`}>
      <PondHero>
        <div className="pond-hero__sig">

          <motion.h1
            className="pond-hero__name"
            variants={sigIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Jaclyn
            <em>Cohen</em>
          </motion.h1>

          <motion.p
            className="pond-hero__role"
            variants={sigIn}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            software engineer &amp; artist
          </motion.p>

          <motion.div
            className="pond-hero__cta"
            variants={sigIn}
            initial="hidden"
            animate="visible"
            custom={3}
          >
          </motion.div>
        </div>

        <div className="pond-hero__scroll" aria-hidden="true">
        </div>
      </PondHero>

      {/* HIGHLIGHTS */}
      <section className="highlights container">
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Things I Make
        </motion.h2>
        <motion.p
          className="section-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          a little bit of everything
        </motion.p>

        <div className="highlights__grid">
          {HIGHLIGHTS.map(({ to, label, desc, color, thumb }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
            >
              <Poster
                index={i}
                to={to}
                className="highlight-card"
                style={{ '--card-color': color }}
                sticky={thumb ? { src: thumb } : undefined}
                aria-label={label}
              >
                <span className="highlight-card__spark" aria-hidden="true" />
                <h3 className="highlight-card__label">{label}</h3>
                <p className="highlight-card__desc">{desc}</p>
                <span className="highlight-card__arrow" aria-hidden="true">→</span>
              </Poster>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="about-strip paper-surface">
        <div className="about-strip__inner container">
          <motion.div
            className="about-strip__text"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="section-title">Things I Am</h2>
            <p>
              I&apos;m a software engineer at Bloomberg in the graphics engineering department working on Toaster, a chart-making app for news articles. I spend
              my free time cycling between as many art forms as I can get my hands on—  painting, sculpture, printmaking, photography, and poetry.
            </p>
            <p style={{ marginTop: '1rem' }}>
              I graduated from Brown University in 2026 with an Sc.B. in Computer Science and an A.B. in Visual Art, and I&apos;m currently based in New York City.
            </p>
            <p style={{ marginTop: '1rem' }}>
              I&apos;m always looking for new projects to work on and creative friends, so if you have an idea or want to collaborate, feel free to reach out!
            </p>
          </motion.div>
          <motion.div
            className="about-strip__deco"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div className="about-strip__blob" />
            <p aria-hidden="true" style={{ marginTop: '1rem' }}>P.S. The glasses are prescription!</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
