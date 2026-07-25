import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { marked } from 'marked';
import SiteHeader from '../components/SiteHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { getArticle, formatDate } from '../lib/articles';
import { ui } from '../data/site';

marked.setOptions({ gfm: true, breaks: false });

export default function ArticleReader() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const t = ui[language];
  const article = slug ? getArticle(slug) : undefined;
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const html = useMemo(() => (article ? marked.parse(article.body) as string : ''), [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Youssef Ali`;
    return () => { document.title = 'Youssef Ali — Systems Engineer'; };
  }, [article]);

  // Reading progress. rAF-throttled and writes only a transform, so scrolling
  // never triggers layout.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  if (!article) {
    return (
      <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
        <SiteHeader />
        <main className="shell" style={{ paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: 'var(--section-gap)' }}>
          <h1 className="heading" style={{ marginBottom: '1rem' }}>{t.articleMissing}</h1>
          <Link to="/writing" className="label" style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}>
            ← {t.sectionWriting}
          </Link>
        </main>
      </div>
    );
  }

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.description, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  };

  const isRTL = article.lang === 'ar';

  return (
    <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, insetInline: 0, height: '2px', zIndex: 60,
          background: 'var(--accent-teal)', transformOrigin: 'left center',
          transform: `scaleX(${progress})`, willChange: 'transform',
        }}
      />
      <SiteHeader />

      <main
        className="shell"
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{ paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: 'var(--section-gap)' }}
      >
        <article style={{ maxWidth: '72ch', marginInline: 'auto' }}>
          <header style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
            <div className="flex flex-wrap items-center" style={{ gap: '0.5rem 1rem', marginBottom: '1.25rem' }}>
              <span className="label">{formatDate(article.date, article.lang)}</span>
              <span className="label" style={{ color: 'var(--text-faint)' }}>
                {article.readingMinutes} {t.minRead}
              </span>
              {article.tags.map((tag) => (
                <span key={tag} className="label" style={{ border: '1px solid var(--border-light)', borderRadius: '999px', padding: '2px 9px', letterSpacing: '0.06em' }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="display" style={{ fontSize: 'var(--step-2)', marginBottom: '1rem' }}>{article.title}</h1>
            {article.description && (
              <p className="subheading" style={{ color: 'var(--text-grey)' }}>{article.description}</p>
            )}

            <button
              type="button"
              onClick={share}
              className="label"
              style={{
                marginTop: '1.75rem', background: 'none', cursor: 'pointer',
                border: '1px solid var(--border-strong)', borderRadius: '999px',
                padding: '7px 16px', color: 'var(--text-charcoal)', transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-teal)'; e.currentTarget.style.borderColor = 'var(--accent-teal)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-charcoal)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
            >
              {copied ? t.shareCopied : t.share}
            </button>
          </header>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

          <footer style={{ marginTop: 'clamp(3rem, 7vw, 5rem)', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <Link to="/writing" className="label" style={{ color: 'var(--text-grey)', textDecoration: 'none' }}>
              ← {t.sectionWriting}
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
