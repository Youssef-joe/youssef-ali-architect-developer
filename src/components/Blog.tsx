import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t, isRTL } = useLanguage();

  const posts = [
    {
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      date: '2024-01-15',
      readTime: t('blog.minRead').replace('{min}', '5'),
    },
    {
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      date: '2024-01-08',
      readTime: t('blog.minRead').replace('{min}', '8'),
    },
    {
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      date: '2023-12-20',
      readTime: t('blog.minRead').replace('{min}', '6'),
    },
  ];

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section id="blog" className="py-32">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="heading-lg mb-12"
        >
          {t('blog.title')}
        </motion.h2>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="group"
            >
              <a
                href="#"
                className="block py-6 border-b border-border hover:border-foreground transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground font-mono">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="heading-md mb-2 flex items-center gap-2 group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                      <Arrow className="project-arrow w-5 h-5" />
                    </h3>
                    <p className="body-text">{post.excerpt}</p>
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

export default Blog;