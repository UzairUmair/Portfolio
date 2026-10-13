import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Download, Menu, X, ChevronLeft, ChevronRight, Expand, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { gsap, reducedMotion } from './experience/motion';

export function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}
export function ResumeLink({ download = false, className = 'button secondary', children }) {
  return <a className={className} href={profile.resume} download={download ? 'Uzair-M-Umair-Resume.pdf' : undefined} target={download ? undefined : '_blank'} rel="noopener noreferrer">{children || (download ? 'Download resume' : 'View resume')}<Download size={16} aria-hidden="true" /></a>;
}
export function SectionHeading({ number, eyebrow, title, description, children }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span>{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{children}</div>;
}
const navigation = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['design', 'Design'], ['training', 'Journey'], ['contact', 'Contact']];
export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef(null), trigger = useRef(null), animation = useRef(null);
  const phase = useRef('closed'), previousOverflow = useRef(''), pendingFrame = useRef(0);
  const closeMenu = (destination) => {
    if (!menu.current?.open || phase.current === 'closing') return;
    phase.current = 'closing';
    animation.current?.kill();
    animation.current = gsap.to(menu.current, {
      clipPath: 'inset(0 0 100% 0)', duration: reducedMotion() ? 0 : .32, ease: 'power3.inOut',
      onComplete: () => {
        menu.current?.close();
        document.body.style.overflow = previousOverflow.current;
        phase.current = 'closed'; setMenuOpen(false);
        if (typeof destination === 'string') pendingFrame.current = requestAnimationFrame(() => navigate(destination));
        else trigger.current?.focus({preventScroll:true});
      }
    });
  };
  const openMenu = () => {
    if (phase.current !== 'closed') return;
    phase.current = 'opening'; animation.current?.kill();
    previousOverflow.current = document.body.style.overflow;
    menu.current.showModal(); menu.current.scrollTop = 0;
    setMenuOpen(true); document.body.style.overflow = 'hidden';
    const instant = reducedMotion();
    animation.current = gsap.timeline({onComplete:()=>{phase.current='open'}})
      .fromTo(menu.current,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:instant?0:.55,ease:'power4.out'})
      .fromTo(menu.current.querySelectorAll('nav a'),{y:instant?0:28,opacity:0},{y:0,opacity:1,duration:instant?0:.4,stagger:instant?0:.035,ease:'power3.out'},instant?0:.12);
  };
  useEffect(() => { closeMenu(); }, [location.key]);
  useEffect(() => () => {
    animation.current?.kill(); cancelAnimationFrame(pendingFrame.current);
    if (phase.current !== 'closed') document.body.style.overflow = previousOverflow.current;
  }, []);
  useEffect(() => {
    if (location.pathname !== '/') return;
    let frame;
    const update = () => {
      const sections = [...document.querySelectorAll('main section[id]')];
      const current = sections.filter(section=>section.getBoundingClientRect().top <= Math.max(110, innerHeight*.25)).at(-1);
      setActive(current?.id || 'home');
    };
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',scroll);
    return () => {cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
  }, [location.pathname]);
  const links = navigation.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={event=>{
    if (!menu.current?.open || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); closeMenu(`/#${id}`);
  }} aria-current={(location.pathname === '/' ? active === id : location.pathname.startsWith(`/${id}`)) ? 'location' : undefined}>{label}<ArrowUpRight className="nav-link-arrow" size={26} aria-hidden="true"/></Link>);
  return <header className="header" data-chapter={active}><div className="container nav-inner">
    <Link to="/#home" className="wordmark" aria-label="Uzair M. Umair home">UZ<span>.</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links}</nav>
    <div className="nav-actions"><ResumeLink className="button secondary small">Resume</ResumeLink><button ref={trigger} className="icon-button menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={openMenu}><Menu size={22} /></button></div>
    <dialog id="mobile-navigation" ref={menu} className="mobile-menu" aria-label="Navigation" onCancel={event=>{event.preventDefault();closeMenu()}} onClose={()=>{setMenuOpen(false)}} onClick={event=>{if(event.target===menu.current)closeMenu()}}><div className="mobile-menu-top"><span className="wordmark">UZ<span>.</span></span><button className="icon-button" aria-label="Close navigation" onClick={()=>closeMenu()}><X /></button></div><nav aria-label="Portfolio navigation">{links}</nav><p>MERN Stack Developer<br /><span className="muted">Karachi, Pakistan</span></p></dialog>
  </div></header>;
}
export function Tags({ items }) { return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>; }
export function ProjectCard({ project, index }) {
  return <article className="project-card"><Link to={`/projects/${project.id}`} className="project-image" tabIndex={-1} aria-hidden="true"><img src={project.coverImage} alt="" loading="lazy" width="1600" height="772" /><span className="image-arrow"><ArrowUpRight size={22} /></span></Link><div className="project-body"><div className="project-meta"><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div><h3><Link to={`/projects/${project.id}`}>{project.title}</Link></h3><p>{project.shortDescription}</p><Tags items={project.technologies} /><div className="project-actions"><ExternalLink href={project.liveUrl}>Live project</ExternalLink><Link to={`/projects/${project.id}`}>View details <ArrowRight size={16} aria-hidden="true" /></Link></div></div></article>;
}
export function DesignCard({ project }) {
  return <article className={`design-card ${project.id.includes('billboard') ? 'landscape' : ''}`}><Link to={`/design/${project.id}`} className="design-image"><img src={project.coverImage} alt={project.description} loading="lazy" /><span className="image-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span></Link><div className="design-caption"><div><p className="eyebrow">{project.category}</p><h3><Link to={`/design/${project.id}`}>{project.title}</Link></h3></div><ArrowUpRight size={18} aria-hidden="true" /></div></article>;
}
export function Gallery({ images, title }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const move = delta => setIndex(current => (current + delta + images.length) % images.length);
  useEffect(() => () => { document.body.style.overflow = ''; }, []);
  return <><div className="detail-gallery">{images.map((src, i) => <button className="gallery-trigger" key={src} onClick={() => { setIndex(i); dialog.current.showModal(); document.body.style.overflow = 'hidden'; }} aria-label={`Enlarge ${title} image ${i + 1}`}><img src={src} alt={`${title} — supplied project image ${i + 1}`} loading="lazy" /><span><Expand size={16} /> View full image</span></button>)}</div>
    <dialog ref={dialog} className="lightbox" aria-label={`${title} image viewer`} onClose={() => { document.body.style.overflow = ''; }} onKeyDown={e => { if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); }} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><div className="lightbox-bar"><span>{title} · {index + 1} / {images.length}</span><button className="icon-button" aria-label="Close image viewer" onClick={() => dialog.current.close()}><X /></button></div><img src={images[index]} alt={`${title} enlarged`} />{images.length > 1 && <div className="lightbox-controls"><button className="button secondary" onClick={() => move(-1)}><ChevronLeft />Previous</button><button className="button secondary" onClick={() => move(1)}>Next<ChevronRight /></button></div>}</dialog></>;
}
export function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Link className="wordmark" to="/#home">UZ<span>.</span></Link><p>{profile.name}<span>MERN Stack Developer</span></p></div><nav aria-label="Footer navigation"><Link to="/projects">Projects</Link><Link to="/design">Design work</Link><a href={`mailto:${profile.email}`}><Mail size={16} />Email</a>{profile.socials.map(social => <ExternalLink key={social.label} href={social.url}>{social.label}</ExternalLink>)}</nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built with React & Vite</span><Link to="/#home">Restart experience ↑</Link></div></footer>;
}



