import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Toolkit from '@/components/Toolkit';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Blog />
        <Toolkit />
      </main>
      <Footer />
    </div>
  );
};

export default Index;