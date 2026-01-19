import { motion } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';

const Hero = () => {
  const { displayText, isComplete } = useTextScramble('Youssef Ali', 600);

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
            Software Developer & Ex-Architect
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="body-text max-w-lg mb-8"
        >
          Building scalable, user-focused solutions in Cairo.
          <br />
          Currently Head of Back-End at GDG Cairo.
        </motion.p>

        {/* Current Role Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="role-card">
            <span className="pulse-dot" />
            <span className="text-muted-foreground">Building at</span>
            <span className="font-medium text-foreground">Infotech Global</span>
            <span className="text-muted-foreground">— Software Engineer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;