import SiteHeader from '../components/SiteHeader';
import StorySection from '../components/StorySection';
import { useReveal } from '../components/useReveal';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ui } from '../data/site';

export default function StoryPage() {
  useReveal();
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <div style={{ backgroundColor: 'var(--bg-warm-white)', minHeight: '100vh' }}>
      <SiteHeader />
      <main style={{ paddingTop: 'clamp(5rem, 10vh, 8rem)', paddingBottom: 'var(--section-gap)' }}>
        <StorySection />
        
        <div className="shell text-center">
          <Link to="/" className="label" style={{ display: 'inline-block', marginTop: '3rem', color: 'var(--text-grey)', textDecoration: 'none' }}>
            ← {t.backHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
