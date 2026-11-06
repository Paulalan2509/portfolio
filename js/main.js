/* ---------- EDIT HERE ---------- */
const EMAIL = 'nyoumpau2509@gmail.com';
const PHONE_DISPLAY = '+91 72079 47168';
const PHONE_E164 = '917207947168'; // country code + number, digits only
const WA_MESSAGE = "Hello Paul, I found your portfolio and I'd like to talk about a project.";
// Paste your Formspree form address here to send messages straight from the page,
// for example 'https://formspree.io/f/abcdwxyz'. Leave it empty to open the visitor's email app instead.
const FORM_ENDPOINT = 'https://formspree.io/f/maeeldzg';
/* ------------------------------- */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Email: fill every [data-email] from one constant */
document.querySelectorAll('[data-email]').forEach(el => {
  el.textContent = EMAIL;
  el.setAttribute('href', 'mailto:' + EMAIL);
});
/* Phone and WhatsApp: fill every [data-phone] and [data-whatsapp] from the constants above */
document.querySelectorAll('[data-phone]').forEach(el => {
  el.textContent = PHONE_DISPLAY;
  el.setAttribute('href', 'tel:+' + PHONE_E164);
});
document.querySelectorAll('[data-whatsapp]').forEach(el => {
  el.setAttribute('href', 'https://wa.me/' + PHONE_E164 + '?text=' + encodeURIComponent(WA_MESSAGE));
});
document.getElementById('year').textContent = new Date().getFullYear();

/* Reveal sections as they scroll into view (content stays visible if this cannot run) */
const revealEls = [...document.querySelectorAll('.reveal')];
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealEls.forEach(el => revealer.observe(el));
}

/* Mobile menu */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLines = document.getElementById('menuLines');
function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuLines.setAttribute('d', open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16');
}
menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); menuBtn.focus(); }
});
document.addEventListener('click', e => {
  if (!mobileMenu.classList.contains('hidden') && !e.target.closest('header')) setMenu(false);
});
window.matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

/* Current section in the nav */
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.setAttribute('aria-current', String(l.getAttribute('href') === '#' + entry.target.id)));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/* The lamp: light follows the pointer. The animation loop runs only while it has work to do:
   easing towards the pointer, or the idle drift while the hero is on screen. It stops when the
   light has settled, when the hero is scrolled away and when the tab is hidden. */
const lamp = document.querySelector('.lamp');
const hero = document.getElementById('top');
const waFloat = document.getElementById('waFloat');
let tx = 0, ty = 0, cx = 0, cy = 0, t = 0, lw = 0, lh = 0;
let pointerSeen = false, heroVisible = true, raf = 0;

function paint() {
  lamp.style.setProperty('--mx', cx + 'px');
  lamp.style.setProperty('--my', cy + 'px');
}
function sizeLamp() {
  const r = lamp.getBoundingClientRect();
  lw = r.width; lh = r.height;
  lamp.style.setProperty('--r', Math.max(170, lw * 0.42) + 'px');
  if (!pointerSeen) { tx = cx = lw * 0.3; ty = cy = lh * 0.4; paint(); }
}
function step() {
  raf = 0;
  if (!heroVisible || document.hidden) return;
  if (!pointerSeen) {
    t += 0.006;
    tx = lw * (0.5 + 0.38 * Math.sin(t));
    ty = lh * (0.5 + 0.28 * Math.cos(t * 1.3));
  }
  cx += (tx - cx) * 0.1;
  cy += (ty - cy) * 0.1;
  paint();
  const settled = Math.abs(tx - cx) < 0.3 && Math.abs(ty - cy) < 0.3;
  if (!pointerSeen || !settled) raf = requestAnimationFrame(step);
}
function wake() {
  if (!raf && !reduceMotion) raf = requestAnimationFrame(step);
}

window.addEventListener('pointermove', e => {
  // Ignore touch, and the zero-movement events browsers send on load and after scrolling
  if (e.pointerType === 'touch' || (e.movementX === 0 && e.movementY === 0)) return;
  pointerSeen = true;
  const r = lamp.getBoundingClientRect();
  tx = e.clientX - r.left;
  ty = e.clientY - r.top;
  wake();
}, { passive: true });
window.addEventListener('resize', () => { sizeLamp(); wake(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  // On phones and tablets the WhatsApp button appears once the hero is scrolled past
  waFloat.classList.toggle('is-shown', !heroVisible);
  if (heroVisible) wake();
}).observe(hero);

sizeLamp();
wake();

/* Contact form.
   With FORM_ENDPOINT set (a free Formspree form), the message is sent from the page and the visitor sees
   a confirmation. Without it, the visitor's email app opens with the message filled in. */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const sendBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = form.elements;
  const name = f['name'].value.trim();
  const email = f['email'].value.trim();
  const message = f['message'].value.trim();
  const type = f['type'].value;

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    statusEl.textContent = 'Please add your name, a valid email and a short message.';
    return;
  }
  const subject = 'Project enquiry: ' + type;

  if (FORM_ENDPOINT) {
    sendBtn.disabled = true;
    statusEl.textContent = 'Sending...';
    try {
      const data = new FormData(form);
      data.append('_subject', subject);
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      statusEl.textContent = 'Thank you, your message is sent. I will reply within one working day.';
    } catch (err) {
      statusEl.textContent = 'The message could not be sent. Please write to ' + EMAIL + ' or message me on WhatsApp.';
    } finally {
      sendBtn.disabled = false;
    }
    return;
  }

  const body = message + '\n\nFrom: ' + name + '\nReply to: ' + email;
  statusEl.textContent = 'Opening your email app. If nothing opens, write to ' + EMAIL + ' or message me on WhatsApp.';
  window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
