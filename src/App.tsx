import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import WritingSection from './components/WritingSection';
import CVSection from './components/CVSection';
import ContactSection from './components/ContactSection';
import GallerySection from './components/GallerySection';
import { useChoreography } from './components/useChoreography';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ui } from './data/site';
import NotFound from './pages/NotFound';

/* Writing routes are split out — `marked` and the article bodies only download
   when someone actually opens an article, not on first paint of the home page. */
const ArticleIndex = lazy(() => import('./pages/ArticleIndex'));
const ArticleReader = lazy(() => import('./pages/ArticleReader'));
const StoryPage = lazy(() => import('./pages/StoryPage'));
const EditorPage = lazy(() => import('./pages/EditorPage'));

function HomePage() {
  useChoreography();
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
      <a
        href="#about"
        className="label"
        style={{
          position: 'absolute',
          insetInlineStart: '-9999px',
          top: 0,
          zIndex: 100,
          background: 'var(--bg-raised)',
          padding: '10px 16px',
          border: '1px solid var(--border-strong)',
        }}
        onFocus={(e) => { e.currentTarget.style.insetInlineStart = '12px'; e.currentTarget.style.top = '12px'; }}
        onBlur={(e) => { e.currentTarget.style.insetInlineStart = '-9999px'; }}
      >
        {t.skipToContent}
      </a>

      <SiteHeader />

      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <GallerySection />
        <WritingSection />
        <CVSection />
        <ContactSection />
      </main>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    /* `key` on the wrapper restarts the CSS enter animation on every route
       change — a page transition without pulling in an animation router. */
    <div key={location.pathname} className="route-enter">
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/writing" element={<ArticleIndex />} />
          <Route path="/writing/:slug" element={<ArticleReader />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatedRoutes />
      </LanguageProvider>
    </ThemeProvider>
  );
}
