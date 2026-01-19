import { motion } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  const { displayText, isComplete } = useTextScramble(t('hero.name'), 600);

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-20">
      <div className="container-narrow">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
            <span className="text-3xl">🏗️</span>
          </div>
        </motion.div>

        {/* Headline with scramble effect */}
        <motion.h1
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="heading-xl mb-4 text-balance"
        >
          <span className="font-mono">
            {displayText}
            {!isComplete && <span className="scramble-cursor" />}
          </span>
          <br />
          <span className="text-muted-foreground">
            {t('hero.title')}
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="body-text max-w-lg mb-8"
        >
          {t('hero.subtitle')}
          <br />
          {t('hero.role')}
        </motion.p>

        {/* Current Role Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="role-card">
            <span className="pulse-dot" />
            <span className="text-muted-foreground">{t('hero.building')}</span>
            <span className="font-medium text-foreground">Infotech Global</span>
            <span className="text-muted-foreground">{t('hero.position')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;