import { Component, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { journey, reducedMotion } from '../experience/motion';
import WindowMask from './WindowMask';
function ready(){window.__worldReady=true;window.dispatchEvent(new Event('world-ready'))}
function Fallback({failed}){useEffect(()=>{ready();failed?.()},[failed]);return <div className="fluid-fallback"/>}
class SceneBoundary extends Component{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(){this.props.onFailed()}render(){return this.state.failed?<Fallback/>:this.props.children}}
function FluidScene({still}){
 const {gl,scene,camera,invalidate}=useThree(),group=useRef(),time=useRef(0),frame=useRef(0),pointer=useRef(new THREE.Vector2()),target=useMemo(()=>new THREE.Vector3(),[]);
 const colorTarget=useMemo(()=>new THREE.Color(),[]);
 const forms=useMemo(()=>Array.from({length:14},(_,i)=>({x:Math.sin(i*2.4)*5.5,y:Math.cos(i*1.7)*3.7,z:-1-Math.sin(i*.8)*2,r:.45+(i%4)*.23})),[]);
 const uniforms=useMemo(()=>({uTime:{value:0},uPointer:{value:new THREE.Vector2()},uScroll:{value:0}}),[]);
 const backdrop=useMemo(()=>new THREE.ShaderMaterial({uniforms,vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 vUv;uniform float uTime;uniform float uScroll;void main(){float fold=sin(vUv.x*13.+sin(vUv.y*5.+uTime*.04)*2.+uScroll);float light=pow(max(fold,0.),5.)*.13;float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)*.012;gl_FragColor=vec4(vec3(.028+light+grain),1.);}'}),[uniforms]);
 const materials=useMemo(()=>['#070709','#6319bb','#d11098','#202024'].map((color,i)=>{
  const m=new THREE.MeshPhysicalMaterial({color,metalness:i===0?.82:.5,roughness:i===0?.14:.23,clearcoat:1,clearcoatRoughness:.1});
  m.onBeforeCompile=shader=>{Object.assign(shader.uniforms,uniforms);shader.vertexShader='uniform float uTime; uniform vec2 uPointer; uniform float uScroll;\n'+shader.vertexShader.replace('#include <begin_vertex>',`vec3 transformed = vec3(position); float wave=sin(position.x*3.1+uTime*.6)*cos(position.y*2.7-uTime*.4)+sin(position.z*4.+uTime*.5)*.35; transformed += normal*(wave*.095+sin(uScroll*6.+position.y*3.)*.025); transformed.x+=uPointer.x*.045*sin(position.y*2.);`);};m.customProgramCacheKey=()=> 'uz-fluid-surface-v1';return m;
 }),[uniforms]);
 useEffect(()=>()=>{materials.forEach(m=>m.dispose());backdrop.dispose()},[materials,backdrop]);
 useEffect(()=>{const room=new RoomEnvironment(),generator=new THREE.PMREMGenerator(gl),env=generator.fromScene(room,.025);scene.environment=env.texture;scene.environmentIntensity=1.3;scene.background=new THREE.Color('#171619');room.dispose();generator.dispose();const move=e=>pointer.current.set(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5);window.addEventListener('pointermove',move,{passive:true});window.addEventListener('portfolio-ready',invalidate);return()=>{window.removeEventListener('pointermove',move);window.removeEventListener('portfolio-ready',invalidate);scene.environment=null;env.dispose()}},[gl,scene,invalidate]);
 useFrame((state,delta)=>{
  if(!still)time.current+=Math.min(delta,.05);const t=time.current;
  const closing=THREE.MathUtils.smoothstep(journey.progress,.8,.96);materials.forEach((m,i)=>{m.color.set(['#070709','#6319bb','#d11098','#202024'][i]);colorTarget.set(i===0?'#070709':'#303035');m.color.lerp(colorTarget,closing)});
  uniforms.uTime.value=t;uniforms.uScroll.value=journey.progress;uniforms.uPointer.value.lerp(pointer.current,1-Math.exp(-delta*5));
  camera.position.lerp(target.set(journey.x+pointer.current.x*.25,journey.y-pointer.current.y*.2,journey.z),still?1:1-Math.exp(-delta*6));camera.lookAt(0,0,0);
  group.current.children.forEach((mesh,i)=>{const f=forms[i];mesh.position.set(f.x*(state.size.width<700?.28:1)+Math.sin(t*.18+i)*.35+journey.spread*Math.sin(i)*.45,f.y+Math.cos(t*.13+i)*.3+journey.progress*Math.sin(i*.8),f.z+Math.sin(t*.2+i)*.45);mesh.scale.set(f.r*(1+Math.sin(i)*.17),f.r*(1+Math.cos(t*.12+i)*.12),f.r);mesh.rotation.set(Math.sin(t*.1+i)*.15,i*.5+journey.turn*.12,0)});
  frame.current++;if(frame.current===2)ready();if(frame.current<3)invalidate();if(frame.current%15===0 || frame.current===2){gl.domElement.dataset.camera=camera.position.toArray().map(n=>n.toFixed(2)).join(',');gl.domElement.dataset.progress=journey.progress.toFixed(3);gl.domElement.dataset.resources=JSON.stringify(gl.info.memory);}
 });
 return <><mesh position={[0,0,-7]} material={backdrop}><planeGeometry args={[40,25]}/></mesh><ambientLight intensity={.16}/><directionalLight position={[-4,5,6]} intensity={1.8} color="#f7f7ff"/><directionalLight position={[5,-2,2]} intensity={1.2} color="#ca99ff"/><pointLight position={[0,1,3]} intensity={10} color="#dc1ca5" distance={9}/><group ref={group}>{forms.map((f,i)=><mesh key={i} material={materials[i%5===0?1:i%5===2?2:i%5===4?3:0]}><sphereGeometry args={[1,40,28]}/></mesh>)}</group></>
}
export default function World(){
 const {pathname}=useLocation();const [still,setStill]=useState(reducedMotion),[hidden,setHidden]=useState(document.hidden);
 const [attempt,setAttempt]=useState(0),[failed,setFailed]=useState(false),[recovering,setRecovering]=useState(false);
 const reportFailure=useCallback(()=>setFailed(true),[]);
 const retry=()=>{setFailed(false);setRecovering(false);setAttempt(n=>n+1)};
 useEffect(()=>{if(!failed||attempt>0)return;const timer=setTimeout(()=>{setFailed(false);setAttempt(n=>n+1)},800);return()=>clearTimeout(timer)},[failed,attempt]);
 useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setStill(q.matches),visibility=()=>setHidden(document.hidden);q.addEventListener('change',change);document.addEventListener('visibilitychange',visibility);return()=>{q.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)}},[]);
 return <><WindowMask/><div className="webgl-world" aria-hidden="true"><SceneBoundary key={attempt} onFailed={reportFailure}><Canvas dpr={[.8,1.25]} camera={{position:[0,0,8.5],fov:48}} gl={{alpha:false,antialias:true,powerPreference:'default'}} frameloop={hidden?'never':still||pathname!=='/'?'demand':'always'} fallback={<div className="fluid-fallback"/>}><ContextRecovery onLost={()=>setRecovering(true)} onRestored={()=>setRecovering(false)}/><FluidScene still={still||pathname!=='/'}/></Canvas></SceneBoundary></div>{(failed||recovering)&&<div className="scene-recovery" role="status"><span>{recovering?'Restoring the 3D background…':'The browser could not start the 3D background.'}</span><button onClick={retry}>Retry 3D</button></div>}</>;
}
function ContextRecovery({onLost,onRestored}){
 const {gl,invalidate}=useThree();
 useEffect(()=>{const canvas=gl.domElement;const lost=event=>{event.preventDefault();onLost()};const restored=()=>{onRestored();invalidate()};canvas.addEventListener('webglcontextlost',lost);canvas.addEventListener('webglcontextrestored',restored);return()=>{canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored)}},[gl,invalidate,onLost,onRestored]);
 return null;
}
