// Shared bits for every page: chapter nav, next-chapter band, the hand that holds the phone (Hand.wrap) and the thumb print (Hand.print / Hand.follow).
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

  // ---------- the hand ----------
  let uid = 0;
  function handSVG(layer, id) {
    const skin = `<defs>
      <linearGradient id="hs${id}" x1="0" x2="1" y1="0" y2=".3"><stop offset="0" stop-color="#eebf9b"/><stop offset=".55" stop-color="#d49a72"/><stop offset="1" stop-color="#ad7150"/></linearGradient>
      <linearGradient id="hf${id}" x1="0" x2="1"><stop offset="0" stop-color="#b47755"/><stop offset=".6" stop-color="#dba57e"/><stop offset="1" stop-color="#e8b892"/></linearGradient>
      <linearGradient id="ht${id}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f0c4a2"/><stop offset=".6" stop-color="#d69c74"/><stop offset="1" stop-color="#b37653"/></linearGradient>
      <linearGradient id="hg${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#f0c29f"/><stop offset=".55" stop-color="#d79d75"/><stop offset="1" stop-color="#a86d4c"/></linearGradient>
      <radialGradient id="hn${id}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#fbe3d3"/><stop offset="1" stop-color="#e2b498"/></radialGradient></defs>`;
    const fing = [[500, 70, -46], [568, 66, -50], [632, 62, -46], [692, 54, -38]];   // [top, height, left edge]
    if (layer === 'back') return `<svg class="hand-back" viewBox="-120 300 680 800" preserveAspectRatio="none" aria-hidden="true">${skin}
      <path d="M205 1100 C196 1010 132 944 62 902 C14 872 -14 812 -22 752 L-20 700 L400 690 C442 732 470 800 480 870 C488 950 494 1030 510 1100 Z" fill="url(#hs${id})"/>
      <path d="M-14 770 C-2 840 30 880 80 910" stroke="#9c6446" stroke-width="2.5" fill="none" opacity=".35"/>
      ${fing.map(([y, h, x]) => `<rect x="${x}" y="${y}" width="${60 - x}" height="${h}" rx="${h / 2}" fill="url(#hg${id})"/>
        <path d="M${x + 16} ${y + h * .28} q-7 ${h * .22} 0 ${h * .44}" stroke="#94603f" stroke-width="2.2" fill="none" opacity=".4" stroke-linecap="round"/>`).join('')}
      </svg>`;
    return `<svg class="hand-front" viewBox="-120 300 680 800" preserveAspectRatio="none" aria-hidden="true">${skin}
      ${fing.map(([y, h]) => `<ellipse cx="3" cy="${y + h / 2}" rx="7" ry="${h / 2 - 12}" fill="url(#hg${id})" opacity=".9"/>`).join('')}
      <g class="hthumb"><g transform="translate(4 56)">
        <path d="M472 910 C442 826 426 742 417 650 C411 600 409 560 413 530 C417 497 446 490 460 511 C472 529 478 580 482 630 C490 720 512 800 544 884 Z" fill="url(#ht${id})"/>
        <ellipse cx="437" cy="532" rx="13" ry="21" transform="rotate(-6 437 532)" fill="url(#hn${id})" opacity=".9"/>
        <path d="M426 604 q22 6 48 -2" stroke="#9c6446" stroke-width="2" fill="none" opacity=".4"/>
      </g></g></svg>`;
  }
  function wrap(phone, opts = {}) {
    if (!phone || phone.parentElement.classList.contains('inhand')) return phone && phone.parentElement;
    const id = ++uid, w = document.createElement('div');
    w.className = 'inhand' + (opts.float === false || reduce ? '' : ' float');
    phone.before(w);
    w.insertAdjacentHTML('beforeend', '<div class="handshadow"></div>' + handSVG('back', id));
    w.append(phone);
    w.insertAdjacentHTML('beforeend', handSVG('front', id));
    return w;
  }
  function press(w, on) { if (w) w.classList.toggle('press', on); }

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
  function follow(screen, scroller, w) {
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
      press(w, true); setTimeout(() => press(w, false), 500);
      print(screen, { x: e.clientX - r.left, y0: y + (dn ? 70 : -70), y1: y + (dn ? -70 : 70), dur: 650 });
    }, { passive: true });
  }

  window.Hand = { wrap, print, follow, press };
  window.SITE = { APP, DEMO };
})();
