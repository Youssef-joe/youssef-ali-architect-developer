import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { t, isRTL } = useLanguage();

  const projects = [
    {
      title: t('projects.novel.title'),
      description: t('projects.novel.desc'),
      tech: ['Next.js', 'Go', 'WebRTC'],
    },
    {
      title: t('projects.ayno.title'),
      description: t('projects.ayno.desc'),
      tech: ['Elixir', 'Go', 'C++'],
    },
    {
      title: t('projects.fantasy.title'),
      description: t('projects.fantasy.desc'),
      tech: ['Python', 'Scikit-learn', 'FastAPI'],
    },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="projects" className="py-32">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="heading-lg mb-12"
        >
          {t('projects.title')}
        </motion.h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="project-card group"
            >
              <a
                href="#"
                className="block py-6 border-b border-border hover:border-foreground transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="heading-md mb-2 flex items-center gap-2 group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                      <Arrow className="project-arrow w-5 h-5" />
                    </h3>
                    <p className="body-text mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="font-mono text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;