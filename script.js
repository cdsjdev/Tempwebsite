// ============ Shared footer (injected on every page) ============
const footerHost = document.getElementById('footer');
if (footerHost) {
  footerHost.outerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-brand"><span class="brand-mark" style="color:var(--gold)">✦</span> Modern Stay <em>Heliosa</em></div>
          <p class="footer-blurb">A boutique ground-floor apartment with a private garden in Kowale, minutes from Gdańsk. Quiet mornings, easy access to the city.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="photos.html">Photos</a>
          <a href="contact.html">Contact</a>
          <a href="reserve.html">Reserve</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="tel:+48789099500">+48 789 099 500</a>
          <a href="mailto:contact@modernstay.eu">contact@modernstay.eu</a>
          <p>Heliosa 22/1, 80-180 Kowale, Poland</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 Modern Stay — Heliosa · Kowale, Poland</p>
        <p class="footer-copy">Rated 5.00 ★ across 46 reviews</p>
      </div>
    </div>
  </footer>`;
}

// ============ Header shadow + scroll progress ============
const header = document.getElementById('header');
const progress = document.getElementById('scrollProgress');
function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle('scrolled', y > 20);
  if (progress) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? (y / h) * 100 + '%' : '0%';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ Mobile nav ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    })
  );
}

// ============ Reveal on scroll ============
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ============ Lightbox (Photos page) ============
const galItems = Array.from(document.querySelectorAll('.gal-item img'));
const lightbox = document.getElementById('lightbox');
if (galItems.length && lightbox) {
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  let lbIndex = 0;

  const showLb = (i) => {
    lbIndex = (i + galItems.length) % galItems.length;
    const img = galItems[lbIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
  };
  const openLb = (i) => {
    showLb(i);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galItems.forEach((img, i) => img.parentElement.addEventListener('click', () => openLb(i)));
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', () => showLb(lbIndex - 1));
  document.getElementById('lbNext').addEventListener('click', () => showLb(lbIndex + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });
}

// ============ Booking form (demo — no backend) ============
const form = document.getElementById('bookingForm');
if (form) {
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (note) note.hidden = false;
    form.querySelectorAll('input, textarea').forEach((f) => (f.value = ''));
  });
}
