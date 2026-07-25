import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { contact, ui, hero } from '../data/site';

export default function ContactSection() {
  const { language } = useLanguage();
  const t = ui[language];
  const h = hero[language];

  const links = [
    { label: t.emailLabel, value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: 'LinkedIn', value: 'youssef-ali', href: contact.linkedin, external: true },
    { label: 'GitHub', value: 'youssef-joe', href: contact.github, external: true },
  ];

  return (
    <Section id="contact" index="05" title={t.sectionContact}>
      <div data-anim="stagger-group">
        <p
          className="heading"
          style={{ color: 'var(--text-charcoal)', maxWidth: '20ch', marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {t.contactLead}
        </p>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0' }}>
          {links.map((link) => (
            <li key={link.label} style={{ borderTop: '1px solid var(--border-light)' }}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '0.25rem 1.5rem',
                  paddingBlock: '1rem',
                  textDecoration: 'none',
                  color: 'var(--text-charcoal)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-teal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-charcoal)'; }}
              >
                <span className="label">{link.label}</span>
                <span style={{ fontSize: 'var(--step-0)', wordBreak: 'break-word' }}>{link.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            marginTop: 'clamp(2.5rem, 6vw, 4rem)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.75rem 1.5rem',
          }}
        >
          <span className="label" style={{ color: 'var(--text-faint)' }}>
            {h.name} — {h.location}
          </span>
          <a href="#top" className="label" style={{ color: 'var(--text-faint)', textDecoration: 'none' }}>
            ↑ {t.backToTop}
          </a>
        </div>
      </div>
    </Section>
  );
}
