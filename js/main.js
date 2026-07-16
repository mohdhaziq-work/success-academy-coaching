/* Success Academy — JavaScript */
document.addEventListener('DOMContentLoaded',()=>{
  // Sidebar
  const hamburger=document.getElementById('hamburger'),sidebar=document.getElementById('sidebar'),overlay=document.getElementById('sidebarOverlay'),closeBtn=document.getElementById('sidebarClose');
  function open(){sidebar.classList.add('open');overlay.classList.add('active');hamburger?.classList.add('open');document.body.style.overflow='hidden'}
  function close(){sidebar.classList.remove('open');overlay.classList.remove('active');hamburger?.classList.remove('open');document.body.style.overflow=''}
  hamburger?.addEventListener('click',()=>sidebar.classList.contains('open')?close():open());
  closeBtn?.addEventListener('click',close);overlay?.addEventListener('click',close);

  // Navbar
  const navbar=document.getElementById('navbar'),btt=document.getElementById('backToTop');
  window.addEventListener('scroll',()=>{const y=window.scrollY;if(!navbar.classList.contains('scrolled')&&y>50)navbar.classList.add('scrolled');if(navbar.classList.contains('scrolled')&&y<=50)navbar.classList.remove('scrolled');btt?.classList.toggle('visible',y>500)},{passive:true});
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Reveal
  const els=document.querySelectorAll('[data-fade]');
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const d=parseInt(e.target.dataset.delay)||0;setTimeout(()=>e.target.classList.add('revealed'),d);obs.unobserve(e.target)}})},{threshold:.12});
  els.forEach(el=>obs.observe(el));

  // Counters
  const counters=document.querySelectorAll('[data-count]');
  const cObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target,t=parseInt(el.dataset.count),dur=2000,s=performance.now();(function u(n){const p=Math.min((n-s)/dur,1);el.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString('en-IN');p<1?requestAnimationFrame(u):el.textContent=t.toLocaleString('en-IN')})(s);cObs.unobserve(el)}})},{threshold:.5});
  counters.forEach(c=>cObs.observe(c));

  // Multi-step form
  const form=document.getElementById('admissionForm');
  if(form){
    const steps=form.querySelectorAll('.form-step'),stepInds=document.querySelectorAll('.step');
    let cur=1;
    function showStep(n){steps.forEach(s=>s.classList.remove('active'));stepInds.forEach((s,i)=>{s.classList.remove('active','completed');if(i+1<n)s.classList.add('completed');if(i+1===n)s.classList.add('active')});form.querySelector(`.form-step[data-step="${n}"]`).classList.add('active');cur=n}
    form.querySelectorAll('.next-step').forEach(b=>b.addEventListener('click',()=>{const step=form.querySelector(`.form-step[data-step="${cur}"]`);const req=step.querySelectorAll('input[required],select[required]');let ok=true;req.forEach(f=>{if(!f.value.trim()){f.style.borderColor='#ef4444';ok=false}else f.style.borderColor=''});if(!ok){showToast('Please fill all required fields');return}if(cur===2)buildReview();if(cur<3)showStep(cur+1)}));
    form.querySelectorAll('.prev-step').forEach(b=>b.addEventListener('click',()=>{if(cur>1)showStep(cur-1)}));
    function buildReview(){
      const sum=document.getElementById('reviewSummary');
      const fields=[['Student Name',document.getElementById('fullName').value],['Parent Name',document.getElementById('parentName').value],['Phone',document.getElementById('phone').value],['Email',document.getElementById('email').value||'N/A'],['Class',document.getElementById('class').value],['Board',document.getElementById('board').value],['Course',document.getElementById('course').value],['Batch',document.getElementById('batch').value||'Any']];
      sum.innerHTML=fields.map(([l,v])=>`<div class="review-row"><span class="review-label">${l}</span><span class="review-value">${v}</span></div>`).join('')
    }
    form.addEventListener('submit',e=>{e.preventDefault();if(!document.getElementById('agreeTerms').checked){showToast('Please agree to the terms');return}showToast('🎓 Application submitted! We will contact you soon.');form.reset();showStep(1)})
  }

  function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)}
});
