import { useLayoutEffect } from 'react';

/**
 * Progressive scroll-reveal. Adds `js-reveal` to <body> only once JS runs, so
 * content is never hidden for no-JS users, then observes `.reveal` elements.
 * Runs in a layout effect so the hidden state is applied before first paint —
 * an ordinary effect would let the content flash in and then snap away.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    document.body.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    const nodes = Array.from(document.querySelectorAll('.reveal'));
    nodes.forEach((n, i) => {
      (n as HTMLElement).style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      observer.observe(n);
    });

    return () => {
      observer.disconnect();
      document.body.classList.remove('js-reveal');
    };
  }, []);
}
