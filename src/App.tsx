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
        {language === 'zh' ? '中 / EN' : 'ZH / en'}
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-warm-white)' }}>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6" style={{ height: '40px', zIndex: 50, backgroundColor: 'transparent' }}>
        <span style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-charcoal)' }}>
          YOUSSEF ALI (ENGINEER)
        </span>
        <ToggleBar />
      </header>

      <div className="flex" style={{ paddingTop: '40px', height: '100vh' }}>
        <LeftColumn onContactClick={() => setShowContact(true)} />
        <MiddleColumn posts={initialBlogPosts} />
        <RightColumn />
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
