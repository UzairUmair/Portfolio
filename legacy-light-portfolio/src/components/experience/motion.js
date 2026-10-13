import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);
export { gsap, ScrollTrigger };
export const navigation = { scrollTo: null };

// GSAP writes these values; WebGL reads them without per-frame React renders.
export const journey = { x: 0, y: 0, z: 8.5, turn: 0, spread: 0, progress: 0, assembly: 0 };
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;


