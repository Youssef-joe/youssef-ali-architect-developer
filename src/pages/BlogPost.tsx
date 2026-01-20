import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Share2, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Blog posts data with full content
  const blogPosts: Record<string, {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    content: string;
  }> = {
    '1': {
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      date: '2024-01-15',
      readTime: t('blog.minRead').replace('{min}', '5'),
      content: `
        <p>This is the full content of the first blog post. You can add detailed information, code snippets, images, and more here.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      `,
    },
    '2': {
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      date: '2024-01-08',
      readTime: t('blog.minRead').replace('{min}', '8'),
      content: `
        <p>This is the full content of the second blog post.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      `,
    },
    '3': {
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      date: '2023-12-20',
      readTime: t('blog.minRead').replace('{min}', '6'),
      content: `
        <p>This is the full content of the third blog post.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      `,
    },
  };

  const post = id && blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-narrow py-32">
          <div className="text-center">
            <h1 className="heading-lg mb-4">{t('notFound.title')}</h1>
            <p className="body-text mb-8">{t('notFound.description')}</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t('common.back')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-EG' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleRating = (value: number) => {
    setUserRating(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-narrow py-32"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/#blog')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('common.back')}</span>
          </button>

          {/* Post Header */}
          <div className="mb-12">
            <h1 className="heading-lg mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Rating Section */}
          <div className="pt-8 border-t border-border mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Was this article helpful?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sharing Section */}
          <div className="pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Share2 size={16} />
                  Share this article
                </p>
                <div className="flex gap-3 flex-wrap">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Twitter size={16} />
                    Twitter
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy link
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
