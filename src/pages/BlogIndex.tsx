import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';

const BlogIndex = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      id: '4',
      title: 'How Many Abstractions Do You Actually Need?',
      excerpt: 'A simple "Hello, World" revealed something uncomfortable about the tools I use every day.',
      date: '2024-01-22',
      readTime: '12 min read',
      isNew: true,
    },
    {
      id: '1',
      title: t('blog.post1.title') || 'The Death of the Architect',
      excerpt: t('blog.post1.excerpt') || 'Why I left architecture to build software.',
      date: '2024-01-15',
      readTime: '5 min read',
      isNew: true,
    },
    {
      id: '2',
      title: t('blog.post2.title') || 'Designing for the Web',
      excerpt: t('blog.post2.excerpt') || 'Applying architectural principles to frontend engineering.',
      date: '2024-01-08',
      readTime: '8 min read',
      isNew: false,
    },
    {
      id: '3',
      title: t('blog.post3.title') || 'React vs. AutoCAD',
      excerpt: t('blog.post3.excerpt') || 'A comparison of two completely different tools that do the same thing.',
      date: '2023-12-20',
      readTime: '6 min read',
      isNew: false,
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-EG' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-parchment text-ink-black font-editorial-new flex flex-col">
      {/* Editorial Header Bar */}
      <header className="w-full bg-parchment border-b border-ink-black flex items-center justify-between px-6 py-4 fixed top-0 z-50">
        <div className="text-[19px] font-light">Cairo, EG</div>
        <div className="text-[19px] font-light uppercase tracking-wide cursor-pointer" onClick={() => navigate('/')}>
          Youssef Ali Portfolio
        </div>
        <button className="text-ink-black hover:opacity-70 transition-opacity">
          <Menu size={24} strokeWidth={1} />
        </button>
      </header>

      <main className="flex-1 pt-20">
        {/* Full-width Display Banner Block */}
        <div className="w-full bg-ink-black text-parchment py-16 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          <h1 className="font-canopee text-[clamp(100px,18vw,446px)] leading-[0.73] tracking-[-0.05em] uppercase text-center w-full px-4 break-words">
            WRITINGS
          </h1>
          <p className="font-domaine-display text-[32px] mt-8 text-center text-bone-cream">
            Journal of Design, Engineering, and Product Thinking
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-bone-cream p-6 pb-8 flex flex-col gap-4 cursor-pointer hover:-translate-y-1 transition-transform border border-ink-black/5"
                onClick={() => navigate(`/blog/${post.id}`)}
                style={{
                  boxShadow: 'var(--shadow-sm)',
                  borderRadius: 'var(--radius-cards)'
                }}
              >
                {/* Thumbnail placeholder */}
                <div 
                  className="w-full aspect-[4/3] bg-ink-black/10 mb-2 overflow-hidden flex items-center justify-center"
                  style={{ borderRadius: 'var(--radius-images)' }}
                >
                  <span className="font-canopee text-charcoal text-[65px] opacity-20">{index + 1}</span>
                </div>

                <div>
                  <h3 className="font-editorial-new text-[20px] font-light text-ink-black inline-block">
                    {post.title}
                  </h3>
                  {post.isNew && (
                    <span 
                      className="ml-3 bg-ember-orange text-parchment text-[12px] px-2 py-1 font-light inline-block align-middle"
                      style={{ borderRadius: 'var(--radius-tags)' }}
                    >
                      NEW
                    </span>
                  )}
                </div>
                
                <p className="font-editorial-new text-[16px] leading-[1.27] text-ink-black line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-ink-black/10 text-charcoal text-[14px] leading-[1.18] uppercase tracking-wide">
                  {formatDate(post.date)} — {post.readTime}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-ink-black text-parchment py-[43px] px-6 mt-12 border-t border-ink-black">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-canopee text-[65px] leading-[0.91] tracking-[-2.08px] uppercase">Youssef Ali</div>
          <div className="text-[14px] uppercase tracking-wider font-light flex gap-8">
            <button onClick={() => navigate('/#blog')} className="hover:text-bone-cream">All Work</button>
            <a href="https://twitter.com/youssefali" target="_blank" rel="noopener noreferrer" className="hover:text-bone-cream">Twitter</a>
            <a href="https://linkedin.com/in/youssefali" target="_blank" rel="noopener noreferrer" className="hover:text-bone-cream">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogIndex;
