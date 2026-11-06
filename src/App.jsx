import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

const Home          = lazy(() => import('./pages/Home'));
const Projects      = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Art           = lazy(() => import('./pages/Art'));
const WritingDetail = lazy(() => import('./pages/WritingDetail'));
const Store         = lazy(() => import('./pages/Store'));

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"             element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects"     element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/art"          element={<PageTransition><Art /></PageTransition>} />
          <Route path="/writing/:id"  element={<PageTransition><WritingDetail /></PageTransition>} />
          <Route path="/store"        element={<PageTransition><Store /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
