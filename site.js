const $=s=>document.querySelector(s);
const SHOW_PLACEHOLDERS=true; // set to false before publishing to hide the dashed "add your notes" boxes
const LAST_UPDATED='7 October 2026, 16:16 IST'; // edit date and time here whenever you update the site
const PAGES=[['index.html','About'],['work.html','Work & Education'],['research.html','Research'],['awards.html','Grants & Honors'],['publications.html','Publications'],['outreach.html','Science Communication'],['teaching.html','Teaching & Mentoring']];
/* pages that exist so far: any other tab is shown greyed out instead of as a link that would give a 404 */
const BUILT=['index.html'];
const norm=x=>x.replace('.html','')||'index';
const cur=norm(location.pathname.split('/').pop());
$('#nav').innerHTML=`<nav><div class="wrap"><b><a href="index.html">Abigail Jennifer</a></b><div class="links">${PAGES.map(p=>BUILT.includes(p[0])?`<a href="${p[0]}"${norm(p[0])===cur?' class="on" aria-current="page"':''}>${p[1]}</a>`:`<span class="soon" title="Coming soon">${p[1]}</span>`).join('')}</div><button id="th" aria-label="Switch light or dark theme">&#9788;</button></div></nav>`;
$('#foot').innerHTML='<footer>&copy; 2026 Abigail Jennifer. Electronic structure theory of the f-block.</footer>';
const root=document.documentElement,tb=$('#th');
try{const s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
tb.onclick=()=>{const d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;try{localStorage.setItem('theme',d)}catch(e){}};
if(!SHOW_PLACEHOLDERS)document.querySelectorAll('.ph').forEach(e=>e.remove());
