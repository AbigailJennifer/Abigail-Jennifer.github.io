/* Landing-page background: faint atoms with electrons on tilted orbits, drifting slowly.
   Quiet by design: low opacity, pauses off-screen, and draws one still frame if the visitor prefers reduced motion. */
(()=>{
const hero=document.querySelector('.hero');if(!hero)return;
const cv=document.createElement('canvas');cv.id='bg';cv.setAttribute('aria-hidden','true');hero.prepend(cv);
const g=cv.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let W,H,atoms=[],teal,amber,run=true,last=0;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const colours=()=>{teal=css('--teal');amber=css('--amber')};
function init(){
  const d=window.devicePixelRatio||1;W=hero.clientWidth;H=hero.clientHeight;
  cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);
  const n=Math.max(4,Math.round(W/240));atoms=[];
  for(let i=0;i<n;i++){
    const k=2+Math.floor(Math.random()*2),orb=[];
    for(let j=0;j<k;j++)orb.push({a:34+j*24+Math.random()*10,b:13+j*9,t:Math.random()*Math.PI,p:Math.random()*6.28,s:(j%2?-1:1)*(0.9-j*0.2)*(0.6+Math.random()*0.5)});
    atoms.push({x:(i+.5)/n*W+(Math.random()-.5)*70,y:H*(.18+Math.random()*.64),vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.06,orb,z:.8+Math.random()*.7});
  }
}
function draw(dt){
  g.clearRect(0,0,W,H);
  g.lineWidth=1;
  for(let i=0;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){
    const a=atoms[i],b=atoms[j],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<300){g.globalAlpha=.1*(1-d/300);g.strokeStyle=teal;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}
  }
  for(const at of atoms){
    at.x+=at.vx*dt*.06;at.y+=at.vy*dt*.06;
    if(at.x<-80)at.x=W+80;if(at.x>W+80)at.x=-80;if(at.y<20||at.y>H-20)at.vy*=-1;
    for(const o of at.orb){
      o.t+=dt*.00003;o.p+=o.s*dt*.0012;
      g.globalAlpha=.16;g.strokeStyle=teal;g.beginPath();g.ellipse(at.x,at.y,o.a*at.z,o.b*at.z,o.t,0,6.283);g.stroke();
      const ex=o.a*at.z*Math.cos(o.p),ey=o.b*at.z*Math.sin(o.p),c=Math.cos(o.t),s=Math.sin(o.t);
      g.globalAlpha=.55;g.fillStyle=amber;g.beginPath();g.arc(at.x+ex*c-ey*s,at.y+ex*s+ey*c,2.2,0,6.283);g.fill();
    }
    g.globalAlpha=.4;g.fillStyle=teal;g.beginPath();g.arc(at.x,at.y,3.2,0,6.283);g.fill();
  }
  g.globalAlpha=1;
}
let going=false;
function kick(){if(run&&!going){going=true;last=0;requestAnimationFrame(loop)}}
function loop(t){if(!run){going=false;return}const dt=Math.min(50,t-last||16);last=t;draw(dt);requestAnimationFrame(loop)}
colours();init();draw(0);
new MutationObserver(()=>{colours();if(reduce)draw(0)}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
addEventListener('resize',()=>{init();if(reduce)draw(0)});
if(!reduce){
  new IntersectionObserver(e=>{run=e[0].isIntersecting&&!document.hidden;kick()}).observe(hero);
  document.addEventListener('visibilitychange',()=>{run=!document.hidden;kick()});
}
})();
