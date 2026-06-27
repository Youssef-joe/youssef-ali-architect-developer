import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';
import type { BlogPost } from '../data/blogPosts';

interface PostDetailProps {
  posts: BlogPost[];
}

export default function PostDetail({ posts }: PostDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [id]);

  const backText = language === 'zh' ? '返回首页' : 'Back to home';

  if (!post) {
    return (
      <div className="flex items-center justify-center" style={{ height: '100vh', backgroundColor: 'var(--bg-warm-white)' }}>
        <div className="text-center">
          <p style={{ fontSize: '14px', color: 'var(--text-grey)' }}>{language === 'zh' ? '文章不存在' : 'Article not found'}</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-charcoal)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {backText}
          </button>
        </div>
      </div>
    );
  }

  const content = post[language];
  const paragraphs = content.detailContent.split('\n\n');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-warm-white)' }}>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6" style={{ height: '40px', zIndex: 50, backgroundColor: 'var(--bg-warm-white)', borderBottom: '1px solid var(--border-light)' }}>
        <button onClick={() => navigate('/')} style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-charcoal)', background: 'none', border: 'none', cursor: 'pointer' }}>
          NEURAL ATELIER (BLOG)
        </button>
        <button onClick={() => navigate('/')} style={{ fontSize: '12px', fontFamily: "'Space Mono', monospace", color: 'var(--text-charcoal)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {language === 'zh' ? '关闭' : 'Close'}
        </button>
      </header>

      <div ref={contentRef} className="mx-auto" style={{ maxWidth: '680px', padding: '80px 24px' }}>
        <div className="mb-8" style={{ border: '1px solid var(--border-light)' }}>
          <img src={post.image} alt={content.title} className="w-full h-auto block" loading="eager" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{post.year}</span>
          <span style={{ fontSize: '11px', color: 'var(--border-light)' }}> / </span>
          <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{content.collection}</span>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 400, lineHeight: 1.3, color: 'var(--text-charcoal)', marginBottom: '6px' }}>{content.title}</h1>
        <p style={{ fontSize: '13px', color: 'var(--text-grey)', lineHeight: 1.5, marginBottom: '32px' }}>{content.subtitle}</p>

        <div style={{ borderTop: '1px solid var(--border-light)', marginBottom: '32px' }} />

        <div className="space-y-5">
          {paragraphs.map((para, idx) => (
            <p key={idx} style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--text-charcoal)', whiteSpace: 'pre-line' }}>{para}</p>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '48px', paddingTop: '24px' }}>
          <button onClick={() => navigate('/')} style={{ fontSize: '12px', color: 'var(--text-charcoal)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {language === 'zh' ? '返回全部文章' : 'Back to all articles'}
          </button>
        </div>
      </div>
    </div>
  );
}
