import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { cvData, sectionOrder, ui, cvUpdated } from '../data/site';
import type { CVItem } from '../data/site';

export default function CVSection() {
  const { language } = useLanguage();
  const t = ui[language];

  const items = cvData[language];
  const grouped = items.reduce<Record<string, CVItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});
  const order = sectionOrder[language] ?? sectionOrder.en;

  return (
    <Section id="cv" index="04" title={t.sectionCV}>
      <div data-anim="stagger-group">
        {order.map((category) => {
          const rows = grouped[category];
          if (!rows?.length) return null;

          return (
            <div
              key={category}
              style={{
                display: 'grid',
                gap: '0.75rem clamp(1rem, 3vw, 2.5rem)',
                paddingBlock: 'clamp(1.25rem, 3vw, 1.75rem)',
                borderBottom: '1px solid var(--border-light)',
              }}
              className="cv-group"
            >
              <h3 className="label label-strong" style={{ alignSelf: 'start' }}>{category}</h3>

              <div style={{ display: 'grid', gap: '1rem', minWidth: 0 }}>
                {rows.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '0.25rem 1.5rem',
                    }}
                  >
                    <div style={{ minWidth: 0, flex: '1 1 22ch' }}>
                      <p style={{ fontSize: 'var(--step-0)', color: 'var(--text-charcoal)', lineHeight: 1.5 }}>
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-grey)', lineHeight: 1.6, marginTop: '2px' }}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    {item.year && (
                      <span className="label" style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
                        {item.year}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <p className="label" style={{ color: 'var(--text-faint)', marginTop: '1.5rem' }}>
          {t.updatedPrefix} {cvUpdated}
        </p>
      </div>
    </Section>
  );
}
