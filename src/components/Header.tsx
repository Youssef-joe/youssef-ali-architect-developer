import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

const Header = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <nav className="container-narrow py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-semibold text-foreground hover:opacity-70 transition-opacity"
        >
          YA
        </button>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitch />
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link text-sm hidden sm:block"
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="nav-link text-sm hidden sm:block"
          >
            {t('nav.projects')}
          </button>
          <button
            onClick={() => scrollToSection('blog')}
            className="nav-link text-sm hidden sm:block"
          >
            {t('nav.blog')}
          </button>
          <a
            href="#resume"
            className="btn-resume"
          >
            {t('nav.resume')}
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;