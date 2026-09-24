import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { developmentProjects } from '../data/projects';
import { designProjects } from '../data/designProjects';
import { ProjectCard, DesignCard, Tags, Gallery, ExternalLink } from '../components/Shared';

export function ProjectListing({ design = false }) {
  const [filter, setFilter] = useState('All');
  const data = design ? designProjects : developmentProjects;
  const filters = ['All', ...new Set(data.flatMap(project => design ? [project.category] : project.technologies).filter(value => design || ['JavaScript', 'React', 'Firebase'].includes(value)))];
  const visible = data.filter(project => filter === 'All' || (design ? project.category === filter : project.technologies.includes(filter)));
  return <div className="container listing-page"><Link to="/" className="back-link"><ArrowLeft size={16} />Back home</Link><p className="eyebrow">{design ? 'BRANDING & GRAPHIC DESIGN' : 'FRONT-END DEVELOPMENT'}</p><h1>{design ? 'Graphic design work.' : 'Built to put learning to work.'}</h1><p className="page-intro">{design ? 'Selected advertising, print mockups, posters and social-media graphics, including work from my SMIT assignments.' : 'From business workspaces to small practice apps. Explore the projects, the interfaces and the code behind my front-end development journey.'}</p><div className="filter-bar" role="group" aria-label={design ? 'Filter design categories' : 'Filter project technologies'}>{filters.map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}<span aria-live="polite">{visible.length} projects</span></div><div className={design ? 'design-grid' : 'project-grid'}>{visible.map(project => design ? <DesignCard project={project} key={project.id} /> : <ProjectCard project={project} index={data.indexOf(project)} key={project.id} />)}</div></div>;
}
export function ProjectDetails({ design = false }) {
  const { slug } = useParams();
  const data = design ? designProjects : developmentProjects;
  const project = data.find(item => item.id === slug);
  if (!project) return <NotFound />;
  const next = data[(data.indexOf(project) + 1) % data.length];
  return <article className="container detail-page"><Link className="back-link" to={design ? '/design' : '/projects'}><ArrowLeft size={16} />{design ? 'Graphic design work' : 'Development projects'}</Link><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="page-intro">{design ? project.description : project.shortDescription}</p>{!design && <><Tags items={project.technologies} /><div className="detail-actions"><ExternalLink className="button primary" href={project.liveUrl}>Open live project</ExternalLink>{project.githubUrl && <ExternalLink className="button secondary" href={project.githubUrl}>Source code</ExternalLink>}</div></>}
    <Gallery images={design ? project.gallery : project.screenshots} title={project.title} />
    {!design && <div className="detail-copy"><div><p className="eyebrow">THE PROJECT</p><h2>Overview</h2><p>{project.fullDescription}</p></div><div><p className="eyebrow">WHAT'S INSIDE</p><h2>Key features</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></div>}
    <div className="next-project"><div><p className="eyebrow">NEXT PROJECT</p><h2>{next.title}</h2></div><Link className="button secondary" to={`/${design ? 'design' : 'projects'}/${next.id}`}>Explore project<ArrowRight size={17} /></Link></div></article>;
}
export function NotFound() { return <section className="container not-found"><p className="eyebrow">404</p><h1>Page not found.</h1><p>That page is not part of this portfolio.</p><div className="hero-actions"><Link className="button primary" to="/">Back home</Link><Link className="button secondary" to="/projects">View projects<ArrowRight size={16} /></Link></div></section>; }
