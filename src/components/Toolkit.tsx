import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const technologies = [
  'TypeScript',
  'Go',
  'Elixir',
  'Node.js',
  'Python',
  'Docker',
  'PostgreSQL',
  'Redis',
  'WebRTC',
  'gRPC',
];

const Toolkit = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 section-light">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="section-heading mb-12"
        >
          {t('toolkit.title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="tech-tag"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Toolkit;