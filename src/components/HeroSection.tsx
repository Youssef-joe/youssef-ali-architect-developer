import AuroraBackdrop from './AuroraBackdrop';
import { useLanguage } from '../contexts/LanguageContext';
import { hero, ui, contact } from '../data/site';

/**
 * Wraps a line in an overflow-hidden box so the inner span can slide up from
 * below the mask. Cheap: the only animated property is the child's transform.
 */
function MaskedLine({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
      <span data-anim="hero-line" className={className} style={{ display: 'block', willChange: 'transform', ...style }}>
        {children}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const { language } = useLanguage();
  const h = hero[language];
  const t = ui[language];

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: 'min(94svh, 940px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        paddingTop: '96px',
        paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
      }}
    >
      <AuroraBackdrop />

      <div className="shell" data-anim="hero-content" style={{ position: 'relative', zIndex: 2, width: '100%', willChange: 'transform' }}>
        <MaskedLine className="label" style={{ marginBottom: 'clamp(1rem, 3vw, 1.75rem)' }}>
          {h.role} — {h.location}
        </MaskedLine>

        <h1 className="display" style={{ color: 'var(--text-charcoal)', marginBottom: 'clamp(1.25rem, 3vw, 2rem)', maxWidth: '16ch' }}>
          <MaskedLine>{h.name}</MaskedLine>
        </h1>

        <div className="subheading" style={{ color: 'var(--text-charcoal)', maxWidth: '34ch', marginBottom: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
          <MaskedLine>{h.statement}</MaskedLine>
        </div>

        <div className="flex flex-wrap items-center" style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
          <span
            data-anim="hero-fade"
            className="label"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--border-strong)',
              borderRadius: '999px',
              padding: '6px 14px',
              color: 'var(--text-charcoal)',
              backgroundColor: 'color-mix(in srgb, var(--bg-warm-white) 60%, transparent)',
            }}
          >
            <span className="pulse-dot" aria-hidden="true" />
            {h.availability}
          </span>

          <a data-anim="hero-fade" href={contact.github} target="_blank" rel="noopener noreferrer" className="label link-slide" style={{ color: 'var(--text-charcoal)' }}>
            GitHub
          </a>
          <a data-anim="hero-fade" href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="label link-slide" style={{ color: 'var(--text-charcoal)' }}>
            LinkedIn
          </a>
        </div>

        <p data-anim="hero-fade" className="label" style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--text-faint)' }}>
          <span className="scroll-cue" aria-hidden="true">↓</span> {t.scrollHint}
        </p>
      </div>
    </section>
  );
}
