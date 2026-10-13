import type { Metadata } from 'next';
import { site } from '@/data/site';
export const preview = process.env.VERCEL_ENV === 'preview';
function publicOrigin(){ const raw=process.env.SITE_URL; if(!raw)return undefined; try{const u=new URL(raw);return u.protocol==='https:'&&!['localhost','127.0.0.1'].includes(u.hostname)?u.origin:undefined;}catch{return undefined;} }
export const origin=publicOrigin();
export function metadata(title:string,description:string,path:string):Metadata{return {
 title,description, ...(origin?{metadataBase:new URL(origin),alternates:{canonical:origin+path}}:{}),
 robots:{index:!preview,follow:!preview},
 openGraph:{title,description,type:'website',siteName:'Uzair Umair — Creative Portfolio',...(origin?{url:origin+path,images:[{url:origin+'/og/portfolio.jpg',width:1200,height:630,alt:'Uzair Umair — Creative by design. Built with code.'}]}:{})},
 twitter:{card:'summary_large_image',title,description,...(origin?{images:[origin+'/og/portfolio.jpg']}:{})}
};}
export const person={ '@type':'Person','@id':origin?origin+'/#person':'#person',name:site.name,jobTitle:site.role,description:site.description,address:{'@type':'PostalAddress',addressLocality:'Karachi',addressCountry:'PK'},sameAs:[site.github,site.linkedin],knowsAbout:['JavaScript','React','Responsive web design','Graphic design']};
export function pageSchema(path:string,name:string,type='WebPage'){return {'@context':'https://schema.org','@graph':[person,{'@type':type,name,...(origin?{url:origin+path}:{}),about:{'@id':person['@id']}}]};}
