import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, journey } from './motion';
export default function useJourney(root){
 useLayoutEffect(()=>{
  Object.assign(journey,{x:0,y:0,z:8.5,turn:0,spread:0,progress:0});const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const context=gsap.context(()=>{
    const composition=root.current.querySelector('.window-composition');
    const opening=gsap.timeline({scrollTrigger:{trigger:'.editorial-hero',start:'top top',end:'bottom top',scrub:.65}});
    opening.to('.window-a',{width:'100%',height:'100%',left:'0%',top:'0%',ease:'none'},0)
     .to('.window-b,.window-c,.window-d,.window-e',{left:'0%',top:'0%',width:'100%',height:'100%',ease:'none'},0)
     .to(composition,{height:'75vh',ease:'none'},0).to('.hero-introduction',{yPercent:-12,ease:'none'},0);
    gsap.utils.toArray('.animated-heading').forEach(el=>gsap.fromTo(el.querySelectorAll('.word'),{yPercent:110,rotateX:-55,opacity:.12},{yPercent:0,rotateX:0,opacity:1,stagger:.075,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 50%',scrub:.6}}));
    gsap.fromTo('.identity-portrait',{clipPath:'inset(15% 10% 0%)',y:70},{clipPath:'inset(0% 0% 0%)',y:-25,ease:'none',scrollTrigger:{trigger:'.about-composition',start:'top 85%',end:'bottom 30%',scrub:.7}});
    gsap.utils.toArray('.editorial-project').forEach((el,i)=>{
      const tl=gsap.timeline({scrollTrigger:{trigger:el,start:'top 95%',end:'bottom 15%',scrub:.8}});
      tl.fromTo(el.querySelector('.project-badge-rig'),{rotation:i?-14:14,y:-65},{rotation:i?7:-7,y:35,ease:'none'},0)
        .fromTo(el.querySelector('.work-caption'),{y:35},{y:-15,ease:'none'},0);
    });
    gsap.fromTo('.scatter-word',{
      x:i=>[ -35,24,10,-18,32,-12 ][i%6],y:i=>[-65,48,-28,70,-45,30][i%6],
      rotation:i=>[-9,5,-4,8,-6,3][i%6],opacity:.45
    },{x:0,y:0,rotation:0,opacity:1,ease:'power2.out',stagger:.025,
      scrollTrigger:{trigger:'.scattered-section',start:'top 85%',end:'center 40%',scrub:.8}});
    gsap.utils.toArray('.journey-record').forEach(el=>gsap.fromTo(el,{opacity:.35,y:25},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 90%',end:'top 50%',scrub:.5}}));
    gsap.to(journey,{x:1.1,y:-.5,z:6.7,turn:4,spread:1.2,progress:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:.7}});
   },root);return()=>context.revert();
  });
  const refresh=()=>ScrollTrigger.refresh();window.addEventListener('portfolio-ready',refresh);window.addEventListener('resize',refresh);root.current.addEventListener('load',refresh,true);const node=root.current;
  return()=>{media.revert();window.removeEventListener('portfolio-ready',refresh);window.removeEventListener('resize',refresh);node.removeEventListener('load',refresh,true)};
 },[root]);
}

