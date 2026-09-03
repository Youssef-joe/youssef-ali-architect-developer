import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from '../components/SiteHeader';
import { useLanguage } from '../contexts/LanguageContext';
import { articles, formatDate } from '../lib/articles';
import { ui } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export default function ArticleIndex() {
  const { language } = useLanguage();
  const t = ui[language];
  const isRTL = language === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Parallax artwork and title fade
    gsap.to(artworkRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(titleRef.current, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Staggered reveal for chapter cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.chapters-grid',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="bg-parchment min-h-screen text-ink-black selection:bg-ink-black selection:text-parchment font-editorial-new">
      <SiteHeader />

      <main className="pb-32">
        {/* Massive Parallax Artwork Hero */}
        <div ref={containerRef} className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden border-b border-ink-black/20 bg-ink-black">
          <img
            ref={artworkRef}
            src="/classical_portrait.jpg"
            alt="Classical Portrait Artwork"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-60"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-90" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-parchment">
            <h1 ref={titleRef} className="font-canopee text-center leading-[0.8] tracking-[-0.05em] select-none uppercase z-10" style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}>
              THE BOOK
            </h1>
            <p className="font-editorial-new text-xl md:text-3xl text-parchment/70 mt-8 italic max-w-2xl text-center">
              A collection of chapters on engineering, architecture, and the art of systems.
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-24">
          <div className="flex justify-between items-end mb-12 border-b border-ink-black pb-4">
            <h2 className="font-canopee text-6xl tracking-tight">INDEX</h2>
            <span className="font-mono text-sm uppercase tracking-widest text-charcoal">
              {articles.length} CHAPTERS
            </span>
          </div>

          {articles.length === 0 ? (
            <p className="font-editorial-new text-xl text-charcoal">{t.writingEmpty}</p>
          ) : (
            <div className="chapters-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border-b border-ink-black">
              {articles.map((article, i) => (
                <Link
                  key={article.slug}
                  to={`/writing/${article.slug}`}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className={`group relative flex flex-col bg-bone-cream hover:bg-[#c2b8ae] transition-colors duration-500 p-10 ${
                    i % 3 !== 2 ? 'xl:border-r border-ink-black' : ''
                  } ${
                    i % 2 !== 1 ? 'md:border-r xl:border-r-0 border-ink-black' : ''
                  } ${
                    i < articles.length - (articles.length % 3 || 3) ? 'xl:border-b border-ink-black' : ''
                  } ${
                    i < articles.length - (articles.length % 2 || 2) ? 'md:border-b xl:border-b-0 border-ink-black' : 'border-b xl:border-b-0 border-ink-black'
                  }`}
                >
                  <div className="flex justify-between items-start mb-16">
                    <span className="font-editorial-new italic text-xl text-charcoal">
                      Chapter {articles.length - i}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-charcoal">
                      {formatDate(article.date, article.lang)}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-canopee text-5xl leading-[0.9] tracking-[-0.02em] mb-6 group-hover:text-ember-orange transition-colors duration-300">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="font-editorial-new text-xl leading-snug text-charcoal line-clamp-3">
                        {article.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-12 items-center justify-between border-t border-ink-black/10 pt-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-black">
                      {article.readingMinutes} {t.minRead}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
