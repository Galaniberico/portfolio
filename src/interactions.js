// Shared navigation, small demo hints and lighting across all pages.
(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  // Page links declare their active state in HTML. Only Contact is a section link.
  const contact = document.getElementById('contacto');
  const contactLink = document.querySelector('.main-nav .nav-contact');
  const header = document.querySelector('.header-shell');
  if (contact && contactLink) {
    let scrollFrame = 0;
    const updateContact = () => {
      scrollFrame = 0;
      const nearContact = contact.getBoundingClientRect().top <= header.getBoundingClientRect().bottom + 100;
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 4;
      if (nearContact || atBottom) contactLink.setAttribute('aria-current', 'location');
      else contactLink.removeAttribute('aria-current');
    };
    const queueContact = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateContact);
    };
    updateContact();
    window.addEventListener('scroll', queueContact, {passive:true});
    window.addEventListener('resize', queueContact);
    window.addEventListener('pageshow', queueContact);
  }
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      root.style.setProperty('--header-offset', `${header.offsetHeight + 20}px`);
    }).observe(header);
  }

  // Play once on entry. With reduced motion, the finished illustration stays put.
  const scenes = [...document.querySelectorAll('[data-access-scene]')];
  function playScene(scene) {
    if (reducedMotion.matches) return;
    scene.classList.add('approach-ready');
    scene.classList.remove('approach-playing');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      scene.classList.remove('approach-ready');
      if (!reducedMotion.matches) scene.classList.add('approach-playing');
    }));
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          playScene(entry.target);
          observer.unobserve(entry.target);
        }
      }
    }, {threshold:.25});
    for (const scene of scenes) {
      if (!reducedMotion.matches) scene.classList.add('approach-ready');
      observer.observe(scene);
    }
  }
  scenes.forEach(scene => scene.querySelector('[data-replay-access]').addEventListener('click', () => playScene(scene)));
  reducedMotion.addEventListener('change', () => {
    for (const scene of scenes) {
      scene.classList.remove('approach-ready');
      scene.classList.remove('approach-playing');
    }
  });

  document.querySelectorAll('[data-board-demo]').forEach(demo => {
    demo.addEventListener('click', event => {
      if (event.target.closest('[data-board-action]')) demo.querySelector('[data-demo-hint]')?.classList.add('hint-used');
    });
  });

  const ambient = document.createElement('div');
  ambient.className = 'ambient-light';
  ambient.setAttribute('aria-hidden','true');
  document.body.prepend(ambient);
  const surfaces = [...document.querySelectorAll('.profile, .case-card, .career-detail')];
  surfaces.forEach(surface => surface.classList.add('lit-surface'));
  let pointerFrame = 0;
  let pointer = null;
  let currentSurface = null;
  const canAnimate = () => finePointer.matches && !reducedMotion.matches && !document.hidden;

  function drawLight() {
    pointerFrame = 0;
    if (!pointer || !canAnimate()) return;
    ambient.style.transform = `translate3d(${pointer.x - 300}px, ${pointer.y - 300}px, 0)`;
    ambient.classList.add('is-visible');
    const surface = document.elementFromPoint(pointer.x, pointer.y)?.closest('.lit-surface');
    if (currentSurface !== surface) currentSurface?.classList.remove('light-visible');
    currentSurface = surface;
    if (surface) {
      const box = surface.getBoundingClientRect();
      surface.style.setProperty('--light-x', `${pointer.x - box.left}px`);
      surface.style.setProperty('--light-y', `${pointer.y - box.top}px`);
      surface.classList.add('light-visible');
    }
  }
  function clearLight() {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    ambient.classList.remove('is-visible');
    currentSurface?.classList.remove('light-visible');
    currentSurface = null;
    pointer = null;
  }
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !canAnimate()) return;
    pointer = {x:event.clientX,y:event.clientY};
    if (!pointerFrame) pointerFrame = requestAnimationFrame(drawLight);
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave',clearLight);
  window.addEventListener('blur',clearLight);
  window.addEventListener('scroll',clearLight,{passive:true});
  reducedMotion.addEventListener('change',clearLight);
  finePointer.addEventListener('change',clearLight);
  document.addEventListener('visibilitychange',clearLight);
})();
