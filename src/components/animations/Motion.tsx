"use client";
import {useEffect} from 'react';import {usePathname} from 'next/navigation';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export default function Motion(){const pathname=usePathname();useEffect(()=>{
 const media=gsap.matchMedia();let alive=true;
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const ctx=gsap.context(()=>{
   const intro=gsap.timeline({defaults:{ease:'power3.out'}});intro.from('.site-header',{y:-12,opacity:0,duration:.6});if(document.querySelector('.hero'))intro.from('.line-mask > span',{yPercent:105,stagger:.13,duration:1.05},.12).from('.sculpture-wrap',{scale:.88,rotation:9,opacity:0,duration:1.35},.25).from('.hero-support,.hero-topline,.hero-bottom',{y:16,opacity:0,stagger:.1,duration:.8},.5);
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:36,clipPath:'inset(0 0 100% 0)',duration:1,scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
   gsap.utils.toArray<HTMLElement>('.project-art').forEach(el=>{gsap.fromTo(el,{clipPath:'inset(6% 3% 6% 3%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 35%',scrub:.6}});gsap.fromTo(el.querySelector('img'),{scale:1.06},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.7}})});
   if(document.querySelector('.portrait-frame'))gsap.fromTo('.portrait-frame',{y:18},{y:-18,ease:'none',scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:.8}});
   if(document.querySelector('.journey-line'))gsap.from('.journey-line',{scaleY:0,transformOrigin:'top',ease:'none',scrollTrigger:{trigger:'.milestones',start:'top 80%',end:'bottom 70%',scrub:true}});
   const desktop=gsap.matchMedia();desktop.add('(min-width: 1000px) and (pointer:fine)',()=>{
    const lenis=new Lenis({smoothWheel:true,syncTouch:false,duration:.85,anchors:true,prevent:node=>Boolean(node.closest('dialog'))});const update=()=>ScrollTrigger.update();lenis.on('scroll',update);const tick=(t:number)=>{if(!document.hidden)lenis.raf(t*1000)};gsap.ticker.add(tick);
    const track=document.querySelector<HTMLElement>('.gallery-track'),gallery=document.querySelector<HTMLElement>('.horizontal-gallery');if(track&&gallery){gallery.dataset.pinned='true';gsap.to(track,{x:()=>-Math.max(0,track.scrollWidth-gallery.clientWidth),ease:'none',scrollTrigger:{trigger:gallery,start:'top 18%',end:()=>'+='+Math.max(1,track.scrollWidth-gallery.clientWidth),pin:true,scrub:.8,invalidateOnRefresh:true}});}
    const cleanups=Array.from(document.querySelectorAll<HTMLElement>('.magnetic')).map(el=>{const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.08,y:(e.clientY-r.top-r.height/2)*.13,duration:.3})};const leave=()=>{gsap.to(el,{x:0,y:0,duration:.4})};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)}});
    return()=>{if(gallery)delete gallery.dataset.pinned;cleanups.forEach(fn=>fn());gsap.ticker.remove(tick);lenis.off('scroll',update);lenis.destroy()};
   });return()=>desktop.revert();
  });return()=>ctx.revert();
 });
 const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(()=>{if(alive)refresh()});window.addEventListener('load',refresh);document.addEventListener('toggle',refresh,true);
 const sculpture=document.querySelector('.sculpture-float');const visibility=new IntersectionObserver(([entry])=>{sculpture?.classList.toggle('resting',!entry.isIntersecting)});if(sculpture)visibility.observe(sculpture);
 return()=>{alive=false;window.removeEventListener('load',refresh);document.removeEventListener('toggle',refresh,true);visibility.disconnect();media.revert()};
},[pathname]);return null;}
