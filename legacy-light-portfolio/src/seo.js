import { profile } from './data/profile.js';
import { developmentProjects } from './data/projects.js';
import { designProjects } from './data/designProjects.js';
export const routes=['/','/projects','/design',...developmentProjects.map(p=>`/projects/${p.id}`),...designProjects.map(p=>`/design/${p.id}`)];
export function pageMetadata(pathname){
 const project=[...developmentProjects,...designProjects].find(p=>pathname===`/projects/${p.id}`||pathname===`/design/${p.id}`);
 const label=project?.title||(pathname==='/projects'?'Web Development Projects':pathname==='/design'?'Graphic Design Portfolio':'');
 const title=label?`${label} | ${profile.name}`:`${profile.name} | MERN Stack Developer in Karachi`;
 const description=project?.shortDescription||project?.description|| (pathname==='/projects'?'Explore Uzair Umair’s web development projects: FreelancerFlow, CineVerse, Pick & Wear, a React blog and a Firebase notes app.':pathname==='/design'?'Graphic design by Uzair Umair: Pure Roots branding, advertising mockups, posters and social media artwork.':profile.intro);
 const url=profile.siteUrl+pathname, image=profile.siteUrl+(project?.coverImage||profile.portrait.src);
 const person={'@type':'Person','@id':profile.siteUrl+'/#person',name:profile.name,url:profile.siteUrl,jobTitle:profile.title,image:profile.siteUrl+profile.portrait.src,sameAs:profile.socials.map(s=>s.url),address:{'@type':'PostalAddress',addressLocality:'Karachi',addressCountry:'PK'}};
 const graph=[person,{'@type':'WebSite','@id':profile.siteUrl+'/#website',url:profile.siteUrl,name:'Uzair Umair Portfolio',author:{'@id':person['@id']}},{'@type':pathname==='/'?'ProfilePage':'WebPage','@id':url,url,name:title,description,isPartOf:{'@id':profile.siteUrl+'/#website'},mainEntity:project?{'@id':url+'#work'}:{'@id':person['@id']}}];
 if(project)graph.push({'@type':'CreativeWork','@id':url+'#work',name:project.title,description,url,image,creator:{'@id':person['@id']}});
 if(pathname!=='/')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:profile.siteUrl+'/'},{'@type':'ListItem',position:2,name:pathname.startsWith('/design')?'Graphic Design':'Projects',item:profile.siteUrl+(pathname.startsWith('/design')?'/design':'/projects')},...(project?[{'@type':'ListItem',position:3,name:project.title,item:url}]:[])]});
 return {title,description,url,image,structured:{'@context':'https://schema.org','@graph':graph},known:routes.includes(pathname)};
}
