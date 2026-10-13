const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
function load(file, env, dependencies = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, { exports: module.exports, module, process: { env }, URL, require: name => {
    if (!(name in dependencies)) throw new Error('Unexpected import: ' + name);
    return dependencies[name];
  }});
  return module.exports;
}
const site = load('src/data/site.ts', {});
const projects = load('src/data/projects.ts', {});
for (const [env, indexed, origin] of [
  [{}, true, undefined],
  [{SITE_URL: 'https://portfolio.example'}, true, 'https://portfolio.example'],
  [{SITE_URL: 'https://portfolio.example', VERCEL_ENV: 'preview'}, false, 'https://portfolio.example'],
  [{SITE_URL: 'http://localhost:5175'}, true, undefined],
  [{SITE_URL: 'not-a-url'}, true, undefined]
]) {
  const seo = load('src/lib/seo.ts', env, {'@/data/site': site});
  assert.equal(seo.origin, origin);
  const meta = seo.metadata('Test', 'Description', '/work');
  assert.equal(meta.robots.index, indexed);
  assert.equal(meta.alternates?.canonical, origin ? origin + '/work' : undefined);
  const deps = {'@/lib/seo': seo, '@/data/projects': projects};
  const map = load('src/app/sitemap.ts', env, deps).default();
  assert.equal(map.length, origin && indexed ? 6 : 0);
  for (const entry of map) assert(entry.url.startsWith(origin + '/'));
  const robots = load('src/app/robots.ts', env, deps).default();
  assert.equal(robots.rules.disallow, indexed ? undefined : '/');
  assert.equal(robots.sitemap, origin && indexed ? origin + '/sitemap.xml' : undefined);
}
(async()=>{
 const preview = load('next.config.ts', {VERCEL_ENV:'preview'}).default;
 assert.equal((await preview.headers())[0].headers[0].value, 'noindex, nofollow');
 console.log('PASS: unset, configured, invalid and preview domain metadata; sitemap, robots and preview headers. No deployment URL assumed.');
})();
