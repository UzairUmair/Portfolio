import { pageMetadata } from './seo';

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Shared';
import Home from './pages/Home';
import { ProjectListing, ProjectDetails, NotFound } from './pages/Projects';
import { developmentProjects } from './data/projects';
import { designProjects } from './data/designProjects';
import { profile } from './data/profile';
import { Experience } from './components/experience/Experience';
import { navigation } from './components/experience/motion';

function PageEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const meta=pageMetadata(pathname);
    document.title=meta.title;
    document.querySelector('meta[name="description"]').content=meta.description;
    let canonical=document.querySelector('link[rel="canonical"]');
    if(profile.siteUrl){if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=meta.url}else canonical?.remove();
    for(const [selector,value] of [['meta[property="og:title"]',meta.title],['meta[property="og:description"]',meta.description],['meta[property="og:url"]',meta.url],['meta[name="twitter:title"]',meta.title],['meta[name="twitter:description"]',meta.description],['meta[property="og:image"]',meta.image],['meta[name="twitter:image"]',meta.image]]) document.querySelector(selector)?.setAttribute('content',value);
    document.querySelector('script[type="application/ld+json"]').textContent=JSON.stringify(meta.structured);
    document.querySelector('meta[name="robots"]').content=meta.known?'index,follow,max-image-preview:large':'noindex,follow';
    if (hash) {
      const frame=requestAnimationFrame(() => {const target=document.getElementById(hash.slice(1));if(target){if(navigation.scrollTo)navigation.scrollTo(target);else window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-(document.querySelector('.header')?.getBoundingClientRect().height || 85)-12,behavior:'instant'})}});
      return()=>cancelAnimationFrame(frame);
    } else { window.scrollTo(0, 0); document.getElementById('main-content')?.focus({ preventScroll: true }); }
  }, [pathname, hash, key]);
  return null;
}
export default function App({prerender=false}) {
  return <>{!prerender && <Experience />}<a href="#main-content" className="skip-link">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><PageEffects /><Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<ProjectListing />} /><Route path="/projects/:slug" element={<ProjectDetails />} /><Route path="/design" element={<ProjectListing key="design" design />} /><Route path="/design/:slug" element={<ProjectDetails design />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}


