// Shared bits for every page: chapter nav, next-chapter band, and the thumb print (Hand.print / Hand.follow).
(() => {
  const APP = 'https://df-ai-lab.github.io/wheres-my-money-lite/';
  const DEMO = APP + 'demo/';
  const CH = [
    { id: 'home', href: './', n: 'Wake', t: 'Wake it up' },
    { id: 'tour', href: 'tour.html', n: 'Tour', t: 'The guided tour' },
    { id: 'month', href: 'month.html', n: 'Month', t: 'Scroll a month' },
    { id: 'play', href: 'play.html', n: 'Play', t: 'Play with it' },
    { id: 'features', href: 'features.html', n: 'Everything', t: 'Everything in Lite' },
  ];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = document.body.dataset.page;

  // ---------- nav + next chapter ----------
  if (!document.body.hasAttribute('data-nonav')) {
    const nav = document.createElement('header');
    nav.className = 'sitenav';
    nav.innerHTML = `<div class="in"><a class="home" href="./"><img src="lite-192.png" alt="">Where's My Money? Lite</a>
      <nav class="chs" aria-label="Chapters">${CH.map((c, i) => `<a href="${c.href}"${c.id === page ? ' aria-current="page"' : ''}><i>${i + 1}</i>${c.n}</a>`).join('')}</nav>
      <a class="get" href="${APP}" target="_blank" rel="noopener">Get the app</a></div>`;
    document.body.prepend(nav);
  }
  const k = CH.findIndex(c => c.id === page);
  if (k >= 0) {
    const nx = CH[k + 1];
    const band = document.createElement('section');
    band.className = 'nextch';
    band.innerHTML = `<div class="in">${nx
      ? `<a class="go" href="${nx.href}"><small>Next · ${k + 2} of ${CH.length}</small><b>${nx.t} <span>→</span></b></a>`
      : `<a class="go" href="${APP}" target="_blank" rel="noopener"><small>That's everything</small><b>Get the app <span>→</span></b></a>`}
      <div class="small">Where's My Money? Lite · free, no bank login · <a href="${DEMO}" target="_blank" rel="noopener">try the demo</a></div></div>`;
    document.body.append(band);
  }

  // ---------- thumb print ----------
  // print(screen, {x, y0, y1, dur}): a thumb print lands at (x, y0), slides to (x, y1) and lifts off. Coordinates are px inside the screen.
  function print(screen, o = {}) {
    if (!screen) return Promise.resolve();
    const r = screen.getBoundingClientRect();
    const x = o.x ?? r.width * .62, y0 = o.y0 ?? r.height * .72, y1 = o.y1 ?? r.height * .36, dur = o.dur ?? 900;
    const p = document.createElement('span');
    p.className = 'tprint';
    p.style.left = x + 'px'; p.style.top = y0 + 'px';
    screen.append(p);
    if (reduce || !p.animate) { p.remove(); return Promise.resolve(); }
    const a = p.animate([
      { opacity: 0, transform: 'translate(0,0) scale(1.15)' },
      { opacity: 1, transform: 'translate(0,0) scale(1)', offset: .14 },
      { opacity: .9, transform: `translate(${(o.dx ?? -10)}px, ${y1 - y0}px) scale(1)`, offset: .82 },
      { opacity: 0, transform: `translate(${(o.dx ?? -10) * 1.3}px, ${(y1 - y0) * 1.08}px) scale(.92)` },
    ], { duration: dur, easing: 'cubic-bezier(.3,.6,.2,1)' });
    return a.finished.then(() => p.remove(), () => p.remove());
  }
  // follow(screen, scroller): a print shows under a dragging finger / mouse, and a short swipe shows on each wheel burst.
  function follow(screen, scroller) {
    if (!screen) return;
    let dragP = null, wheelT = 0;
    screen.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      const r = screen.getBoundingClientRect();
      dragP = document.createElement('span'); dragP.className = 'tprint';
      dragP.style.left = (e.clientX - r.left) + 'px'; dragP.style.top = (e.clientY - r.top) + 'px';
      dragP.style.transition = 'opacity .25s'; screen.append(dragP);
      requestAnimationFrame(() => dragP && (dragP.style.opacity = '.85'));
    });
    screen.addEventListener('pointermove', e => {
      if (!dragP) return; const r = screen.getBoundingClientRect();
      dragP.style.left = (e.clientX - r.left) + 'px'; dragP.style.top = (e.clientY - r.top) + 'px';
    });
    const up = () => { if (!dragP) return; const p = dragP; dragP = null; p.style.opacity = '0'; setTimeout(() => p.remove(), 300); };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => screen.addEventListener(ev, up));
    if (scroller) scroller.addEventListener('scroll', up, { passive: true });
    screen.addEventListener('wheel', e => {
      const now = performance.now(); if (now - wheelT < 650) return; wheelT = now;
      const r = screen.getBoundingClientRect(), y = e.clientY - r.top, dn = e.deltaY > 0;
      print(screen, { x: e.clientX - r.left, y0: y + (dn ? 70 : -70), y1: y + (dn ? -70 : 70), dur: 650 });
    }, { passive: true });
  }

  window.Hand = { print, follow };
  window.SITE = { APP, DEMO };
})();
