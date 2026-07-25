import { Link } from 'react-router-dom';
import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { articles, formatDate } from '../lib/articles';
import { ui } from '../data/site';

const PREVIEW_COUNT = 3;

export default function WritingSection() {
  const { language } = useLanguage();
  const t = ui[language];
  const latest = articles.slice(0, PREVIEW_COUNT);

  return (
    <Section id="writing" index="03" title={t.sectionWriting}>
      {latest.length === 0 ? (
        <p className="prose-body" style={{ color: 'var(--text-grey)' }}>{t.writingEmpty}</p>
      ) : (
        <ul data-anim="stagger-group" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {latest.map((article, i) => (
            <li key={article.slug} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-light)' }}>
              <Link
                to={`/writing/${article.slug}`}
                className="article-row"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit', paddingBlock: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 1rem', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <h3 className="subheading article-row-title" style={{ maxWidth: '30ch' }}>{article.title}</h3>
                  <span className="label" style={{ color: 'var(--text-faint)' }}>
                    {formatDate(article.date, article.lang)}
                  </span>
                </div>
                {article.description && (
                  <p className="prose-body" style={{ color: 'var(--text-grey)' }}>{article.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/writing"
        className="label"
        style={{
          display: 'inline-block', marginTop: '1.75rem', color: 'var(--accent-teal)',
          textDecoration: 'underline', textUnderlineOffset: '4px',
        }}
      >
        {t.writingAll} →
      </Link>
    </Section>
  );
}
