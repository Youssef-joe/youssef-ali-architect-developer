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
      link: 'https://github.com/orgs/novelNestRepo/repositories',
    },
    {
      title: t('projects.ayno.title'),
      description: t('projects.ayno.desc'),
      tech: ['Elixir', 'Go', 'C++'],
      link: 'https://ayno-ui.vercel.app',
    },
    {
      title: t('projects.fantasy.title'),
      description: t('projects.fantasy.desc'),
      tech: ['Python', 'Scikit-learn', 'FastAPI'],
      link: 'https://github.com/Youssef-joe/Fantasy',
    },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="projects" className="py-32 section-light">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="section-heading mb-4">{t('projects.title')}</h2>
          <p className="body-text">
            {t('projects.subtitle') || 'Selected work framed as product moments — clean, precise, and centered on impact.'}
          </p>
        </motion.div>

        <div className="feature-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="apple-card group"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="flex h-full flex-col justify-between gap-8 p-8">
                  <div className="space-y-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                      Project
                    </p>
                    <h3 className="card-title text-slate-950 flex items-center gap-3">
                      {project.title}
                      <Arrow className="project-arrow w-5 h-5" />
                    </h3>
                    <p className="body-text text-slate-700">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="apple-pill-link">
                      Learn more
                      <Arrow className="w-4 h-4" />
                    </span>
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