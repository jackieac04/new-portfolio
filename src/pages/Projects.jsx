import { useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import Poster from '../components/Poster';
import { projects } from '../data/projects';
import './Projects.css';

const ALL_TAGS = ['All', ...new Set(projects.flatMap((p) => p.tags))];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const BREAKPOINTS = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="page-wrapper projects-page">
      <div className="container">
        <motion.div
          className="projects-header"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="section-title">projects</h1>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          className="projects-filters"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              className={`filter-btn ${activeTag === tag ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="masonry-grid"
          columnClassName="masonry-grid__col"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Poster
      index={index}
      to={`/projects/${project.id}`}
      className="project-card"
      style={{ '--poster-accent': project.color }}
      sticky={project.thumb ? { src: project.thumb } : undefined}
      aria-label={project.title}
    >
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="project-card__link project-card__link--primary"
          >
            Read more →
          </Link>
        </div>
      </div>
    </Poster>
  );
}
