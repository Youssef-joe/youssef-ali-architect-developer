import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Toolkit from '@/components/Toolkit';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Projects />
          <Toolkit />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;