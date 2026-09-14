/* ══════════════════════════════════════════════════════════════════════════
   Amirah & Co. — storefront behaviour
   ══════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const small = window.matchMedia('(max-width: 720px)');
  const money = (n) => 'RM ' + n;

  /* ───────────────────────────── catalogue ───────────────────────────── */

  const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  const PRODUCTS = [
    {
      id: 'emberhall-robe', name: 'Emberhall Robe', price: 100, cat: 'ROBES',
      collection: 'HOUSE LINE', img: 'robe-emberhall', size: 'lg', tags: ['best'],
      desc: 'Brushed wool, crimson lining, deep hood.',
      variantLabel: 'Size', variants: SIZES, rating: 5, reviewCount: 128,
      story: 'Cut long for corridors that hold their cold. The crimson lining is dyed in a single small batch each autumn, so no two winters match exactly — we note the batch on your catalogue card.',
      details: ['100% milled lambswool shell, cupro lining', 'Horn fastening, hand-stitched hem', 'Embroidered crest at the breast', 'Dry clean only'],
      included: ['One robe, numbered', 'Catalogue card with batch and maker', 'Cotton storage bag'],
      reviews: [
        { text: 'Heavier than I expected in the best way — the lining is the colour of embers.', who: 'Amira R. · verified' },
        { text: 'Arrived sealed with wax. My daughter has not taken it off since.', who: 'Daniel K. · verified' }
      ]
    },
    {
      id: 'serpentmere-robe', name: 'Serpentmere Robe', price: 100, cat: 'ROBES',
      collection: 'HOUSE LINE', img: 'robe-serpentmere', size: 'sm', tags: ['locked'],
      desc: 'Slate wool with jade silk trim.',
      variantLabel: 'Size', variants: SIZES, rating: 5, reviewCount: 74,
      story: 'The quietest robe we make. Slate wool that reads almost black until the light finds the jade at the hood — a trim woven narrow enough that most people miss it entirely.',
      details: ['Milled slate wool, jade silk hood trim', 'Concealed inner pocket', 'Hand-finished seams', 'Dry clean only'],
      included: ['One robe, numbered', 'Catalogue card', 'Cotton storage bag'],
      reviews: [{ text: 'Subtle to the point of being a secret. Exactly what I wanted.', who: 'Wei Lin T. · verified' }]
    },
    {
      id: 'corvidspire-robe', name: 'Corvidspire Robe', price: 100, cat: 'ROBES',
      collection: 'HOUSE LINE', img: 'robe-corvidspire', size: 'sm',
      desc: 'Midnight blue, bronze thread crest.',
      variantLabel: 'Size', variants: SIZES, rating: 5, reviewCount: 91,
      story: 'Midnight blue that goes green under candlelight. The crest is worked in bronze thread by one hand in the workshop, which is why we only finish nine a week.',
      details: ['Midnight blue milled wool', 'Bronze thread crest, hand-worked', 'Deep hood, weighted hem', 'Dry clean only'],
      included: ['One robe, numbered', 'Catalogue card', 'Cotton storage bag'],
      reviews: [{ text: 'The crest work is genuinely beautiful up close.', who: 'Farah M. · verified' }]
    },
    {
      id: 'thornhollow-robe', name: 'Thornhollow Robe', price: 100, cat: 'ROBES',
      collection: 'HOUSE LINE', img: 'robe-thornhollow', size: 'md',
      desc: 'Umber wool, honey-gold piping.',
      variantLabel: 'Size', variants: SIZES, rating: 4, reviewCount: 66,
      story: 'The warmest of the four. Umber wool with honey-gold piping that follows the hood seam and stops, deliberately, before the hem.',
      details: ['Umber milled wool', 'Honey-gold piping at hood and cuff', 'Roomier cut through the shoulder', 'Dry clean only'],
      included: ['One robe, numbered', 'Catalogue card', 'Cotton storage bag'],
      reviews: [{ text: 'Warm enough for a cold office, which is its own kind of magic.', who: 'Joseph L. · verified' }]
    },
    {
      id: 'academy-uniform', name: 'Academy Uniform', price: 200, cat: 'ROBES',
      collection: 'TERM KIT', img: 'uniform', size: 'lg',
      desc: 'Shirt, tie, pinafore and grey knit.',
      variantLabel: 'Size', variants: SIZES, rating: 5, reviewCount: 43,
      story: 'The full term kit, packed the way we packed the first one: folded in order, tie on top, with a note about which stair in the workshop complains.',
      details: ['Cotton poplin shirt', 'Woven stripe tie', 'Wool-blend pinafore', 'Grey lambswool knit'],
      included: ['Shirt, tie, pinafore, knit', 'Catalogue card', 'Sealed box'],
      reviews: [{ text: 'Packed so carefully it felt wrong to unpack it.', who: 'Nadia S. · verified' }]
    },
    {
      id: 'skyball-jersey', name: 'Skyball Jersey', price: 69, cat: 'ACCESSORIES',
      collection: 'FIELD KIT', img: 'jersey', size: 'sm', tags: ['new'],
      desc: 'Padded canvas, numbered on the back.',
      variantLabel: 'Size', variants: SIZES, rating: 4, reviewCount: 38,
      story: 'Built for a game played mostly in bad weather. Padded canvas across the shoulders, laced collar, and a number on the back that you choose when you order.',
      details: ['Waxed canvas shell, padded shoulders', 'Laced collar', 'Number applied by hand', 'Cold wash, dry flat'],
      included: ['One jersey, numbered to your choice', 'Catalogue card'],
      reviews: [{ text: 'Sturdier than any sports top I own. The lacing is a nice touch.', who: 'Hafiz A. · verified' }]
    },
    {
      id: 'academy-sweater', name: 'Academy Sweater', price: 130, cat: 'ROBES',
      collection: 'TERM KIT', img: 'sweater', size: 'md', tags: ['best'],
      desc: 'Lambswool, crest knitted in.',
      variantLabel: 'Size', variants: SIZES, rating: 5, reviewCount: 156,
      story: 'Knitted in one piece with the crest worked into the body rather than sewn on top, which takes three times as long and lasts about ten times as well.',
      details: ['Lambswool, knitted crest', 'Ribbed cuff and hem', 'Made in runs of forty', 'Hand wash cold'],
      included: ['One sweater, numbered', 'Catalogue card', 'Cotton storage bag'],
      reviews: [
        { text: 'Third winter with mine. No pilling, no sag.', who: 'Priya D. · verified' },
        { text: 'The crest being knitted in makes all the difference.', who: 'Tom H. · verified' }
      ]
    },
    {
      id: 'house-scarf', name: 'House Scarf', price: 40, cat: 'ACCESSORIES',
      collection: 'TERM KIT', img: 'scarf', size: 'sm', tags: ['best'],
      desc: 'Two metres, fringed, twin stripe.',
      variantLabel: 'Colourway', variants: ['Ember', 'Jade', 'Bronze', 'Honey'], rating: 5, reviewCount: 204,
      story: 'Two full metres, because a scarf that only goes round once is a decoration. Twin stripe, hand-knotted fringe, and heavy enough to stay where you put it.',
      details: ['Lambswool, two metres', 'Hand-knotted fringe', 'Twin stripe, four colourways', 'Hand wash cold'],
      included: ['One scarf', 'Catalogue card'],
      reviews: [{ text: 'Bought one, came back for three more. They make good gifts.', who: 'Suri B. · verified' }]
    },
    {
      id: 'ashwood-wand', name: 'Ashwood Wand', price: 129, cat: 'WANDS',
      collection: 'WAND COLLECTION', img: 'wand-ashwood', size: 'md', tags: ['best'],
      desc: 'Turned ashwood, waxed, in a fitted case.',
      variantLabel: 'Finish', variants: ['Waxed', 'Oiled', 'Raw'], rating: 5, reviewCount: 112,
      story: 'Cut in winter, rested a full year, then turned in one sitting so the grain runs true end to end. The grip is cut last, by eye, which is why no two sit quite the same in the hand.',
      details: ['Turned ashwood, 34cm', 'Hand-cut grip, three bands', 'Waxed and buffed', 'Fitted lined case'],
      included: ['One wand, numbered', 'Fitted case', 'Catalogue card with the wandwright\'s mark'],
      reviews: [
        { text: 'The weight is perfect. Feels like it was made for my hand, which apparently it was.', who: 'Iris N. · verified' },
        { text: 'Case alone is worth half the price.', who: 'Marcus O. · verified' }
      ]
    },
    {
      id: 'nightbloom-wand', name: 'Nightbloom Wand', price: 149, cat: 'WANDS',
      collection: 'WAND COLLECTION', img: 'wand-nightbloom', size: 'sm', tags: ['new', 'locked'],
      desc: 'Blackened oak with a bone inlay.',
      variantLabel: 'Finish', variants: ['Blackened', 'Smoked'], rating: 5, reviewCount: 47,
      story: 'Oak darkened by smoke rather than stain, so the colour is in the wood and not on it. Three bone inlays set along the shaft — the only part of this wand that catches light.',
      details: ['Smoke-blackened oak, 36cm', 'Three bone inlays', 'Matte hand-rubbed finish', 'Fitted lined case'],
      included: ['One wand, numbered', 'Fitted case', 'Catalogue card'],
      reviews: [{ text: 'Genuinely striking. Photographs badly, looks incredible in person.', who: 'Kamal Y. · verified' }]
    },
    {
      id: 'wax-seal-set', name: 'Wax Seal Set', price: 59, cat: 'COLLECTIBLES',
      collection: 'DESK ORDER', img: 'seal-set', size: 'sm',
      desc: 'Brass die, three sticks of oxblood wax.',
      variantLabel: 'Die', variants: ['Sigil', 'Initial', 'Blank'], rating: 5, reviewCount: 88,
      story: 'The same die we strike every parcel with, cut for your desk. Brass, turned handle, and three sticks of the oxblood wax we use in the workshop.',
      details: ['Turned brass die and handle', 'Three sticks oxblood wax', 'Sigil, initial or blank die', 'Wax refills available'],
      included: ['Brass seal', 'Three wax sticks', 'Instruction card'],
      reviews: [{ text: 'Now every letter I send looks like it matters.', who: 'Elena V. · verified' }]
    },
    {
      id: 'brass-astrolabe', name: 'Brass Astrolabe', price: 219, cat: 'COLLECTIBLES',
      collection: 'ARTIFACTS', img: 'astrolabe', size: 'md',
      desc: 'Working rings, engraved star chart.',
      variantLabel: 'Finish', variants: ['Polished', 'Antiqued'], rating: 5, reviewCount: 52,
      story: 'The rings turn and the rule swings, and if you know what you are doing it will tell you where you are. If you do not, it sits on a shelf and looks like it knows something you do not.',
      details: ['Solid brass, 22cm diameter', 'Working rings and rule', 'Engraved star chart', 'Weighted stand included'],
      included: ['Astrolabe and stand', 'Chart key card', 'Catalogue card'],
      reviews: [{ text: 'Heavier and better made than I expected at this price.', who: 'Rina C. · verified' }]
    },
    {
      id: 'rune-pendant', name: 'Rune Pendant', price: 79, cat: 'ACCESSORIES',
      collection: 'ARTIFACTS', img: 'pendant', size: 'sm', tags: ['new'],
      desc: 'Cast pewter on a waxed cord.',
      variantLabel: 'Cord', variants: ['Black', 'Oxblood', 'Natural'], rating: 4, reviewCount: 63,
      story: 'Cast from a carved original rather than a machined one, so the edges keep a little of the knife. It darkens with wear, which is the point.',
      details: ['Cast pewter, 38mm', 'Waxed cotton cord, adjustable', 'Darkens with wear', 'Polishing cloth included'],
      included: ['Pendant and cord', 'Polishing cloth', 'Catalogue card'],
      reviews: [{ text: 'Worn daily for a year. Looks better now than when it arrived.', who: 'Aisyah K. · verified' }]
    },
    {
      id: 'first-year-kit', name: 'First-Year Kit', price: 249, cat: 'GIFTS',
      collection: 'GIFT BOXES', img: 'gift-kit', size: 'lg',
      desc: 'Wand, scarf, seal set and letter.',
      variantLabel: 'Colourway', variants: ['Ember', 'Jade', 'Bronze', 'Honey'], rating: 5, reviewCount: 97,
      story: 'Everything a first term needs, packed in the order you should open it: the letter, then the scarf, then the seal, then the wand. We have opinions about this.',
      details: ['Ashwood wand with case', 'House scarf in your colourway', 'Brass seal and wax', 'Hand-written invitation letter'],
      included: ['Wand and case', 'Scarf', 'Seal set', 'Sealed letter', 'Presentation box'],
      reviews: [
        { text: 'Gave this to my nephew. He read the letter four times before opening anything else.', who: 'Grace W. · verified' },
        { text: 'Best gift I have ever sent, and I am including weddings.', who: 'Zaid R. · verified' }
      ]
    },
    {
      id: 'founders-grimoire', name: "Founders' Grimoire", price: 459, cat: 'LIMITED EDITIONS',
      collection: 'ENCHANTED', img: 'grimoire', size: 'lg', tags: ['best', 'locked'],
      desc: 'Leather-bound, numbered to one hundred.',
      variantLabel: 'Edition', variants: ['Standard', 'Numbered'], rating: 5, reviewCount: 31,
      story: 'Hand-bound in oxblood leather, 240 pages of blank vellum, brass clasp and a wax seal struck from the original die. Numbered to one hundred each winter, and when they are gone we do not reprint.',
      details: ['Oxblood leather, hand-bound', '240 pages blank vellum', 'Brass clasp, wax seal', 'Numbered to 100 per year'],
      included: ['One grimoire, numbered', 'Slipcase', 'Certificate card signed by the binder'],
      reviews: [{ text: 'Too beautiful to write in. I wrote in it anyway.', who: 'Hana J. · verified' }]
    }
  ];

  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const imgPath = (p) => `assets/svg/${p.img}.svg`;

  const CATS = ['ALL', 'WANDS', 'ROBES', 'COLLECTIBLES', 'ACCESSORIES', 'GIFTS', 'LIMITED EDITIONS'];
  const SORTS = ['FEATURED', 'NEWEST', 'PRICE LOW → HIGH', 'PRICE HIGH → LOW'];
  const TABS = ['THE STORY', 'DETAILS', "WHAT'S INCLUDED", 'REVIEWS'];

  /* ─────────────────────────────── state ─────────────────────────────── */

  const state = {
    cart: [], wish: [], qty: 1,
    query: '', cat: 'ALL', sort: 'FEATURED',
    current: PRODUCTS[0], variant: 'M', tab: TABS[0], view: 0,
    drawer: null, introDone: false
  };

  /* ───────────────────────── boot + hero intro ───────────────────────── */

  const boot = $('#boot');
  window.addEventListener('load', () => {
    setTimeout(() => {
      boot.classList.add('is-done');
      document.body.classList.add('is-live');
      setTimeout(() => { boot.hidden = true; state.introDone = true; }, 900);
    }, rm.matches ? 200 : 1100);
  });

  /* ──────────────────────────── navigation ───────────────────────────── */

  const nav = $('#nav');
  let lastY = 0;

  const onNavScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    /* ignore sub-pixel jitter so the bar doesn't flip back when scrolling settles */
    const delta = y - lastY;
    if (Math.abs(delta) > 4) {
      nav.classList.toggle('is-hidden', delta > 0 && y > 320 && !state.drawer);
      lastY = y;
    }
  };

  /* page-turn menu */
  const menu = $('#menu');
  const burger = $('#burger');

  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { menu.hidden = true; }, 600);
    }
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('#menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* search overlay */
  const searchOverlay = $('#searchOverlay');
  const globalSearch = $('#globalSearch');

  const setSearch = (open) => {
    if (open) {
      searchOverlay.hidden = false;
      requestAnimationFrame(() => searchOverlay.classList.add('is-open'));
      globalSearch.value = state.query;
      globalSearch.focus();
    } else {
      searchOverlay.classList.remove('is-open');
      setTimeout(() => { searchOverlay.hidden = true; }, 400);
    }
  };

  globalSearch.addEventListener('input', (e) => {
    state.query = e.target.value;
    $('#shopSearch').value = state.query;
    renderGrid();
    $('#searchHint').textContent = `${visible().length} artifacts found`;
  });
  globalSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      setSearch(false);
      $('#shop').scrollIntoView({ behavior: rm.matches ? 'auto' : 'smooth' });
    }
  });
  searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) setSearch(false); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!searchOverlay.hidden) setSearch(false);
    if (state.drawer) closeDrawer();
    if (burger.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  /* nav shortcuts: new arrivals / best sellers */
  $$('[data-shortcut]').forEach((el) => {
    el.addEventListener('click', () => {
      const which = el.dataset.shortcut;
      state.cat = 'ALL';
      state.query = '';
      $('#shopSearch').value = '';
      state.sort = which === 'new' ? 'NEWEST' : 'FEATURED';
      state.shortcut = which;
      renderChips();
      renderGrid();
      toast(which === 'new' ? 'Newest artifacts first' : 'Most claimed artifacts');
    });
  });

  /* ─────────────────────────── dust particles ────────────────────────── */

  function makeDust(host, count) {
    if (rm.matches) return;
    const n = small.matches ? Math.round(count * 0.4) : count;
    const box = document.createElement('div');
    box.className = 'dust amb';
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      const size = (1 + Math.random() * 2.4).toFixed(1);
      s.style.cssText =
        `left:${(Math.random() * 96 + 2).toFixed(1)}%;` +
        `bottom:${(Math.random() * 70 - 10).toFixed(1)}%;` +
        `width:${size}px;height:${size}px;` +
        `background:${i % 4 === 0 ? 'rgba(143,180,232,.9)' : 'rgba(232,205,150,.95)'};` +
        `--dur:${(13 + Math.random() * 16).toFixed(1)}s;` +
        `--delay:${(-Math.random() * 20).toFixed(1)}s`;
      box.appendChild(s);
    }
    host.appendChild(box);
    return box;
  }

  /* ───────────────── ambient scenery: mist, stars, sparks ──────────────── */

  const GLYPHS = ['✦', '✧', '⟡', '◈', '✵'];
  const rand = (a, b) => a + Math.random() * (b - a);

  function scale(n) { return small.matches ? Math.max(2, Math.round(n * 0.45)) : n; }

  function layerBox(host, cls) {
    const box = document.createElement('div');
    box.className = 'amb ' + cls;
    host.appendChild(box);
    return box;
  }

  /* soft drifting fog — sits far behind everything, heavily blurred */
  function makeMist(host, count, tint) {
    const box = layerBox(host, 'amb-mist');
    for (let i = 0; i < scale(count); i++) {
      const s = document.createElement('span');
      const w = rand(280, 620);
      s.style.cssText =
        `left:${rand(-14, 82).toFixed(1)}%;top:${rand(6, 74).toFixed(1)}%;` +
        `width:${w.toFixed(0)}px;height:${(w * rand(0.4, 0.7)).toFixed(0)}px;` +
        `--c:${tint};--dur:${rand(34, 62).toFixed(1)}s;--delay:${(-rand(0, 30)).toFixed(1)}s;` +
        `--shift:${rand(4, 13).toFixed(1)}%`;
      box.appendChild(s);
    }
  }

  /* pinpoint stars that breathe rather than blink */
  function makeStars(host, count) {
    const box = layerBox(host, 'amb-stars');
    for (let i = 0; i < scale(count); i++) {
      const s = document.createElement('span');
      const size = rand(1, 2.6);
      s.style.cssText =
        `left:${rand(1, 99).toFixed(1)}%;top:${rand(2, 72).toFixed(1)}%;` +
        `width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;` +
        `background:${i % 5 === 0 ? '#8fb4e8' : '#f0dcae'};` +
        `--dur:${rand(3.4, 8).toFixed(1)}s;--delay:${(-rand(0, 8)).toFixed(1)}s;` +
        `--peak:${rand(0.35, 0.9).toFixed(2)}`;
      box.appendChild(s);
    }
  }

  /* four-point sparkles that wink in and out */
  function makeSparkles(host, count, spread) {
    const box = layerBox(host, 'amb-spark');
    for (let i = 0; i < scale(count); i++) {
      const s = document.createElement('span');
      s.style.cssText =
        `left:${rand(2, 98).toFixed(1)}%;top:${rand(spread ? 2 : 8, spread ? 94 : 78).toFixed(1)}%;` +
        `--s:${rand(7, 16).toFixed(1)}px;` +
        `--c:${i % 3 === 0 ? '#bcd2f2' : i % 3 === 1 ? '#f0dcae' : '#e3c9f0'};` +
        `--dur:${rand(4.5, 11).toFixed(1)}s;--delay:${(-rand(0, 11)).toFixed(1)}s;` +
        `--peak:${rand(0.5, 0.95).toFixed(2)}`;
      box.appendChild(s);
    }
  }

  /* faint glyphs drifting upward, well under the text layer */
  function makeSymbols(host, count) {
    const box = layerBox(host, 'amb-symbols');
    for (let i = 0; i < scale(count); i++) {
      const s = document.createElement('span');
      s.textContent = GLYPHS[i % GLYPHS.length];
      s.style.cssText =
        `left:${rand(3, 94).toFixed(1)}%;bottom:${rand(-12, 40).toFixed(1)}%;` +
        `font-size:${rand(13, 30).toFixed(0)}px;` +
        `--dur:${rand(26, 46).toFixed(1)}s;--delay:${(-rand(0, 40)).toFixed(1)}s;` +
        `--peak:${rand(0.12, 0.3).toFixed(2)};--spin:${rand(-40, 40).toFixed(0)}deg`;
      box.appendChild(s);
    }
  }

  const SCENERY = [
    ['.hero', { dust: 28, stars: 30, spark: 10 }],
    ['.chapter--room', { dust: 16, mist: [3, 'rgba(190,150,90,.16)'] }],
    ['.chapter--letter', { dust: 14, spark: 14, symbols: 5 }],
    ['.chapter--forest', { dust: 16, stars: 26, mist: [3, 'rgba(130,175,200,.13)'] }],
    ['.chapter--archive', { dust: 16, spark: 13, symbols: 6 }],
    ['.chapter--dark', { dust: 12, mist: [4, 'rgba(170,70,105,.15)'] }],
    ['.chapter--ruins', { dust: 20, stars: 24, spark: 8 }],
    ['.finale', { dust: 16, stars: 20, spark: 9 }],
    ['.detail__dust', { dust: 12, spark: 7 }]
  ];

  SCENERY.forEach(([sel, spec]) => {
    const host = $(sel);
    if (!host || rm.matches) return;
    if (spec.mist) makeMist(host, spec.mist[0], spec.mist[1]);
    if (spec.stars) makeStars(host, spec.stars);
    if (spec.dust) makeDust(host, spec.dust);
    if (spec.spark) makeSparkles(host, spec.spark, sel === '.detail__dust');
    if (spec.symbols) makeSymbols(host, spec.symbols);
  });

  /* offscreen scenery keeps its animations paused so idle sections cost nothing */
  const ambIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-active', e.isIntersecting));
  }, { rootMargin: '15% 0px 15% 0px' });
  $$('.amb').forEach((el) => ambIO.observe(el));

  /* the biggest cards get a breathing glow and a few sparks of their own */
  function decorateCards() {
    $$('.card--lg .card__plate, .card--md .card__plate').forEach((plate) => {
      if (plate.querySelector('.amb')) return;
      const glow = document.createElement('span');
      glow.className = 'card__glow';
      plate.insertBefore(glow, plate.firstChild);
      if (rm.matches || small.matches) return;
      makeSparkles(plate, 5, true);
      plate.querySelectorAll('.amb').forEach((el) => ambIO.observe(el));
    });
  }

  /* ───────────────────────── reveal on scroll ────────────────────────── */

  const revealed = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '-6% 0px -8% 0px' });

  function observeReveals() {
    $$('[data-reveal], .card').forEach((el) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      io.observe(el);
    });
  }

  /* ─────────────────── parallax + scroll-driven scenes ───────────────── */

  const parallaxEls = $$('[data-parallax]');
  const heroSigil = $('.hero__sigil');
  const core = $('#core');
  const flash = $('#flash');
  const ch6 = $('#ch6');
  let scrollSpeed = 0, prevY = 0;

  function onScrollFrame() {
    const y = window.scrollY;
    scrollSpeed = Math.min(3, Math.abs(y - prevY) / 24);
    prevY = y;
    const vh = window.innerHeight;

    if (!rm.matches) {
      parallaxEls.forEach((el) => {
        const sec = el.closest('section');
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = (vh - r.top) / (vh + r.height);
        el.style.transform = `translate3d(0, ${((p - 0.5) * -180 * parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`;
      });

      /* dust reacts to scroll speed */
      document.documentElement.style.setProperty('--speed', (1 + scrollSpeed * 0.7).toFixed(2));

      /* hero sigil dissolves as it leaves */
      if (state.introDone && heroSigil) {
        const hr = $('.hero').getBoundingClientRect();
        const p = clamp(-hr.top / vh);
        heroSigil.style.setProperty('--sigil-scale', (1 + p * 1.4).toFixed(3));
        heroSigil.style.setProperty('--sigil-op', (0.9 * (1 - p * 1.25)).toFixed(3));
        heroSigil.style.setProperty('--sigil-blur', (p * 14).toFixed(1) + 'px');
      }
    }

    /* chapter 06: the energy core grows, then the white flash */
    if (ch6 && core) {
      const r = ch6.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height));
      core.style.setProperty('--core-scale', (0.35 + p * 1.5).toFixed(3));
      core.style.setProperty('--core-op', (0.25 + p * 0.9).toFixed(3));

      let f = 0;
      if (p > 0.7) f = p < 0.86 ? (p - 0.7) / 0.16 : clamp((1 - p) / 0.14);
      flash.classList.toggle('is-on', f > 0.01);
      flash.style.setProperty('--flash', (f * 0.92).toFixed(3));
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    onNavScroll();
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollFrame(); ticking = false; });
  }, { passive: true });

  /* the hero sigil scatters when the reader steps through */
  const enterBtn = $('[data-enter]');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      const r = heroSigil.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 30);
    });
  }

  /* ────────────────────── chapter 02 — the letter ─────────────────────── */

  const letter = $('#letter');
  $('#openLetter').addEventListener('click', (e) => {
    letter.classList.add('is-open');
    $('#letterNote').hidden = false;
    burst(e.clientX, e.clientY, 18);
    e.currentTarget.textContent = 'The letter is open';
    e.currentTarget.disabled = true;
  });

  /* ───────── chapter 04 + 05 — pedestals and shadow artifacts ─────────── */

  function pedestalCard(p) {
    return `
      <article class="pedestal" data-discover="${p.id}" tabindex="0" role="button">
        <span class="pedestal__glow" aria-hidden="true"></span>
        <img src="${imgPath(p)}" alt="${p.name}" width="400" height="500" loading="lazy" decoding="async">
        <span class="pedestal__base" aria-hidden="true"></span>
        <h3 class="pedestal__name">${p.name}</h3>
        <p class="pedestal__info">${p.desc}</p>
        <p class="price">${money(p.price)}</p>
      </article>`;
  }

  function shadowCard(p) {
    return `
      <article class="shadow-card" data-discover="${p.id}" tabindex="0" role="button">
        <span class="shadow-card__tag">Locked case</span>
        <img src="${imgPath(p)}" alt="${p.name}" width="400" height="500" loading="lazy" decoding="async">
        <h3 class="shadow-card__name">${p.name}</h3>
        <p class="price">${money(p.price)}</p>
      </article>`;
  }

  $('#pedestals').innerHTML = ['brass-astrolabe', 'wax-seal-set', 'rune-pendant'].map((id) => pedestalCard(byId(id))).join('');
  $('#shadowRow').innerHTML = PRODUCTS.filter((p) => (p.tags || []).includes('locked')).map(shadowCard).join('');

  /* ──────────────────────────── shop: chips ──────────────────────────── */

  function renderChips() {
    $('#catChips').innerHTML = CATS.map((c) =>
      `<button class="chip" type="button" aria-pressed="${state.cat === c}" data-cat="${c}">${c}</button>`
    ).join('');
    $('#sortChips').innerHTML = SORTS.map((s) =>
      `<button class="chip" type="button" aria-pressed="${state.sort === s}" data-sort="${s}">${s}</button>`
    ).join('');
  }

  /* ──────────────────────────── shop: grid ───────────────────────────── */

  function visible() {
    const q = state.query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const okCat = state.cat === 'ALL' || p.cat === state.cat;
      const okQ = !q || [p.name, p.collection, p.desc, p.cat].some((f) => f.toLowerCase().includes(q));
      return okCat && okQ;
    });
    if (state.shortcut === 'best') list = list.filter((p) => (p.tags || []).includes('best'));
    if (state.shortcut === 'new') list = list.filter((p) => (p.tags || []).includes('new'));
    if (state.sort === 'PRICE LOW → HIGH') list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === 'PRICE HIGH → LOW') list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === 'NEWEST') list = [...list].reverse();
    return list;
  }

  function badgeFor(p) {
    const t = p.tags || [];
    if (t.includes('new')) return 'New arrival';
    if (t.includes('best')) return 'Best seller';
    if (t.includes('locked')) return 'Locked case';
    return '';
  }

  function cardHTML(p) {
    const badge = badgeFor(p);
    return `
      <article class="card card--${p.size}" data-id="${p.id}">
        <div class="card__plate">
          <img src="${imgPath(p)}" alt="${p.name}" width="400" height="500" loading="lazy" decoding="async">
          <span class="card__spark" aria-hidden="true">&#10022;</span>
          <span class="card__collection">${p.collection}</span>
          ${badge ? `<span class="card__badge">${badge}</span>` : ''}
        </div>
        <div class="card__body">
          <h3 class="card__name">${p.name}</h3>
          <p class="card__desc">${p.desc}</p>
          <div class="card__foot">
            <span class="card__price">${money(p.price)}</span>
            <button class="card__btn" type="button" data-discover="${p.id}">Discover artifact</button>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = visible();
    $('#grid').innerHTML = list.map(cardHTML).join('');
    $('#empty').hidden = list.length > 0;
    $('#resultCount').textContent = `${list.length} artifact${list.length === 1 ? '' : 's'}`;
    decorateCards();
    observeReveals();
  }

  /* ─────────────────────────── product detail ────────────────────────── */

  function tabContent(p) {
    switch (state.tab) {
      case 'DETAILS':
        return `<ul>${p.details.map((d) => `<li>${d}</li>`).join('')}</ul>`;
      case "WHAT'S INCLUDED":
        return `<ul>${p.included.map((d) => `<li>${d}</li>`).join('')}</ul>`;
      case 'REVIEWS':
        return p.reviews.map((r) => `<p class="review">&ldquo;${r.text}&rdquo;<cite>${r.who}</cite></p>`).join('');
      default:
        return `<p style="margin:0">${p.story}</p>`;
    }
  }

  function renderDetail(animate) {
    const p = state.current;
    const img = $('#detailImg');

    if (animate) {
      img.classList.remove('is-swapping');
      void img.offsetWidth;
      img.classList.add('is-swapping');
    }
    img.src = imgPath(p);
    img.alt = p.name;

    $('#detailCat').textContent = `${p.cat} · ${p.collection}`;
    $('#detailName').textContent = p.name;
    $('#detailPrice').textContent = money(p.price);
    $('#detailDesc').textContent = p.desc;
    $('#detailReviews').textContent = `${p.reviewCount} reviews`;
    $('.stars').textContent = '★★★★★'.slice(0, p.rating) + '☆☆☆☆☆'.slice(0, 5 - p.rating);
    $('.stars').setAttribute('aria-label', `Rated ${p.rating} out of 5`);

    $('#variantLabel').textContent = p.variantLabel;
    if (!p.variants.includes(state.variant)) state.variant = p.variants[Math.min(2, p.variants.length - 1)];
    $('#variantChips').innerHTML = p.variants.map((v) =>
      `<button class="chip" type="button" aria-pressed="${state.variant === v}" data-variant="${v}">${v}</button>`
    ).join('');

    $('#detailThumbs').innerHTML = [0, 1, 2, 3].map((n) => `
      <button class="thumb" type="button" aria-pressed="${state.view === n}" data-view="${n}" aria-label="View ${n + 1}">
        <img src="${imgPath(p)}" alt="" style="transform:scale(${1 + n * 0.16}) rotate(${(n - 1) * 4}deg)">
      </button>`).join('');

    $('#tabBar').innerHTML = TABS.map((t) =>
      `<button class="tab" type="button" role="tab" aria-selected="${state.tab === t}" data-tab="${t}">${t}</button>`
    ).join('');
    $('#tabBody').innerHTML = tabContent(p);
    $('#qtyVal').textContent = state.qty;

    const also = PRODUCTS.filter((x) => x.id !== p.id && (x.cat === p.cat || x.collection === p.collection)).slice(0, 4);
    const fill = PRODUCTS.filter((x) => x.id !== p.id && !also.includes(x)).slice(0, 4 - also.length);
    $('#alsoLike').innerHTML = [...also, ...fill].map((x) => `
      <article class="mini" data-discover="${x.id}" tabindex="0" role="button">
        <img src="${imgPath(x)}" alt="${x.name}" width="400" height="500" loading="lazy" decoding="async">
        <h3 class="mini__name">${x.name}</h3>
        <span class="mini__price">${money(x.price)}</span>
      </article>`).join('');
  }

  function openProduct(id, scroll = true) {
    const p = byId(id);
    if (!p) return;
    state.current = p;
    state.qty = 1;
    state.view = 0;
    state.tab = TABS[0];
    renderDetail(true);
    if (scroll) $('#product').scrollIntoView({ behavior: rm.matches ? 'auto' : 'smooth', block: 'start' });
  }

  /* ─────────────────────── cart / wishlist / drawer ───────────────────── */

  const drawer = $('#drawer');
  const scrim = $('#scrim');

  function counts() {
    const c = state.cart.reduce((n, l) => n + l.qty, 0);
    $$('[data-count="cart"]').forEach((el) => { el.textContent = c; });
    $$('[data-count="wish"]').forEach((el) => { el.textContent = state.wish.length; });
  }

  function addToCart(p, qty, variant) {
    const key = p.id + '|' + variant;
    const line = state.cart.find((l) => l.key === key);
    if (line) line.qty += qty;
    else state.cart.push({ key, id: p.id, variant, qty });
    counts();
    const btn = $('.btn-cart');
    btn.classList.remove('is-bump');
    void btn.offsetWidth;
    btn.classList.add('is-bump');
    if (state.drawer === 'cart') renderDrawer('cart');
  }

  function toggleWish(p) {
    const i = state.wish.indexOf(p.id);
    if (i > -1) state.wish.splice(i, 1);
    else state.wish.push(p.id);
    counts();
    if (state.drawer === 'wishlist') renderDrawer('wishlist');
    return i === -1;
  }

  function lineItemHTML(p, sub, removeKey, kind, lineTotal) {
    return `
      <div class="line-item">
        <img src="${imgPath(p)}" alt="" width="400" height="500">
        <div class="line-item__main">
          <h3 class="line-item__name">${p.name}</h3>
          <p class="line-item__meta">${sub}</p>
          <span class="line-item__price">${money(lineTotal ?? p.price)}</span>
        </div>
        <button class="line-item__remove" type="button" data-remove="${removeKey}" data-kind="${kind}" aria-label="Remove ${p.name}">&times;</button>
      </div>`;
  }

  function renderDrawer(kind) {
    const body = $('#drawerBody');
    const foot = $('#drawerFoot');
    $('#drawerTitle').textContent =
      kind === 'cart' ? 'Your cart' : kind === 'wishlist' ? 'Your wishlist' : 'Your account';

    if (kind === 'cart') {
      if (!state.cart.length) {
        body.innerHTML = '<p class="drawer__empty">No artifacts claimed yet</p>';
        foot.innerHTML = '';
        return;
      }
      body.innerHTML = state.cart.map((l) => {
        const p = byId(l.id);
        return lineItemHTML(p, `${l.variant} · ${money(p.price)} × ${l.qty}`, l.key, 'cart', p.price * l.qty);
      }).join('');
      const total = state.cart.reduce((n, l) => n + byId(l.id).price * l.qty, 0);
      foot.innerHTML = `
        <div class="subtotal"><span>Subtotal</span><span>${money(total)}</span></div>
        <button class="btn btn--gold btn--wide" type="button" id="checkoutBtn" style="width:100%">Seal and send</button>
        <p class="mono" style="margin-top:12px;text-align:center">Free delivery within Malaysia</p>`;
      $('#checkoutBtn').addEventListener('click', () => toast('Checkout opens when the case does'));
      return;
    }

    if (kind === 'wishlist') {
      if (!state.wish.length) {
        body.innerHTML = '<p class="drawer__empty">Nothing set aside yet</p>';
        foot.innerHTML = '';
        return;
      }
      body.innerHTML = state.wish.map((id) => {
        const p = byId(id);
        return lineItemHTML(p, p.collection, id, 'wish');
      }).join('');
      foot.innerHTML = '<p class="mono" style="text-align:center">Set aside, not reserved</p>';
      return;
    }

    body.innerHTML = `
      <p class="lede" style="margin-top:0">Sign in to see your catalogue cards, past parcels and anything set aside.</p>
      <div class="field"><label for="acctEmail">Email</label><input type="email" id="acctEmail" placeholder="you@example.com"></div>
      <div class="field"><label for="acctPass">Password</label><input type="password" id="acctPass" placeholder="••••••••"></div>`;
    foot.innerHTML = `
      <button class="btn btn--gold" type="button" id="signinBtn" style="width:100%">Sign in</button>
      <p class="mono" style="margin-top:12px;text-align:center">Accounts open with the next collection</p>`;
    $('#signinBtn').addEventListener('click', () => toast('Accounts open with the next collection'));
  }

  function openDrawer(kind) {
    state.drawer = kind;
    renderDrawer(kind);
    drawer.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
    });
    nav.classList.remove('is-hidden');
  }

  function closeDrawer() {
    state.drawer = null;
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, 560);
  }

  $('#drawerClose').addEventListener('click', closeDrawer);
  scrim.addEventListener('click', closeDrawer);

  /* ──────────────────────── toast + spark burst ──────────────────────── */

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    $('#toastText').textContent = msg;
    t.hidden = false;
    requestAnimationFrame(() => t.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.classList.remove('is-on');
      setTimeout(() => { t.hidden = true; }, 500);
    }, 2600);
  }

  function burst(x, y, n = 12) {
    if (rm.matches || small.matches) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'cursor-trail';
      const a = (Math.PI * 2 * i) / n + Math.random();
      const d = 30 + Math.random() * 70;
      s.style.cssText =
        `left:${x}px;top:${y}px;width:5px;height:5px;` +
        `transition:transform .9s cubic-bezier(.2,.7,.3,1), opacity .9s ease;animation:none;opacity:.9`;
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 20}px) scale(.2)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 1000);
    }
  }

  /* ─────────────────────── delegated click handling ───────────────────── */

  document.addEventListener('click', (e) => {
    const open = e.target.closest('[data-open]');
    if (open) {
      const kind = open.dataset.open;
      if (kind === 'search') setSearch(true);
      else openDrawer(kind);
      setMenu(false);
      return;
    }

    const discover = e.target.closest('[data-discover]');
    if (discover) {
      openProduct(discover.dataset.discover);
      return;
    }

    const chipCat = e.target.closest('[data-cat]');
    if (chipCat) {
      state.cat = chipCat.dataset.cat;
      state.shortcut = null;
      renderChips();
      renderGrid();
      return;
    }

    const chipSort = e.target.closest('[data-sort]');
    if (chipSort) {
      state.sort = chipSort.dataset.sort;
      renderChips();
      renderGrid();
      return;
    }

    const variant = e.target.closest('[data-variant]');
    if (variant) {
      state.variant = variant.dataset.variant;
      renderDetail(false);
      return;
    }

    const view = e.target.closest('[data-view]');
    if (view) {
      state.view = +view.dataset.view;
      renderDetail(true);
      return;
    }

    const tab = e.target.closest('[data-tab]');
    if (tab) {
      state.tab = tab.dataset.tab;
      renderDetail(false);
      return;
    }

    const remove = e.target.closest('[data-remove]');
    if (remove) {
      if (remove.dataset.kind === 'cart') {
        state.cart = state.cart.filter((l) => l.key !== remove.dataset.remove);
        renderDrawer('cart');
      } else {
        state.wish = state.wish.filter((id) => id !== remove.dataset.remove);
        renderDrawer('wishlist');
      }
      counts();
    }
  });

  /* keyboard access for card-shaped buttons */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest('[data-discover][role="button"]');
    if (!el) return;
    e.preventDefault();
    openProduct(el.dataset.discover);
  });

  /* ───────────────────────── detail interactions ─────────────────────── */

  $('#qtyUp').addEventListener('click', () => { state.qty++; $('#qtyVal').textContent = state.qty; });
  $('#qtyDown').addEventListener('click', () => { state.qty = Math.max(1, state.qty - 1); $('#qtyVal').textContent = state.qty; });

  $('#claimBtn').addEventListener('click', (e) => {
    addToCart(state.current, state.qty, state.variant);
    burst(e.clientX, e.clientY, 14);
    toast(`${state.current.name} claimed`);
  });

  $('#wishBtn').addEventListener('click', (e) => {
    const added = toggleWish(state.current);
    burst(e.clientX, e.clientY, 8);
    toast(added ? `${state.current.name} set aside` : `${state.current.name} removed`);
  });

  $('#shopSearch').addEventListener('input', (e) => {
    state.query = e.target.value;
    state.shortcut = null;
    renderGrid();
  });

  $('#randomArtifact').addEventListener('click', (e) => {
    const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    burst(e.clientX, e.clientY, 16);
    openProduct(p.id);
    toast(`The shelves suggest: ${p.name}`);
  });

  $('#signup').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#signupNote').hidden = false;
    e.target.reset();
  });

  /* ───────────────────────── cursor particle ─────────────────────────── */

  if (!rm.matches && !small.matches && matchMedia('(pointer:fine)').matches) {
    const dot = $('#cursorDot');
    let tx = 0, ty = 0, cx = 0, cy = 0, lastTrail = 0;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      dot.classList.add('is-on');
      dot.classList.toggle('is-hot', !!e.target.closest('a, button, [role="button"]'));

      const now = performance.now();
      if (now - lastTrail > 46) {
        lastTrail = now;
        const s = document.createElement('span');
        s.className = 'cursor-trail';
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1100);
      }
    }, { passive: true });

    (function follow() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      dot.style.transform = `translate(${cx - 3.5}px, ${cy - 3.5}px)`;
      requestAnimationFrame(follow);
    })();
  }

  /* ─────────────────────── ambient sound (opt-in) ────────────────────── */

  const soundBtn = $('#soundToggle');
  let audio = null;

  /* An original generative score, synthesised in the browser: a low drone, a
     quiet minor pad, filtered wind, and pentatonic chimes that land every few
     seconds. Nothing loops audibly, so it never wears out the way a short
     backing track does. */
  function buildAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    /* a damped feedback delay stands in for a reverb tail — cheap, and warm */
    const delay = ctx.createDelay(1.5);
    delay.delayTime.value = 0.38;
    const damp = ctx.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.value = 1700;
    const fb = ctx.createGain();
    fb.gain.value = 0.3;
    delay.connect(damp).connect(fb).connect(delay);
    delay.connect(master);

    /* drone — root and fifth, well below everything else */
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 420;
    droneFilter.Q.value = 0.6;
    droneFilter.connect(master);
    [[55, 'triangle', 0.068], [82.4, 'sine', 0.042]].forEach(([f, type, vol]) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = vol;
      osc.connect(g).connect(droneFilter);
      osc.start();
    });

    /* pad — an A minor triad kept faint, with the filter breathing across it */
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 760;
    padFilter.Q.value = 0.8;
    padFilter.connect(master);
    [220, 261.63, 329.63].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.detune.value = (i - 1) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.021;
      osc.connect(g).connect(padFilter);
      osc.start();
    });
    const sweep = ctx.createOscillator();
    sweep.frequency.value = 0.045;
    const sweepAmt = ctx.createGain();
    sweepAmt.gain.value = 280;
    sweep.connect(sweepAmt).connect(padFilter.frequency);
    sweep.start();

    /* wind — band-passed noise that swells and falls back */
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = 'bandpass';
    nf.frequency.value = 620;
    nf.Q.value = 0.5;
    const ng = ctx.createGain();
    ng.gain.value = 0.042;
    noise.connect(nf).connect(ng).connect(master);
    noise.start();

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 0.03;
    lfo.connect(lfoAmt).connect(ng.gain);
    lfo.start();

    /* A celesta-ish voice: fundamental plus a quieter octave partial, struck
       hard and left to decay. */
    function voice(freq, at, dur, peak) {
      [[freq, peak], [freq * 2, peak * 0.32]].forEach(([f, vol]) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(vol, at + 0.014);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        osc.connect(g);
        g.connect(master);
        g.connect(delay);
        osc.start(at);
        osc.stop(at + dur + 0.1);
      });
    }

    /* Single notes between phrases, from the same minor scale. */
    const SCALE = [440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];

    /* An original phrase in A minor: a question that falls, then an answer that
       settles back on the root. Written for this shop, not borrowed. */
    const MOTIF = [
      [440.00, 0.00, 1.4], [523.25, 0.55, 1.4], [493.88, 1.10, 2.2],
      [659.25, 2.20, 1.4], [587.33, 2.75, 1.4], [493.88, 3.30, 2.4],
      [329.63, 4.40, 1.6], [392.00, 4.95, 1.6], [349.23, 5.50, 2.4],
      [440.00, 6.60, 4.0]
    ];

    let chimeTimer = null;
    let sinceMotif = 0;

    function strike() {
      voice(SCALE[Math.floor(Math.random() * SCALE.length)], ctx.currentTime, 3.6, 0.05);
    }

    function phrase() {
      const t0 = ctx.currentTime + 0.05;
      /* occasionally lift the whole phrase so it never sits in one register */
      const shift = [1, 1, 1, 1.5, 0.6667][Math.floor(Math.random() * 5)];
      MOTIF.forEach(([f, at, dur]) => voice(f * shift, t0 + at, dur, 0.058));
    }

    function queue() {
      chimeTimer = setTimeout(() => {
        if (sinceMotif >= 2) { phrase(); sinceMotif = 0; }
        else { strike(); sinceMotif++; }
        queue();
      }, 5000 + Math.random() * 6500);
    }

    return {
      ctx, master,
      startChimes() { if (!chimeTimer) queue(); },
      stopChimes() { clearTimeout(chimeTimer); chimeTimer = null; }
    };
  }

  const SOUND_PREF = 'amirah-sound';

  function setSound(on, announce) {
    if (!audio) audio = buildAudio();
    if (!audio) { if (announce) toast('Sound is not available here'); return; }

    audio.ctx.resume();
    const t = audio.ctx.currentTime;
    const g = audio.master.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(on ? 0.5 : 0, t + (on ? 2.6 : 0.7));
    if (on) audio.startChimes(); else audio.stopChimes();

    soundBtn.classList.remove('is-hint');
    soundBtn.setAttribute('aria-pressed', String(on));
    soundBtn.setAttribute('aria-label', on ? 'Turn ambient sound off' : 'Turn ambient sound on');
    try { localStorage.setItem(SOUND_PREF, on ? 'on' : 'off'); } catch (e) { /* private mode */ }
    if (announce) toast(on ? 'Ambient sound on' : 'The workshop falls quiet');
  }

  soundBtn.addEventListener('click', () => {
    setSound(soundBtn.getAttribute('aria-pressed') !== 'true', true);
  });

  /* Browsers refuse to start audio before a gesture, so a returning visitor who
     left it on gets it back the moment they touch the page — and a first-time
     visitor just gets a gently pulsing speaker to notice. */
  let soundPref = null;
  try { soundPref = localStorage.getItem(SOUND_PREF); } catch (e) { /* private mode */ }

  if (soundPref === 'on') {
    const resume = () => setSound(true, false);
    ['pointerdown', 'keydown', 'scroll'].forEach((evt) =>
      window.addEventListener(evt, resume, { once: true, passive: true }));
  } else if (soundPref === null) {
    soundBtn.classList.add('is-hint');
  }

  /* ────────────────────────────── start up ───────────────────────────── */

  renderChips();
  renderGrid();
  renderDetail(false);
  counts();
  observeReveals();
  onScrollFrame();
  onNavScroll();
})();
