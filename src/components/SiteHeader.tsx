import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ui } from '../data/site';

type NavItem = {
  id: string;
  key: string;
  isPage?: boolean;
};

const navItems: NavItem[] = [
  { id: 'about', key: 'navAbout' },
  { id: 'work', key: 'navWork' },
  { id: 'story', key: 'navStory', isPage: true },
  { id: 'writing', key: 'navWriting', isPage: true },
  { id: 'cv', key: 'navCV' },
  { id: 'contact', key: 'navContact' },
];

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = ui[language];
  const location = useLocation();
  const onHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) { setActive(''); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navItems.forEach(({ id, isPage }) => {
      if (isPage) return;
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const chip: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--step--1)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-grey)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 2px',
    transition: 'color 0.2s ease',
  };

  return (
    <header
      style={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg-warm-white) 85%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border-light)' : 'transparent'}`,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="shell flex items-center justify-between" style={{ height: '56px', gap: '1rem' }}>
        <Link
          to="/"
          className="label label-strong"
          style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Youssef Ali
        </Link>

        {/* Anchors only resolve on the home page; elsewhere they route home first. */}
        <nav aria-label="Sections" className="hidden sm:flex items-center" style={{ gap: 'clamp(0.75rem, 2vw, 1.75rem)' }}>
          {navItems.map(({ id, key, isPage }) => {
            if (isPage) {
              return (
                <Link
                  key={id}
                  to={`/${id}`}
                  className="label"
                  style={{
                    textDecoration: 'none',
                    color: location.pathname.startsWith(`/${id}`) ? 'var(--accent-teal)' : 'var(--text-grey)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {t[key]}
                </Link>
              );
            }
            return (
              <a
                key={id}
                href={onHome ? `#${id}` : `/#${id}`}
                className="label"
                style={{
                  textDecoration: 'none',
                  color: active === id ? 'var(--accent-teal)' : 'var(--text-grey)',
                  transition: 'color 0.2s ease',
                }}
              >
                {t[key]}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center" style={{ gap: '1rem' }}>
          <button
            type="button"
            style={chip}
            onClick={toggleLanguage}
            aria-label={t.toggleLang}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-teal)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-grey)'; }}
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>
          <button
            type="button"
            style={chip}
            onClick={toggleTheme}
            aria-label={t.toggleTheme}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-teal)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-grey)'; }}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
