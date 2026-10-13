import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

// Pace actual GPU renders, without slowing DOM scrolling or changing the artwork.
export default function RenderBudget({ animated, windowed = false }) {
  const { invalidate, gl } = useThree();
  useEffect(() => {
    const mobile = matchMedia('(max-width: 700px), (pointer: coarse)');
    let timer, disposed = false;
    const visibleWindows = new Set();
    const windows = windowed ? [...document.querySelectorAll('[data-scene-window]')] : [];
    const observer = windows.length ? new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visibleWindows.add(entry.target) : visibleWindows.delete(entry.target));
      invalidate();
    }, { rootMargin: '80px' }) : null;
    windows.forEach(node => observer.observe(node));
    const tick = () => {
      if (disposed) return;
      const constrained = mobile.matches || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
      const fps = constrained ? 30 : 60;
      const active = !document.hidden && (!windows.length || visibleWindows.size > 0);
      gl.domElement.dataset.renderBudget = String(fps);
      gl.domElement.dataset.renderActive = String(Boolean(active && animated));
      if (active && animated) invalidate();
      timer = setTimeout(tick, active && animated ? 1000 / fps : 200);
    };
    // Always paint once on route changes, including reduced-motion/detail pages.
    invalidate();
    tick();
    const wake = () => invalidate();
    document.addEventListener('visibilitychange', wake);
    return () => { disposed = true; clearTimeout(timer); observer?.disconnect(); document.removeEventListener('visibilitychange', wake); };
  }, [animated, windowed, invalidate, gl]);
  return null;
}
