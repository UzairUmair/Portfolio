import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { reducedMotion } from './motion';

export default function ProjectBadge({ project, index }) {
  const stage = useRef(null);
  const move = event => {
    if (event.pointerType !== 'mouse' || reducedMotion()) return;
    const rect = stage.current.getBoundingClientRect();
    stage.current.style.setProperty('--badge-x', `${((event.clientX-rect.left)/rect.width-.5)*16}deg`);
    stage.current.style.setProperty('--badge-y', `${-((event.clientY-rect.top)/rect.height-.5)*10}deg`);
  };
  const reset = () => {stage.current.style.setProperty('--badge-x','0deg');stage.current.style.setProperty('--badge-y','0deg')};
  return <div ref={stage} className={`badge-stage badge-color-${index}`} onPointerMove={move} onPointerLeave={reset}>
    <span className="badge-stage-label" aria-hidden="true">UZ. / SELECTED WORK — 0{index+1}</span>
    <div className="project-badge-rig"><div className="badge-swing"><div className="badge-pointer">
      <div className="badge-strap" aria-hidden="true"><span>UZ. / {project.title} / CREATIVE DEVELOPMENT</span></div>
      <div className="badge-clip" aria-hidden="true"/>
      <Link to={`/projects/${project.id}`} className="showcase-image badge-card" aria-label={`Explore ${project.title}`}>
        <span className="badge-hole" aria-hidden="true"/><span className="badge-card-top">{index===0?'WORKSPACE ACCESS':'ADMIT ONE / DISCOVERY'} <span>0{index+1}</span></span>
        <strong className="badge-title">{project.title}</strong>
        <img src={project.coverImage} alt={`${project.title} actual interface`} width="1600" height="772" loading="lazy"/>
        <span className="badge-card-bottom">Uzair Umair <span>Explore <ArrowUpRight size={16}/></span></span>
      </Link>
    </div></div></div>
    <span className="badge-stage-hint">{index===0?'CLIENTS · PROJECTS · INVOICES':'DISCOVER · SEARCH · SAVE'} ↗</span>
  </div>;
}
