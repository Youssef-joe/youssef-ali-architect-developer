import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Home-page scroll choreography.
 *
 * Every tween below animates only `opacity`, `transform` (x/y/scale/rotate) or
 * `clip-path`. Nothing here touches width, height, top, margin or any other
 * property that would force the browser to re-run layout mid-scroll — that is
 * the whole reason this stays smooth at 60fps while doing quite a lot.
 *
 * Honours prefers-reduced-motion by bailing out entirely and leaving the DOM in
 * its natural, fully visible state.
 */
export function useChoreography(enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* ---- Hero: masked line reveal ---- */
      const heroLines = gsap.utils.toArray<HTMLElement>('[data-anim="hero-line"]');
      if (heroLines.length) {
        gsap.set(heroLines, { yPercent: 115 });
        gsap.to(heroLines, {
          yPercent: 0,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.075,
          delay: 0.12,
        });
      }

      const heroFades = gsap.utils.toArray<HTMLElement>('[data-anim="hero-fade"]');
      if (heroFades.length) {
        gsap.fromTo(
          heroFades,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.5 }
        );
      }

      /* ---- Hero: parallax drift as you scroll past ---- */
      const heroContent = document.querySelector('[data-anim="hero-content"]');
      if (heroContent) {
        gsap.to(heroContent, {
          yPercent: 16,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      /* ---- Section eyebrows: slide in from the rail ---- */
      gsap.utils.toArray<HTMLElement>('[data-anim="section-head"]').forEach((head) => {
        gsap.fromTo(
          head,
          { opacity: 0, x: -14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: head, start: 'top 88%', once: true },
          }
        );
      });

      /* ---- Rules: draw themselves across ---- */
      gsap.utils.toArray<HTMLElement>('[data-anim="rule"]').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: rule, start: 'top 94%', once: true },
          }
        );
      });

      /* ---- Work rows: staggered rise ---- */
      gsap.utils.toArray<HTMLElement>('[data-anim="stagger-group"]').forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        if (!children.length) return;
        gsap.fromTo(
          children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [enabled]);
}
