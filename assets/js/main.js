document.documentElement.classList.add('js');
const nav=document.querySelector('.nav');
const onScroll=()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>60)};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
if(menu&&links){
  const closeMenu=()=>{links.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰';document.body.classList.remove('mobile-menu-open')};
  menu.addEventListener('click',()=>{const open=!links.classList.contains('mobile-open');links.classList.toggle('mobile-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰';document.body.classList.toggle('mobile-menu-open',open)});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('mobile-open'))closeMenu()});
  window.addEventListener('resize',()=>{if(window.innerWidth>820)closeMenu()},{passive:true});
}

const revealItems=[...document.querySelectorAll('.reveal')];
// Reveal is intentionally fail-safe: content starts visible so slow connections or blocked observers never create blank sections.
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.04,rootMargin:'0px 0px 120px'});
  revealItems.forEach(el=>observer.observe(el));
  requestAnimationFrame(()=>revealItems.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<window.innerHeight*1.25&&r.bottom>0)el.classList.add('visible')}));
}else{revealItems.forEach(el=>el.classList.add('visible'));document.documentElement.classList.add('no-motion')}

// Documentary opens in a premium modal so the homepage never turns into a black inline player.
const videoTriggers=document.querySelectorAll('.video-trigger,.video-poster');
const videoModal=document.querySelector('.video-modal');
const videoModalFrame=videoModal?.querySelector('.video-modal-frame');
const videoModalClose=videoModal?.querySelector('.video-modal-close');
function playAISVideo(trigger){
  if(!videoModal||!videoModalFrame)return;
  const id=trigger?.dataset.videoId||'cFExUdqsbL8';
  const start=trigger?.dataset.videoStart||'22';
  videoModalFrame.innerHTML=`<iframe src="https://www.youtube.com/embed/${id}?start=${start}&autoplay=1&rel=0&modestbranding=1&playsinline=1" title="T I Ahmadiyyah School Documentary" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeAISVideo(){
  if(!videoModal)return;
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden','true');
  if(videoModalFrame)videoModalFrame.innerHTML='';
  document.body.style.overflow='';
}
videoTriggers.forEach(t=>{
  t.addEventListener('click',()=>playAISVideo(t));
});
videoModalClose?.addEventListener('click',closeAISVideo);
videoModal?.addEventListener('click',e=>{if(e.target===videoModal)closeAISVideo()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAISVideo()});

const assetPath=document.body && location.pathname.includes('/pages/')?'../assets/images/':'assets/images/';
const stageData={
'Early Years':null,
'EARLY YEARS':{title:'A confident beginning.',copy:'A nurturing environment where children discover the joy of learning, build independence and develop strong social foundations.',img:assetPath+'ais-early-years-feature.jpg'},
'NURSERY':{title:'Curiosity starts here.',copy:'Play, language, exploration and relationships come together to create a strong foundation for lifelong learning.',img:assetPath+'ais-early-years-feature.jpg'},
'KG':{title:'Growing capable learners.',copy:'Children strengthen communication, early numeracy, creativity and confidence through purposeful learning experiences.',img:assetPath+'ais-campus-clean-4k.jpg'},
'PRIMARY':{title:'Knowledge with purpose.',copy:'Learners build academic strength while developing critical thinking, responsibility, collaboration and confidence.',img:assetPath+'ais-campus-clean-4k.jpg'},
'JUNIOR HIGH SCHOOL':{title:'Ready for the next chapter.',copy:'Students deepen subject knowledge, leadership, discipline and independent thinking as they prepare for future pathways.',img:assetPath+'ais-campus-clean-4k.jpg'}};
const stages=document.querySelectorAll('.stage');
const stageImg=document.querySelector('[data-stage-image]'),stageTitle=document.querySelector('[data-stage-title]'),stageCopy=document.querySelector('[data-stage-copy]'),stageLabel=document.querySelector('[data-stage-label]');
function setStage(el){const d=stageData[el.dataset.stage];if(!d||!stageImg)return;stages.forEach(x=>x.classList.remove('active'));el.classList.add('active');stageImg.style.opacity='0';setTimeout(()=>{stageImg.src=d.img;stageTitle.textContent=d.title;stageCopy.textContent=d.copy;stageLabel.textContent=el.dataset.stage;stageImg.style.opacity='1'},160)}
stages.forEach(s=>s.addEventListener('click',()=>setStage(s)));

const facilityData={CLASSROOMS:['Learning spaces will be showcased with approved AIS classroom photography when supplied.',null],SCIENCE:['Science and laboratory imagery will be added from verified AIS photographs.',null],ICT:['ICT learning imagery will be added from verified AIS photographs.',null],LIBRARY:['Library imagery will be added from verified AIS photographs.',null],SPORTS:['Sports imagery will be added from verified AIS photographs.',null],CAMPUS:['The AIS campus at Bustan-e-Ahmad, Ashongman.','assets/images/ais-campus-clean-4k.jpg']};
const ft=document.querySelectorAll('.facility-tab'),fi=document.querySelector('[data-facility-image]'),fh=document.querySelector('[data-facility-title]'),fp=document.querySelector('[data-facility-copy]');
function setFacility(t){const d=facilityData[t.dataset.facility];if(!d||!fi)return;ft.forEach(x=>x.classList.remove('active'));t.classList.add('active');const parent=fi.parentElement;fi.style.opacity='0';setTimeout(()=>{if(d[1]){fi.style.display='block';fi.src=d[1]}else{fi.style.display='none'}fh.textContent=t.dataset.facility;fp.textContent=d[0];if(!d[1]&&!parent.querySelector('.facility-placeholder')){const ph=document.createElement('div');ph.className='facility-placeholder';ph.innerHTML=`<div><span>Verified photography pending</span><strong>${t.dataset.facility}</strong><p>${d[0]}</p></div>`;parent.insertBefore(ph,parent.firstChild)}else if(d[1]){parent.querySelector('.facility-placeholder')?.remove()}fi.style.opacity='1'},160)}
ft.forEach(t=>t.addEventListener('click',()=>setFacility(t)));

const filters=document.querySelectorAll('.filter'),items=document.querySelectorAll('.gallery-item');
filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');const v=f.dataset.filter;items.forEach(i=>{i.style.display=(v==='all'||i.dataset.category===v)?'block':'none'})}));
const lb=document.querySelector('.lightbox'),lbImg=lb?.querySelector('img');
items.forEach(i=>i.addEventListener('click',()=>{if(!lb)return;lbImg.src=i.querySelector('img').src;lb.classList.add('open');document.body.style.overflow='hidden'}));
function closeLightbox(){lb?.classList.remove('open');document.body.style.overflow=''}
lb?.addEventListener('click',e=>{if(e.target===lb||e.target.closest('button'))closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

Array.from(document.querySelectorAll('a[href^="#"]')).forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href==='#')return;const el=document.querySelector(href);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}}));

// Global page navigation state — keeps the selected menu item visibly active
// on every page, including News article pages and the mobile menu.
(function setActiveNav(){
  const navLinks=document.querySelectorAll('.nav-links a');
  if(!navLinks.length)return;
  const path=window.location.pathname.replace(/\\/g,'/');
  const file=(path.split('/').pop()||'index.html').toLowerCase();
  let activeKey=file;
  if(file==='index.html'||file==='') activeKey='home';
  else if(file.startsWith('news-')) activeKey='news.html';
  navLinks.forEach(a=>{
    a.classList.remove('active');
    a.removeAttribute('aria-current');
    const href=a.getAttribute('href')||'';
    const target=(new URL(href,window.location.href).pathname.split('/').pop()||'index.html').toLowerCase();
    const isActive=(activeKey==='news.html' && target==='news.html') || target===activeKey;
    if(isActive){
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
})();
