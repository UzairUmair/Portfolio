import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion, journey, navigation } from './motion';
import { profile } from '../../data/profile';
const World = lazy(() => import('../three/World'));
const FluidCursor = lazy(() => import('./FluidCursor'));


export function Experience() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [motion, setMotion] = useState(() => !reducedMotion());
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const loader = useRef();
  const transition = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let clone, animation, busy = false;
    const click = event => {
      if (reducedMotion() || busy || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a.showcase-image, a.project-image');
      const img = link?.querySelector('img');
      if (!img) return;
      event.preventDefault(); event.stopPropagation(); busy = true;
      const rect = img.getBoundingClientRect();
      clone = img.cloneNode(); clone.className = 'route-image-clone';
      Object.assign(clone.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
      document.body.appendChild(clone);
      animation = gsap.timeline({onComplete:()=>{clone.remove();busy=false;}})
        .to(clone,{left:0,top:0,width:innerWidth,height:innerHeight,duration:.45,ease:'power3.inOut'})
        .call(()=>navigate(new URL(link.href).pathname))
        .to(clone,{opacity:0,duration:.3,delay:.12});
    };
    document.addEventListener('click',click,true);
    return ()=>{document.removeEventListener('click',click,true);animation?.kill();clone?.remove()};
  }, [navigate]);
  useEffect(() => {
    let alive = true, completed = 0;
    const step = () => { if (!alive) return; completed++; setProgress(Math.min(100, Math.round(completed / 3 * 100))); if (completed >= 3) setLoaded(true); };
    const portrait = new Image(); portrait.src = profile.portrait.small;
    portrait.decode().catch(() => {}).then(step);
    document.fonts.ready.then(step);
    let worldDone = false;
    const ready = () => { if (!worldDone) { worldDone = true; step(); } };
    window.addEventListener('world-ready', ready);
    if (window.__worldReady) ready();
    return () => { alive = false; window.removeEventListener('world-ready', ready); };
  }, []);
  useEffect(() => {
    if (!loaded) return;
    const complete = () => {
      setShowLoader(false);
      window.dispatchEvent(new Event('portfolio-ready'));
      ScrollTrigger.refresh();
    };
    if (reducedMotion()) { journey.assembly=1; complete(); return; }
    const intro=gsap.timeline({onComplete:complete});
    intro.to(loader.current,{clipPath:'inset(0 0 100% 0)',duration:.65,ease:'power3.inOut'});
    const words=gsap.utils.toArray('.hero-word');
    if(words.length)intro.fromTo(words,{yPercent:110},{yPercent:0,stagger:.12,duration:1,ease:'power4.out'},.25);
    intro.to(journey,{assembly:1,duration:2,ease:'power3.out'},.15);
    return () => intro.kill();
  }, [loaded]);
  useEffect(() => {
    if (!motion) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false, prevent: node => Boolean(node.closest('dialog,textarea')) });
    navigation.scrollTo = target => {
      let corrections = 0;
      const move = () => {
        const offset = -(document.querySelector('.header')?.getBoundingClientRect().height || 85)-12;
        lenis.scrollTo(scrollY+target.getBoundingClientRect().top+offset,{duration:corrections ? .35 : 1.1,force:true,onComplete:()=>{
          // The hero aperture changes height while scrolling; resolve the final anchor again.
          const intended = Math.max(0,Math.min(lenis.limit,scrollY+target.getBoundingClientRect().top+offset));
          if (Math.abs(scrollY-intended)>2 && corrections++<3) move();
        }});
      };
      lenis.start(); move();
    };
    const tick = time => { if (document.querySelector('dialog[open]')) lenis.stop(); else lenis.start(); lenis.raf(time * 1000); };
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update); gsap.ticker.add(tick);
    return () => { navigation.scrollTo=null; gsap.ticker.remove(tick); lenis.off('scroll', update); lenis.destroy(); };
  }, [motion]);
  useEffect(() => {
    if (reducedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo(transition.current, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.8, ease: 'power4.inOut' });
      gsap.fromTo('main', { opacity: 0.35 }, { opacity: 1, duration: 0.6, delay: 0.15 });
    });
    return () => context.revert();
  }, [pathname]);
  return <><Suspense fallback={<div className="world-fallback" />}><World /><FluidCursor /></Suspense><div ref={transition} className="route-curtain" aria-hidden="true"><span>UZ / STUDIO</span></div>{showLoader && <div ref={loader} className="preloader" role="status" aria-label={`Loading portfolio ${progress}%`}><div className="loader-top"><span>UZ / PORTFOLIO</span><span>KARACHI, PK</span></div><div className="loader-title"><span>UZ.</span><span>Creative developer<span className="accent">.</span></span></div><div className="loader-bottom"><span>A FEW THINGS COMING TOGETHER</span><strong>{String(progress).padStart(3, '0')}<small>%</small></strong></div><div className="loader-track"><i style={{ transform: `scaleX(${progress / 100})` }} /></div></div>}</>;
}

export function AnimatedHeading({ as: Tag = 'h2', children, className = '' }) {
  return <Tag className={`animated-heading ${className}`} aria-label={children}>{children.split(' ').map((word, i) => <span className="word-mask" aria-hidden="true" key={`${word}-${i}`}><span className="word">{word}&nbsp;</span></span>)}</Tag>;
}




