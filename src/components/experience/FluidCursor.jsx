import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from './motion';
// A GPU feedback field advects ink using a decaying velocity texture. Pointer
// segments deposit momentum and density; both persist between frames.
export default function FluidCursor(){
 const canvas=useRef(),marker=useRef();const [enabled,setEnabled]=useState(false);
 useEffect(()=>{const q=matchMedia('(min-width:900px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)'),update=()=>setEnabled(q.matches);update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update)},[]);
 useEffect(()=>{
  if(!enabled)return;const context=canvas.current.getContext('webgl2',{alpha:true});if(!context)return;
  const renderer=new THREE.WebGLRenderer({canvas:canvas.current,context,alpha:true});renderer.setPixelRatio(1);renderer.setClearColor(0x000000,0);
  let a=new THREE.WebGLRenderTarget(256,256,{type:THREE.HalfFloatType,depthBuffer:false}),b=a.clone();
  const camera=new THREE.Camera(),scene=new THREE.Scene(),geometry=new THREE.PlaneGeometry(2,2);
  const u={field:{value:a.texture},point:{value:new THREE.Vector2(-2,-2)},previous:{value:new THREE.Vector2(-2,-2)},velocity:{value:new THREE.Vector2()},aspect:{value:innerWidth/innerHeight},dt:{value:.016},inject:{value:0},time:{value:0}};
  const vertex='varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}';
  const simulation=new THREE.ShaderMaterial({uniforms:u,vertexShader:vertex,fragmentShader:`precision highp float; varying vec2 vUv;uniform sampler2D field;uniform vec2 point,previous,velocity;uniform float aspect,dt,inject,time;
   void main(){vec4 old=texture2D(field,vUv);vec2 flow=old.xy;vec2 curl=vec2(sin(vUv.y*35.+time),cos(vUv.x*31.-time))*.006*old.z;vec2 uv=clamp(vUv-(flow+curl)*dt,vec2(0.),vec2(1.));vec4 adv=texture2D(field,uv);vec2 p=vUv-point;vec2 seg=previous-point;p.x*=aspect;seg.x*=aspect;float h=clamp(dot(p,seg)/(dot(seg,seg)+.000001),0.,1.);float dist=length(p-seg*h);float speed=min(length(velocity),2.);float radius=.012+speed*.009;float splat=exp(-dist*dist/(radius*radius))*inject;vec2 v=mix(adv.xy*exp(-dt*2.8),velocity*.45,splat*.6);float ink=clamp(adv.z*exp(-dt*4.2)+splat*.8,0.,1.);gl_FragColor=vec4(v,ink,1.);}`});
  const display=new THREE.ShaderMaterial({transparent:true,depthTest:false,uniforms:{field:{value:a.texture},texel:{value:new THREE.Vector2(1/256,1/256)}},vertexShader:vertex,fragmentShader:`precision highp float; varying vec2 vUv;uniform sampler2D field;uniform vec2 texel;void main(){float d=texture2D(field,vUv).z;float dx=texture2D(field,vUv+vec2(texel.x,0.)).z-texture2D(field,vUv-vec2(texel.x,0.)).z;float dy=texture2D(field,vUv+vec2(0.,texel.y)).z-texture2D(field,vUv-vec2(0.,texel.y)).z;vec3 n=normalize(vec3(dx*9.,dy*9.,.25));float highlight=pow(max(dot(n,normalize(vec3(-.5,.8,.5))),0.),12.);float alpha=smoothstep(.015,.38,d)*.93;gl_FragColor=vec4(vec3(.01)+highlight*.38,alpha);}`});
  const mesh=new THREE.Mesh(geometry,simulation);scene.add(mesh);let active=0,last=performance.now(),moved=false,previousTime=performance.now();
  const clear=()=>{renderer.setRenderTarget(a);renderer.clear();renderer.setRenderTarget(b);renderer.clear();renderer.setRenderTarget(null);renderer.clear()};
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);const w=Math.min(640,Math.round(innerWidth*.4)),h=Math.round(w*innerHeight/innerWidth);a.setSize(w,h);b.setSize(w,h);u.aspect.value=innerWidth/innerHeight;display.uniforms.texel.value.set(1/w,1/h);clear()};resize();
  const move=e=>{const now=performance.now(),x=e.clientX/innerWidth,y=1-e.clientY/innerHeight;const prior=u.point.value.clone();if(prior.x<0)prior.set(x,y);u.previous.value.copy(prior);u.point.value.set(x,y);const seconds=Math.max(.008,(now-previousTime)/1000);u.velocity.value.set(THREE.MathUtils.clamp((x-prior.x)/seconds,-3,3),THREE.MathUtils.clamp((y-prior.y)/seconds,-3,3));previousTime=now;moved=true;active=now+3000;marker.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;marker.current.textContent=e.target.closest('.showcase-image,.archive-image,.project-image,.gallery-trigger')?'VIEW':e.target.closest('a,button')?'OPEN':'';};
  const tick=()=>{const now=performance.now();if(document.hidden||now-last<25)return;u.dt.value=Math.min((now-last)/1000,.05);last=now;if(!active)return;if(now>active){clear();active=0;return}u.time.value=now/1000;u.inject.value=moved?1:0;moved=false;u.field.value=a.texture;mesh.material=simulation;renderer.setRenderTarget(b);renderer.render(scene,camera);[a,b]=[b,a];display.uniforms.field.value=a.texture;mesh.material=display;renderer.setRenderTarget(null);renderer.render(scene,camera)};
  gsap.ticker.add(tick);window.addEventListener('pointermove',move,{passive:true});window.addEventListener('resize',resize);
  return()=>{gsap.ticker.remove(tick);window.removeEventListener('pointermove',move);window.removeEventListener('resize',resize);a.dispose();b.dispose();geometry.dispose();simulation.dispose();display.dispose();renderer.dispose()};
 },[enabled]);
 return <><canvas ref={canvas} className="fluid-layer" aria-hidden="true"/><div ref={marker} className="cursor-marker" aria-hidden="true"/></>;
}


