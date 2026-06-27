import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LeftColumn from './components/LeftColumn';
import MiddleColumn from './components/MiddleColumn';
import RightColumn from './components/RightColumn';
import PostDetail from './components/PostDetail';
import ContactModal from './components/ContactModal';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { initialBlogPosts } from './data/blogPosts';
import NotFound from './pages/NotFound';

function ToggleBar() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const btnStyle = {
    fontSize: '12px', fontFamily: "'Space Mono', monospace", color: 'var(--text-charcoal)',
    background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s ease', letterSpacing: '0.05em',
  };

  return (
    <div className="flex items-center gap-4">
      <button style={btnStyle} onClick={toggleLanguage}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--accent-teal)'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-charcoal)'; }}
      >
        {language === 'en' ? 'عربي' : 'EN'}
      </button>
      <button style={btnStyle} onClick={toggleTheme}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--accent-teal)'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-charcoal)'; }}
      >
        {theme === 'light' ? 'DARK' : 'LIGHT'}
      </button>
    </div>
  );
}

function HomePage() {
  const [showContact, setShowContact] = useState(false);
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-warm-white)' }}>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6" style={{ height: '40px', zIndex: 50, backgroundColor: 'transparent' }}>
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setMobileLeftOpen(!mobileLeftOpen)}
            style={{ fontSize: '12px', color: 'var(--text-charcoal)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            {mobileLeftOpen ? '✕' : '☰'}
          </button>
          <span style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-charcoal)' }}>
            YOUSSEF ALI (ENGINEER)
          </span>
        </div>
        <ToggleBar />
      </header>

      <div className="flex flex-col md:flex-row" style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }}>
        {mobileLeftOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileLeftOpen(false)} />
            <div className="relative h-full">
              <LeftColumn onContactClick={() => { setShowContact(true); setMobileLeftOpen(false); }} />
            </div>
          </div>
        )}

        <aside className="hidden md:block" style={{ width: '21%', minWidth: '160px' }}>
          <div className="sticky top-0 h-screen overflow-y-auto" style={{ borderRight: '1px solid var(--border-light)', position: 'relative' }}>
            <LeftColumn onContactClick={() => setShowContact(true)} />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto w-full" style={{ borderRight: 'none', borderBottom: '1px solid var(--border-light)', height: 'auto', minHeight: '100vh', scrollBehavior: 'smooth' }}>
          <div className="p-4 md:p-6 pb-24">
            <MiddleColumn posts={initialBlogPosts} />
          </div>
        </main>

        <aside className="hidden md:block" style={{ width: '25%', minWidth: '200px' }}>
          <div className="sticky top-0 h-screen overflow-y-auto" style={{ position: 'relative' }}>
            <RightColumn />
          </div>
        </aside>

        {mobileRightOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileRightOpen(false)} />
            <div className="relative h-full">
              <RightColumn onClose={() => setMobileRightOpen(false)} />
            </div>
          </div>
        )}

        <button
          className="fixed bottom-4 right-4 md:hidden z-30"
          onClick={() => setMobileRightOpen(!mobileRightOpen)}
          style={{ fontSize: '12px', color: 'var(--text-charcoal)', background: 'var(--bg-warm-white)', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer', padding: '8px 12px', boxShadow: '0px 4px 15px rgba(0,0,0,0.08)', letterSpacing: '0.05em' }}
        >
          {mobileRightOpen ? '✕' : 'CV'}
        </button>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<PostDetail posts={initialBlogPosts} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}
