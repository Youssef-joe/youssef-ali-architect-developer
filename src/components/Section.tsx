import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

/**
 * Editorial section shell: numbered mono eyebrow in a narrow rail,
 * content in the main measure. Collapses to stacked on small screens.
 */
export default function Section({ id, index, title, children }: SectionProps) {
  return (
    <section
      id={id}
      style={{ paddingBlock: 'var(--section-gap)', scrollMarginTop: '72px' }}
    >
      <div className="shell">
        <hr className="rule" data-anim="rule" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
          }}
          className="section-grid"
        >
          <header data-anim="section-head" style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
            <span className="label" style={{ color: 'var(--text-faint)' }}>{index}</span>
            <h2 className="label label-strong">{title}</h2>
          </header>

          <div style={{ minWidth: 0 }}>{children}</div>
        </div>
      </div>
    </section>
  );
}
