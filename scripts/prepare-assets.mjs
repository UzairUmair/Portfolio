import {browserOptions} from './browser-options.mjs';
import sharp from 'sharp';import {mkdir,writeFile} from 'node:fs/promises';import {chromium} from 'playwright';
await mkdir('public/images',{recursive:true});
for(const [source,name] of [['D:/Download/Downloads/ChatGPT Image Sep 16, 2026, 09_14_11 PM.png','uzair'],['F:/SMIT Work/Assignment 24.png','burger'],['F:/SMIT Work/Assignment 27.png','nexify'],['F:/SMIT Work/Assignment 23.png','karachi'],['F:/SMIT Work/SMIT 1.png','new-year']]) await sharp(source).resize({width:800,withoutEnlargement:true}).webp({quality:87}).toFile('public/images/'+name+'.webp');
const browser=await chromium.launch(browserOptions);const page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const [slug,url] of [['cineverse','https://cineverse-uu.vercel.app'],['freelancerflow','https://freelancer-flow-ruddy.vercel.app']]){try{await page.goto(url,{waitUntil:'networkidle',timeout:30000});await page.screenshot({path:'assets/sources/'+slug+'.png'});console.log(slug,await page.title(),(await page.locator('body').innerText()).slice(0,500))}catch(e){console.log(slug,e.message)}}await browser.close();
