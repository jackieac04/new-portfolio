import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import './ProjectDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return (
      <div className="page-wrapper container" style={{ paddingTop: '120px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--warm-brown)' }}>
          Project not found.
        </h2>
        <Link to="/projects" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          ← back to projects
        </Link>
      </div>
    );
  }

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="page-wrapper project-detail">
      {/* Hero band */}
      <div
        className="pd-hero"
        style={{ '--project-color': project.color }}
      >
        <div className="pd-hero__bg" />
        <div className={`container pd-hero__layout${project.cover ? ' pd-hero__layout--cover' : ''}`}>
        <div className="pd-hero__content">
          <motion.button
            className="pd-back"
            onClick={() => navigate('/projects')}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            ← projects
          </motion.button>

          <motion.div
            className="pd-hero__meta"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {project.featured && <span className="pd-badge">featured</span>}
          </motion.div>

          <motion.h1
            className="pd-hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="pd-hero__tags"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </motion.div>

          <motion.div
            className="pd-hero__links"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            )}

          </motion.div>
        </div>

        {project.cover && (
          <motion.a
            href={project.cover.src}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-hero__cover"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
          >
            <img src={project.cover.src} alt={project.cover.alt} />
          </motion.a>
        )}
        </div>
      </div>

      {/* Body */}
      <div className="pd-body container">
        <div className="pd-grid">
          {/* Main content */}
          <div className="pd-main">
            <motion.section
              className="pd-section"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="pd-section__title">about this project</h2>
              {project.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="pd-prose">{para}</p>
              ))}
            </motion.section>

            {project.images?.length > 0 && (
              <motion.section
                className="pd-section"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <h2 className="pd-section__title">screenshots</h2>
                <div className="pd-gallery">
                  {project.images.map((img) => (
                    <a
                      key={img.src}
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-gallery__item"
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </a>
                  ))}
                </div>
              </motion.section>
            )}

            {project.highlights && (
              <motion.section
                className="pd-section"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <h2 className="pd-section__title">highlights</h2>
                <ul className="pd-highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="pd-highlights__dot" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="pd-sidebar">
            {project.techStack && (
              <motion.div
                className="pd-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="pd-card__title">tech stack</h3>
                <div className="pd-stack">
                  {project.techStack.map((t) => (
                    <div key={t.name} className="pd-stack__item">
                      <span className="pd-stack__name">{t.name}</span>
                      <span className="pd-stack__role">{t.role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </aside>
        </div>

        {/* More projects */}
        {otherProjects.length > 0 && (
          <motion.section
            className="pd-more"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="pd-section__title" style={{ marginBottom: '1.5rem' }}>more projects</h2>
            <div className="pd-more__grid">
              {otherProjects.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className="pd-more__card" style={{ '--pc': p.color }}>
                  <div className="pd-more__card-color" />
                  <div className="pd-more__card-body">
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    <span>view →</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
