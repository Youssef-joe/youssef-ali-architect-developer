import { useState } from 'react';
import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { work, ui } from '../data/site';

export default function WorkSection() {
  const { language } = useLanguage();
  const t = ui[language];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Section id="work" index="02" title={t.sectionWork}>
      <ul data-anim="stagger-group" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {work.map((item, i) => {
          const c = item[language];
          const isHovered = hovered === item.id;
          const Wrapper = item.href ? 'a' : 'div';

          return (
            <li
              key={item.id}
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-light)' }}
            >
              <Wrapper
                {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  paddingBlock: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  cursor: item.href ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '0.5rem 1rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <h3
                    className="heading"
                    style={{
                      color: isHovered ? 'var(--accent-teal)' : 'var(--text-charcoal)',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {c.title}
                  </h3>
                  <span className="label" style={{ color: 'var(--text-faint)' }}>{item.year}</span>
                </div>

                <p className="label" style={{ color: 'var(--text-grey)', marginBottom: '0.85rem' }}>
                  {c.role}
                </p>

                <p className="prose-body" style={{ color: 'var(--text-grey)', marginBottom: '1.1rem' }}>
                  {c.summary}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: 0, padding: 0 }}>
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="label"
                      style={{
                        border: '1px solid var(--border-light)',
                        borderRadius: '999px',
                        padding: '3px 10px',
                        color: 'var(--text-grey)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
