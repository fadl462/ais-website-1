const nav=document.querySelector('.nav');
const onScroll=()=>{if(nav)nav.classList.toggle('scrolled',window.scrollY>60)};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('mobile-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('mobile-open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}))}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const stageData={
'EARLY YEARS':{title:'A confident beginning.',copy:'A nurturing environment where children discover the joy of learning, build independence and develop strong social foundations.',img:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=88'},
'NURSERY':{title:'Curiosity starts here.',copy:'Play, language, exploration and relationships come together to create a strong foundation for lifelong learning.',img:'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1400&q=88'},
'KG':{title:'Growing capable learners.',copy:'Children strengthen communication, early numeracy, creativity and confidence through purposeful learning experiences.',img:'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1400&q=88'},
'PRIMARY':{title:'Knowledge with purpose.',copy:'Learners build academic strength while developing critical thinking, responsibility, collaboration and confidence.',img:'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=88'},
'JUNIOR HIGH SCHOOL':{title:'Ready for the next chapter.',copy:'Students deepen subject knowledge, leadership, discipline and independent thinking as they prepare for future pathways.',img:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=88'}};
const stages=document.querySelectorAll('.stage');
const stageImg=document.querySelector('[data-stage-image]'),stageTitle=document.querySelector('[data-stage-title]'),stageCopy=document.querySelector('[data-stage-copy]'),stageLabel=document.querySelector('[data-stage-label]');
function setStage(el){const d=stageData[el.dataset.stage];if(!d||!stageImg)return;stages.forEach(x=>x.classList.remove('active'));el.classList.add('active');stageImg.style.opacity='0';setTimeout(()=>{stageImg.src=d.img;stageTitle.textContent=d.title;stageCopy.textContent=d.copy;stageLabel.textContent=el.dataset.stage;stageImg.style.opacity='1'},160)}
stages.forEach(s=>s.addEventListener('click',()=>setStage(s)));

const facilityData={CLASSROOMS:['Learning spaces designed for focus and interaction.','https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1500&q=88'],SCIENCE:['Spaces that encourage experimentation, discovery and curiosity.','https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1500&q=88'],ICT:['Digital learning environments that support modern education.','https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1500&q=88'],LIBRARY:['A place for reading, research, reflection and discovery.','https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1500&q=88'],SPORTS:['Spaces that support movement, teamwork and healthy development.','https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1500&q=88'],CAMPUS:['An environment designed to support learning, belonging and community.','assets/images/ais-campus-enhanced.jpg']};
const ft=document.querySelectorAll('.facility-tab'),fi=document.querySelector('[data-facility-image]'),fh=document.querySelector('[data-facility-title]'),fp=document.querySelector('[data-facility-copy]');
ft.forEach(t=>t.addEventListener('click',()=>{const d=facilityData[t.dataset.facility];if(!d)return;ft.forEach(x=>x.classList.remove('active'));t.classList.add('active');fi.style.opacity='0';setTimeout(()=>{fi.src=d[1];fh.textContent=t.dataset.facility;fp.textContent=d[0];fi.style.opacity='1'},160)}));

const filters=document.querySelectorAll('.filter'),items=document.querySelectorAll('.gallery-item');
filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');const v=f.dataset.filter;items.forEach(i=>{i.style.display=(v==='all'||i.dataset.category===v)?'block':'none'})}));
const lb=document.querySelector('.lightbox'),lbImg=lb?.querySelector('img');
items.forEach(i=>i.addEventListener('click',()=>{if(!lb)return;lbImg.src=i.querySelector('img').src;lb.classList.add('open');document.body.style.overflow='hidden'}));
function closeLightbox(){lb?.classList.remove('open');document.body.style.overflow=''}
lb?.addEventListener('click',e=>{if(e.target===lb||e.target.closest('button'))closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

Array.from(document.querySelectorAll('a[href^="#"]')).forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href==='#')return;const el=document.querySelector(href);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}}));
