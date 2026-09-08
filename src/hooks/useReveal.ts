import { useEffect, useRef } from 'react';

/**
 * Intersection Observer hook for scroll-triggered reveal animations.
 * Adds `visible` class when element enters viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Section-level scroll reveal. Returns a ref to attach to any element.
 * Supports multiple animation types via the `variant` parameter.
 */
export function useSectionReveal<T extends HTMLElement = HTMLDivElement>(
  variant: 'section-reveal' | 'slide-left-reveal' | 'slide-right-reveal' | 'scale-reveal' = 'section-reveal'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.classList.add('visible');
      return;
    }

    el.classList.add(variant);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  return ref;
}

/**
 * Stagger delay helper for card index.
 */
export function staggerDelay(index: number, base = 80): number {
  return Math.min(index * base, 480);
}
