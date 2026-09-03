import { useEffect, useMemo, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { marked } from 'marked';
import gsap from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';
import { getArticle, formatDate } from '../lib/articles';
import { ui } from '../data/site';

marked.setOptions({ gfm: true, breaks: false });

export default function ArticleReader() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const t = ui[language];
  const article = slug ? getArticle(slug) : undefined;
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => (article ? marked.parse(article.body) as string : ''), [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Youssef Ali`;
    return () => { document.title = 'Youssef Ali — Systems Engineer'; };
  }, [article]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (article && titleRef.current && contentRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );
    }
  }, [article]);

  if (!article) {
    return (
      <div className="bg-parchment min-h-screen font-editorial-new text-ink-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-canopee text-6xl mb-4">{t.articleMissing || "NOT FOUND"}</h1>
          <Link to="/writing" className="font-mono uppercase tracking-widest text-ember-orange hover:underline">
            ← TABLE OF CONTENTS
          </Link>
        </div>
      </div>
    );
  }

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.description, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // user dismissed the share sheet
    }
  };

  const isRTL = article.lang === 'ar';

  return (
    <div className="bg-parchment min-h-screen text-ink-black selection:bg-ink-black selection:text-parchment font-editorial-new overflow-x-hidden">
      {/* Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-ember-orange origin-left will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Editorial Header Bar */}
      <header className="w-full border-b border-ink-black/20 px-6 py-4 flex justify-between items-center bg-parchment sticky top-0 z-40">
        <Link to="/" className="font-canopee text-2xl uppercase tracking-tight text-ink-black hover:text-ember-orange transition-colors">
          Youssef Ali
        </Link>
        <Link to="/writing" className="font-mono text-xs uppercase tracking-widest text-charcoal hover:text-ink-black transition-colors">
          TABLE OF CONTENTS
        </Link>
      </header>

      <main dir={isRTL ? 'rtl' : 'ltr'} className="w-full">
        <article className="w-full">
          {/* Display Banner Title Block */}
          <header className="w-full bg-ink-black text-parchment border-b border-ink-black pb-16 pt-24 px-6 lg:px-12 flex flex-col items-center justify-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 opacity-70">
              <span className="font-mono text-xs uppercase tracking-widest">{formatDate(article.date, article.lang)}</span>
              <span className="w-1.5 h-1.5 bg-ember-orange rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-widest">{article.readingMinutes} {t.minRead}</span>
            </div>

            <h1 ref={titleRef} className="font-canopee uppercase leading-[0.85] tracking-[-0.04em] max-w-[12ch] mx-auto text-balance" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
              {article.title}
            </h1>
            
            {article.description && (
              <p className="font-editorial-new italic text-2xl md:text-4xl mt-12 max-w-3xl mx-auto text-parchment/80 leading-snug">
                {article.description}
              </p>
            )}
          </header>

          {/* Article Layout */}
          <div ref={contentRef} className="max-w-[1200px] mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sidebar / Metadata */}
            <aside className="lg:col-span-3 flex flex-col gap-12 border-b lg:border-b-0 lg:border-r border-ink-black/20 pb-12 lg:pb-0 lg:pr-12">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-charcoal mb-4 border-b border-ink-black/20 pb-2">Classifications</h4>
                <div className="flex flex-col gap-2 mt-4">
                  {article.tags.map((tag) => (
                    <span key={tag} className="font-editorial-new italic text-xl text-ink-black">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-charcoal mb-4 border-b border-ink-black/20 pb-2">Actions</h4>
                <button
                  type="button"
                  onClick={share}
                  className="font-mono text-xs uppercase tracking-widest mt-4 hover:text-ember-orange transition-colors w-full text-left"
                >
                  {copied ? (t.shareCopied || "Copied to clipboard") : (t.share || "Share Chapter")}
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 prose-article">
              <div 
                className="article-body font-editorial-new text-2xl leading-relaxed text-ink-black text-justify" 
                dangerouslySetInnerHTML={{ __html: html }} 
              />
            </div>
          </div>

          <footer className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 border-t border-ink-black/20 flex justify-center">
            <Link to="/writing" className="font-canopee text-5xl text-ink-black hover:text-ember-orange transition-colors">
              ← Table of Contents
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
