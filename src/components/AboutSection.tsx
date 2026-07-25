import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { about, ui } from '../data/site';

export default function AboutSection() {
  const { language } = useLanguage();
  const a = about[language];
  const t = ui[language];

  return (
    <Section id="about" index="01" title={t.sectionAbout}>
      <div data-anim="stagger-group">
        <p
          className="heading"
          style={{ color: 'var(--text-charcoal)', maxWidth: '22ch', marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {a.lead}
        </p>

        <div style={{ display: 'grid', gap: '1.15rem' }}>
          {a.body.map((paragraph, i) => (
            <p key={i} className="prose-body" style={{ color: 'var(--text-grey)' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
