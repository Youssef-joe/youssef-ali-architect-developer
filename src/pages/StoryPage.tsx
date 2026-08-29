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
    <div style={{ backgroundColor: '#2A3B2C', minHeight: '100vh' }}>
      <SiteHeader />
      <main>
        <StorySection />
        
        <div className="shell text-center py-12">
          <Link to="/" className="label" style={{ display: 'inline-block', color: '#C5A059', textDecoration: 'none' }}>
            ← {t.backHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
