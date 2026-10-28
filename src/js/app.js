import {header,hero,about,research,projects,publications,teaching,talks,contact,footer} from './components.js';
const root=document.querySelector('#site');
const contentUrl=new URL('../content/site-data.json',import.meta.url);
const d=await fetch(contentUrl).then(response=>{if(!response.ok) throw new Error(`内容文件加载失败（${response.status}）`); return response.json()});
root.innerHTML=header()+`<main id="top">${hero(d.profile,d.hero)}${about(d.profile)}${research(d.research)}${projects(d.projects)}${publications(d.publications)}${teaching(d.teaching)}${talks(d.talks)}${contact(d.profile)}</main>`+footer();
const pubList=document.querySelector('#pub-list');
function filterPublications(filter='all'){document.querySelectorAll('#pub-list .pub-row').forEach(row=>row.hidden=filter!=='all'&&row.dataset.kind!==filter)}
document.querySelectorAll('.pub-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.pub-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;const section=document.getElementById('publications');if(filter!=='all'){section.classList.remove('is-collapsed');section.querySelector('.more-toggle').textContent='收起内容 ↑'}filterPublications(filter)}));
document.querySelectorAll('.more-toggle').forEach(btn=>btn.addEventListener('click',()=>{const section=document.getElementById(btn.dataset.target);const open=section.classList.toggle('is-collapsed')===false;btn.textContent=open?'收起内容 ↑':`查看更多${btn.dataset.target==='publications'?'成果':btn.dataset.target==='teaching'?'教学':'讲座'} ↗`}));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
