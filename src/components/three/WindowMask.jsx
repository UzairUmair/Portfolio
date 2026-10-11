import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../experience/motion';

// Every opening clips ONE fixed scene in viewport coordinates. There are no
// duplicate canvases or copied images behind the individual windows.
export default function WindowMask(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const clip=document.getElementById('portfolio-windows');
  const nodes=[...document.querySelectorAll('[data-scene-window]')];
  const rects=nodes.map(()=>{const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');clip.appendChild(rect);return rect});
  const previous=nodes.map(()=>({}));
  const update=()=>{
   if(document.hidden)return;
   // Read every layout first, then write only coordinates that changed.
   const bounds=nodes.map(node=>node.getBoundingClientRect());
   bounds.forEach((b,i)=>{
    const values={x:b.left,y:b.top,width:Math.max(0,b.width),height:Math.max(0,b.height),rx:nodes[i].dataset.radius||0};
    for(const [key,value] of Object.entries(values))if(previous[i][key]!==value){rects[i].setAttribute(key,value);previous[i][key]=value}
   });
  };
  gsap.ticker.add(update);update();return()=>{gsap.ticker.remove(update);clip.replaceChildren()};
 },[pathname]);
 return <svg className="window-definitions" aria-hidden="true"><defs><clipPath id="portfolio-windows" clipPathUnits="userSpaceOnUse"/></defs></svg>
}
