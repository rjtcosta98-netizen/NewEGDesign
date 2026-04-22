// Duplica os cards do portfólio para loop infinito sem corte
const hpTrack = document.querySelector('.hp-track');
if(hpTrack){ hpTrack.insertAdjacentHTML('beforeend', hpTrack.innerHTML); }

// Carrossel 3D dos serviços
(function(){
  const stage = document.querySelector('.svc3d-stage');
  if(!stage) return;
  const cards = Array.from(stage.querySelectorAll('.card3d'));
  const dotsWrap = document.querySelector('.svc3d-dots');
  const prev = document.querySelector('.svc3d-nav.prev');
  const next = document.querySelector('.svc3d-nav.next');
  let idx = 0, timer = null;
  const N = cards.length;

  // dots
  cards.forEach((_,i)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Ir para serviço ' + (i+1));
    b.addEventListener('click', ()=>go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  function place(){
    cards.forEach((c,i)=>{
      c.classList.remove('is-active','is-prev','is-next','is-prev2','is-next2');
      const d = ((i - idx) % N + N) % N;
      if(d === 0) c.classList.add('is-active');
      else if(d === 1) c.classList.add('is-next');
      else if(d === 2) c.classList.add('is-next2');
      else if(d === N-1) c.classList.add('is-prev');
      else if(d === N-2) c.classList.add('is-prev2');
    });
    dots.forEach((d,i)=>d.classList.toggle('is-on', i===idx));
  }
  function go(i, manual){
    idx = ((i % N) + N) % N;
    place();
    if(manual){ restart(); }
  }
  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(()=>go(idx+1), 5000);
  }

  prev.addEventListener('click', ()=>go(idx-1, true));
  next.addEventListener('click', ()=>go(idx+1, true));
  cards.forEach((c,i)=>c.addEventListener('click', ()=>{
    if(!c.classList.contains('is-active')) go(i, true);
  }));
  // pausa em hover
  stage.parentElement.addEventListener('mouseenter', ()=>timer && clearInterval(timer));
  stage.parentElement.addEventListener('mouseleave', restart);

  place();
  restart();
})();

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Counter animado para .ct (estatísticas)
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.dec || '0', 10);
    const dur = 1600; const t0 = performance.now();
    function step(t){
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(dec);
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = to.toFixed(dec);
    }
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
},{threshold:.4});
document.querySelectorAll('.ct').forEach(el=>counterIO.observe(el));

document.querySelectorAll('.feature').forEach(card=>{
  card.addEventListener('pointermove', e=>{
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});

// Carrossel de testemunhos (single-card)
(function(){
  const stage = document.querySelector('.tx-stage');
  if(!stage) return;
  const cards = Array.from(stage.querySelectorAll('.tx-card'));
  const dotsWrap = document.querySelector('.tx-dots');
  let i = 0, timer = null;
  cards.forEach((_,k)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role','tab');
    b.setAttribute('aria-label','Testemunho '+(k+1));
    b.addEventListener('click', ()=>go(k, true));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('button'));
  function paint(){
    cards.forEach((c,k)=>c.classList.toggle('is-on', k===i));
    dots.forEach((d,k)=>d.classList.toggle('is-on', k===i));
  }
  function go(k, manual){
    i = ((k % cards.length) + cards.length) % cards.length;
    paint();
    if(manual) restart();
  }
  function restart(){ clearInterval(timer); timer = setInterval(()=>go(i+1), 6000); }
  const wrap = document.querySelector('.tx-wrap');
  wrap.addEventListener('mouseenter', ()=>clearInterval(timer));
  wrap.addEventListener('mouseleave', restart);
  paint();
  restart();
})();
