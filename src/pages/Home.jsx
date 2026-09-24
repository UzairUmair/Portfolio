import { ArrowRight, ArrowUpRight, Code2, PanelsTopLeft, Layers, BookOpen, MapPin, Braces, Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { skillGroups, supportingSkills } from '../data/skills';
import { developmentProjects } from '../data/projects';
import { designProjects } from '../data/designProjects';
import { training, experience, education } from '../data/background';
import { SectionHeading, ProjectCard, DesignCard, Tags, ResumeLink, ExternalLink } from '../components/Shared';
import ContactForm from '../components/ContactForm';

function PortraitVisual() {
  return <figure className="portrait-scene">
    <div className="portrait-frame">
      <img className="hero-portrait" src={profile.portrait.src} srcSet={`${profile.portrait.small} 560w, ${profile.portrait.src} 1000w`} sizes="(max-width: 560px) calc(100vw - 56px), (max-width: 850px) 430px, 460px" width="1000" height="1250" alt="Uzair M. Umair wearing a navy blazer and white shirt" fetchPriority="high" />
      <div className="portrait-shade" aria-hidden="true" />
      <div className="portrait-caption"><span>UZAIR M. UMAIR</span><p>Front-end focused.<br />Always building.</p></div>
    </div>
    <div className="portrait-label"><Code2 size={18} aria-hidden="true" /><span>HTML <i>/</i> CSS <i>/</i> JavaScript</span></div>
    <figcaption className="portrait-learning"><BookOpen size={18} aria-hidden="true" /><div><span>CURRENTLY LEARNING</span><strong>MERN Stack <span>at SMIT</span></strong></div></figcaption>
  </figure>;
}
function Timeline({ items }) {
  return <div className="timeline">{items.map(item => <article key={item.title} className="timeline-item"><div className="timeline-top"><h3>{item.title}</h3>{item.status && <span className="status-badge">{item.status}</span>}{item.date && <span className="timeline-date">{item.date}</span>}</div><p className="organization">{item.organization}</p><p>{item.description}</p></article>)}</div>;
}
export default function Home() {
  const icons = { code: Code2, layout: PanelsTopLeft, layers: Layers, book: BookOpen };
  return <>
    <section id="home" className="hero container"><div className="hero-copy"><div className="availability"><span />Open to internships & junior opportunities</div><p className="eyebrow hello">HELLO, I'M</p><h1>Uzair M.<br /><span>Umair.</span></h1><p className="hero-title">Front-End Developer</p><p className="hero-intro">{profile.intro}</p><div className="hero-actions"><Link to="/#projects" className="button primary">View projects<ArrowUpRight size={18} /></Link><ResumeLink download /></div><div className="hero-location"><MapPin size={15} /><span>{profile.location}</span><span className="location-separator" /><a href={`mailto:${profile.email}`}>Let's connect<ArrowUpRight size={14} /></a></div></div><PortraitVisual /><div className="hero-bottom"><span>BUILT ON THE FUNDAMENTALS</span><div><span>HTML5</span><i /><span>CSS3</span><i /><span>JavaScript</span><i /><span>Responsive Web</span></div><a href="#about" aria-label="Scroll to about">SCROLL TO EXPLORE <span>↓</span></a></div></section>

    <section id="about" className="section container about-section"><SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" title={<>A front-end focus. <br />A practical approach.</>} /><div className="about-copy"><p className="large-copy">I build web interfaces with a focus on clear structure, responsive layouts and practical functionality.</p><p>My foundation is HTML, CSS and JavaScript. Through hands-on projects, I work with DOM-based interactions and bring layouts to life across different screen sizes.</p><p>I'm currently studying MERN Stack Development at SMIT, expanding into React.js, Node.js, Express.js and MongoDB. Alongside development, I also share selected graphic-design work.</p><div className="about-facts"><div><span>PRIMARY FOCUS</span><strong>Front-End Development</strong></div></div></div></section>

    <section id="skills" className="section section-tinted"><div className="container"><SectionHeading number="02" eyebrow="MY TOOLKIT" title="Fundamentals first. Always learning." description="The technologies and concepts behind my development work." /><div className="skill-grid">{skillGroups.map(group => { const Icon = icons[group.icon]; return <article key={group.title} className={`skill-card ${group.learning ? 'learning-card' : ''}`}><div className="skill-card-top"><Icon size={24} />{group.learning && <span className="status-badge">Currently learning</span>}</div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.items.map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul></article>; })}</div><div className="supporting-skills"><div><p className="eyebrow">ADDITIONAL SKILL</p><h3>{supportingSkills.join(' · ')}</h3><p>Supporting visual work in posters, advertising and social-media graphics.</p></div><Link className="text-link" to="/design">Explore graphic work<ArrowRight size={17} /></Link></div></div></section>

    <section id="projects" className="section container"><SectionHeading number="03" eyebrow="DEVELOPMENT WORK" title="Learning, put into practice." description="A selection of web projects I've built while developing my front-end skills."><Link className="text-link" to="/projects">All projects<ArrowRight size={17} /></Link></SectionHeading><div className="project-grid">{developmentProjects.slice(0, 4).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div><div className="section-end"><span>More work, more practice.</span><Link className="button secondary" to="/projects">Explore all {developmentProjects.length} projects<ArrowRight size={17} /></Link></div></section>

    <section id="design" className="section section-tinted"><div className="container"><SectionHeading number="04" eyebrow="BEYOND THE BROWSER" title="Selected graphic work." description="Branding, advertising, posters and social-media graphics."><Link className="text-link" to="/design">View all {designProjects.length} designs<ArrowRight size={17} /></Link></SectionHeading><div className="design-grid">{designProjects.map(project => <DesignCard key={project.id} project={project} />)}</div></div></section>

    <section id="training" className="section container background-grid"><div><SectionHeading number="05" eyebrow="CONTINUING TO GROW" title="Training & development." /><Timeline items={training} /></div><div className="background-secondary"><div><p className="eyebrow">SUPPORTING EXPERIENCE</p><h2>Work beyond development.</h2><Timeline items={experience} /></div><div><p className="eyebrow">EDUCATION</p><h2>Academic background.</h2><Timeline items={education} /></div></div></section>

    <section className="container resume-section" aria-labelledby="resume-title"><div className="resume-icon"><Braces size={34} /></div><div><p className="eyebrow">THE FULL PICTURE</p><h2 id="resume-title">A little more on paper.</h2><p>My skills, training and experience in one place.</p></div><div className="resume-actions"><ResumeLink /><ResumeLink download className="button primary" /></div></section>

    <section id="contact" className="section container contact-section"><div><SectionHeading number="06" eyebrow="LET'S CONNECT" title={<>Let's build <br />what's next.</>} description="I'm open to Front-End Developer internships, junior web-development roles and relevant project opportunities." /><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={21} /></a><a className="whatsapp-contact" href={profile.whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp · {profile.whatsapp.number}<ArrowUpRight size={18} /></a><div className="contact-links">{profile.socials.map(social => <ExternalLink href={social.url} key={social.label}>{social.label}</ExternalLink>)}<span><MapPin size={15} />{profile.location}</span></div></div><ContactForm /></section>
  </>;
}





