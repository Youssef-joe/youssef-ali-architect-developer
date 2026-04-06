import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const posts = [
    {
      id: '1',
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      date: '2024-01-15',
      readTime: t('blog.minRead').replace('{min}', '5'),
    },
    {
      id: '2',
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      date: '2024-01-08',
      readTime: t('blog.minRead').replace('{min}', '8'),
    },
    {
      id: '3',
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
    <section id="blog" className="py-32 section-dark">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="section-heading mb-4 text-white">{t('blog.title')}</h2>
          <p className="body-text max-w-2xl">
            {t('blog.subtitle') || 'A brief journal of design, engineering, and product thinking.'}
          </p>
        </motion.div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="apple-card-dark group"
            >
              <button
                onClick={() => navigate(`/blog/${post.id}`)}
                className="w-full text-left block p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-5">
                    <div className="text-sm uppercase tracking-[0.35em] text-slate-400 font-mono">
                      {formatDate(post.date)} · {post.readTime}
                    </div>
                    <h3 className="card-title flex items-center gap-3 text-white">
                      {post.title}
                    </h3>
                    <p className="body-text">{post.excerpt}</p>
                  </div>
                  <Arrow className="w-5 h-5 text-[#2997ff]" />
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;