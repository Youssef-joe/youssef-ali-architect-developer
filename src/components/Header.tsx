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
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-3xl border-b border-white/10"
    >
      <nav className="container-narrow h-12 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm uppercase tracking-[0.35em] text-white"
        >
          YA
        </button>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitch />
          <button
            onClick={() => scrollToSection('about')}
            className="text-white/70 hover:text-white transition-colors duration-200 text-[0.75rem] tracking-[0.3em] uppercase hidden sm:inline-flex"
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-white/70 hover:text-white transition-colors duration-200 text-[0.75rem] tracking-[0.3em] uppercase hidden sm:inline-flex"
          >
            {t('nav.projects')}
          </button>
          <button
            onClick={() => scrollToSection('blog')}
            className="text-white/70 hover:text-white transition-colors duration-200 text-[0.75rem] tracking-[0.3em] uppercase hidden sm:inline-flex"
          >
            {t('nav.blog')}
          </button>
          <a
            href="mailto:hello@youssefali.dev"
            className="resume-pill hidden sm:inline-flex"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;