import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Shared';
import Home from './pages/Home';
import { ProjectListing, ProjectDetails, NotFound } from './pages/Projects';
import { developmentProjects } from './data/projects';
import { designProjects } from './data/designProjects';
import { profile } from './data/profile';

function PageEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const project = [...developmentProjects, ...designProjects].find(item => pathname.endsWith(`/${item.id}`));
    const label = project?.title || (pathname === '/projects' ? 'Development Projects' : pathname === '/design' ? 'Graphic Design Work' : '');
    document.title = label ? `${label} | ${profile.name}` : `${profile.name} | ${profile.title}`;
    const description = project?.shortDescription || project?.description || profile.intro;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('link[rel="canonical"]').href = profile.siteUrl + pathname;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:url"]').content = profile.siteUrl + pathname;
    document.querySelector('meta[name="twitter:title"]').content = document.title;
    document.querySelector('meta[name="twitter:description"]').content = description;
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
    } else { window.scrollTo(0, 0); document.getElementById('main-content')?.focus({ preventScroll: true }); }
  }, [pathname, hash, key]);
  return null;
}
export default function App() {
  return <><a href="#main-content" className="skip-link">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><PageEffects /><Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<ProjectListing />} /><Route path="/projects/:slug" element={<ProjectDetails />} /><Route path="/design" element={<ProjectListing key="design" design />} /><Route path="/design/:slug" element={<ProjectDetails design />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}
