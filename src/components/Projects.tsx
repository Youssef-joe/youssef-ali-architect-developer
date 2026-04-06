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
      image: '/images/projects/novel.svg',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: t('projects.ayno.title'),
      description: t('projects.ayno.desc'),
      tech: ['Elixir', 'Go', 'C++'],
      link: 'https://ayno-ui.vercel.app',
      image: '/images/projects/ayno.svg',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      title: t('projects.fantasy.title'),
      description: t('projects.fantasy.desc'),
      tech: ['Python', 'Scikit-learn', 'FastAPI'],
      link: 'https://github.com/Youssef-joe/Fantasy',
      image: '/images/projects/fantasy.svg',
      gradient: 'from-cyan-500 to-blue-500'
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
              className="apple-card group relative overflow-hidden cursor-pointer"
              whileHover={{
                y: -12,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Image container with hover effect */}
              <motion.div
                className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ aspectRatio: '16/9' }}
              >
                <motion.img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                />
                {/* Subtle overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{
                    translateX: "100%",
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                />
              </motion.div>

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
                    <h3 className="card-title text-slate-950 flex items-center gap-3 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                      <motion.div
                        whileHover={{ x: isRTL ? -4 : 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Arrow className="project-arrow w-5 h-5" />
                      </motion.div>
                    </h3>
                    <p className="body-text text-slate-700">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.05) }}
                          viewport={{ once: true }}
                          className="tech-tag hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <motion.span
                      className="apple-pill-link group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn more
                      <Arrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.span>
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