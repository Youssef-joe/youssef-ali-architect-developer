import { motion } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  const { displayText, isComplete } = useTextScramble(t('hero.name'), 600);

  return (
    <section id="about" className="min-h-screen section-dark flex items-center">
      <div className="container-narrow">
        <div className="hero-panel">
          <p className="hero-caption mb-6">{t('hero.title')}</p>

          <motion.h1
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="heading-xl mb-6 text-white text-balance"
          >
            <span>
              {displayText}
              {!isComplete && <span className="scramble-cursor" />}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="section-subtitle mb-10"
          >
            {t('hero.subtitle')}
            <br />
            {t('hero.role')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="apple-cta apple-cta-primary">
              View work
            </a>
            <a href="#blog" className="apple-cta apple-cta-outline">
              Read stories
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16"
          >
            <div className="role-card">
              <span className="pulse-dot" />
              <span>{t('hero.building')}</span>
              <span className="font-medium">Infotech Global</span>
              <span>{t('hero.position')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;