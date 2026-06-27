import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import type { BlogPost } from '../data/blogPosts';

gsap.registerPlugin(ScrollTrigger);

interface MiddleColumnProps {
  posts: BlogPost[];
}

export default function MiddleColumn({ posts }: MiddleColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    if (!columnRef.current) return;
    const images = columnRef.current.querySelectorAll('.blog-image');
    const triggers: ScrollTrigger[] = [];
    images.forEach((img) => {
      gsap.set(img, { opacity: 0, scale: 1.03 });
      const tween = gsap.to(img, {
        opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: img, start: 'top 90%', toggleActions: 'play none none none' },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => { triggers.forEach((t) => t.kill()); };
  }, [posts]);

  return (
    <main ref={columnRef} className="flex-1 overflow-y-auto" style={{ borderRight: '1px solid var(--border-light)', height: '100vh', scrollBehavior: 'smooth' }}>
      <div className="p-6 pb-24">
        <h2 style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-grey)', marginBottom: '32px', lineHeight: 1.4 }}>
          MATERIAL (THOUGHTS)
        </h2>

        {posts.map((post) => {
          const content = post[language];
          return (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              style={{ cursor: 'pointer', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}
            >
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <div
                    className="blog-image overflow-hidden mb-3"
                    style={{ border: '1px solid var(--border-light)' }}
                    onMouseEnter={() => setHoveredImage(post.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={post.image} alt={content.title}
                      className="w-full h-auto block transition-all duration-300"
                      style={{ filter: hoveredImage === post.id ? 'grayscale(100%) brightness(0.9)' : 'none', transform: hoveredImage === post.id ? 'scale(1.02)' : 'scale(1)' }}
                      loading="lazy"
                    />
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.4, color: 'var(--text-charcoal)', marginBottom: '2px' }}>{content.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-grey)', lineHeight: 1.5, marginBottom: '4px' }}>{content.subtitle}</p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{post.year}</span>
                    <span style={{ fontSize: '11px', color: 'var(--border-light)' }}> / </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{content.collection}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
