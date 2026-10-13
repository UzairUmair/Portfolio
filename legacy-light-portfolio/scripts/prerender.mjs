import { createServer, loadEnv } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
process.env.VITE_SITE_URL ||= loadEnv('production',process.cwd(),'VITE_').VITE_SITE_URL || '';
const {routes,pageMetadata}=await import('../src/seo.js');
const {profile}=await import('../src/data/profile.js');
if(profile.siteUrl && (!/^https:\/\/[^/]+$/.test(profile.siteUrl)))throw new Error('VITE_SITE_URL must be an HTTPS origin without a path.');
const server=await createServer({server:{middlewareMode:true},appType:'custom',ssr:{noExternal:['gsap','lenis']}});
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
try{
 const {render}=await server.ssrLoadModule('/src/entry-server.jsx');
 const template=await readFile('dist/index.html','utf8');
 for(const route of routes){
  const m=pageMetadata(route);
  let html=template.replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(m.title)}</title>`);
  for(const [key,value] of [['name="description"',m.description],['property="og:title"',m.title],['property="og:description"',m.description],['property="og:url"',m.url],['property="og:image"',m.image],['name="twitter:image"',m.image],['name="twitter:title"',m.title],['name="twitter:description"',m.description]])html=html.replace(new RegExp(`<meta ${key} content="[^"]*"\\s*/?>`),`<meta ${key} content="${escape(value)}" />`);
  html=html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/,`<link rel="canonical" href="${m.url}" />`).replace(/<script type="application\/ld\+json">.*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(m.structured).replace(/</g,'\\u003c')}</script>`);
  if(profile.siteUrl)html=html.replace('</head>',`<link rel="canonical" href="${escape(m.url)}" /></head>`);
  else html=html.replace(/<meta property="og:url"[^>]*>/,'');
  const directory=route==='/'?'dist':`dist${route}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}/index.html`,html);
 }
 if(profile.siteUrl)await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>${profile.siteUrl}${route}</loc></url>`).join('')}</urlset>`);
 if(!profile.siteUrl)await rm('dist/sitemap.xml',{force:true});
 await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${profile.siteUrl?'Sitemap: '+profile.siteUrl+'/sitemap.xml\n':''}`);
 console.log(`Prerendered ${routes.length} public routes with crawlable content and route metadata.`);
}finally{await server.close()}
