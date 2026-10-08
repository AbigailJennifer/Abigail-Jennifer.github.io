const $=s=>document.querySelector(s);
const SHOW_PLACEHOLDERS=true; // set to false before publishing to hide the dashed "add your notes" boxes
const LAST_UPDATED='8 October 2026, 15:32 IST'; // edit date and time here whenever you update the site
const PAGES=[['index.html','About'],['work.html','Work & Education'],['research.html','Research'],['awards.html','Grants & Honors'],['publications.html','Publications'],['outreach.html','Science Communication'],['teaching.html','Teaching & Mentoring']];
/* pages that exist so far: any other page is greyed out in the menu instead of being a link that would give a 404 */
const BUILT=['index.html'];
const norm=x=>x.replace('.html','')||'index';
const cur=norm(location.pathname.split('/').pop());
const items=PAGES.map(p=>BUILT.includes(p[0])?`<a href="${p[0]}"${norm(p[0])===cur?' class="on" aria-current="page"':''}>${p[1]}</a>`:`<span class="soon" title="Coming soon">${p[1]}</span>`).join('');
$('#nav').innerHTML=`<nav><div class="wrap"><b><a href="index.html">Abigail Jennifer</a></b><div class="links">${items}</div><button id="th" aria-label="Switch light or dark theme">&#9788;</button><button id="mn" aria-expanded="false" aria-controls="pl" aria-label="Open page menu"><svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" stroke-width="2"/></svg>Menu</button></div><div class="plist" id="pl" hidden>${items}</div></nav>`;
const mn=$('#mn'),pl=$('#pl'),navEl=$('nav');
const menu=o=>{pl.hidden=!o;mn.setAttribute('aria-expanded',o)};
mn.onclick=e=>{e.stopPropagation();menu(pl.hidden)};
document.addEventListener('click',e=>{if(!pl.contains(e.target))menu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
/* at the top the full page list shows; once you scroll it folds into the Menu button */
const fold=()=>{const f=scrollY>40;navEl.classList.toggle('sc',f);if(!f)menu(false)};
addEventListener('scroll',fold,{passive:true});fold();
$('#foot').innerHTML='<footer>&copy; 2026 Abigail Jennifer. Electronic structure theory of the f-block.</footer>';
const root=document.documentElement,tb=$('#th');
try{const s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
tb.onclick=()=>{const d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;try{localStorage.setItem('theme',d)}catch(e){}};
if(!SHOW_PLACEHOLDERS)document.querySelectorAll('.ph').forEach(e=>e.remove());
