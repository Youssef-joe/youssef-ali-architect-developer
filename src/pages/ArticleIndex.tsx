import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { useReveal } from '../components/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { articles, formatDate } from '../lib/articles';
import { ui } from '../data/site';

export default function ArticleIndex() {
  useReveal();
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
      <SiteHeader />

      <main className="shell" style={{ paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: 'var(--section-gap)' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>{t.sectionWriting}</p>
        <h1 className="display" style={{ marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)', maxWidth: '14ch' }}>
          {t.writingTitle}
        </h1>

        {articles.length === 0 ? (
          <p className="prose-body" style={{ color: 'var(--text-grey)' }}>{t.writingEmpty}</p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {articles.map((article, i) => (
              <li key={article.slug} className="reveal" style={{ borderTop: i === 0 ? '1px solid var(--border-light)' : 'none', borderBottom: '1px solid var(--border-light)' }}>
                <Link to={`/writing/${article.slug}`} className="article-row" style={{ display: 'block', textDecoration: 'none', color: 'inherit', paddingBlock: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1rem', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h2 className="heading article-row-title" style={{ maxWidth: '24ch' }}>{article.title}</h2>
                    <span className="label" style={{ color: 'var(--text-faint)' }}>
                      {formatDate(article.date, article.lang)}
                    </span>
                  </div>
                  {article.description && (
                    <p className="prose-body" style={{ color: 'var(--text-grey)', marginBottom: '0.75rem' }}>{article.description}</p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="label" style={{ color: 'var(--text-faint)' }}>
                      {article.readingMinutes} {t.minRead}
                    </span>
                    {article.draft && (
                      <span className="label" style={{ color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)', borderRadius: '999px', padding: '2px 9px' }}>
                        {t.draftBadge}
                      </span>
                    )}
                    {article.tags.map((tag) => (
                      <span key={tag} className="label" style={{ border: '1px solid var(--border-light)', borderRadius: '999px', padding: '2px 9px', color: 'var(--text-grey)', letterSpacing: '0.06em' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link to="/" className="label" style={{ display: 'inline-block', marginTop: '3rem', color: 'var(--text-grey)', textDecoration: 'none' }}>
          ← {t.backHome}
        </Link>
      </main>
    </div>
  );
}
