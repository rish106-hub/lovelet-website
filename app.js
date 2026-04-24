/* ═══════════════════════════════════════════
   LOVELET — Website JavaScript
   ═══════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════
   PRELOADER + SITE REVEAL
   ═══════════════════════════════════════════ */
(function initPreloader() {
  const loaderEl  = document.getElementById('loader-text');
  const preloader = document.getElementById('preloader');
  const site      = document.getElementById('site');

  const fullText = "loading something for once that isn't mid...";
  let charIdx = 0;
  let typeTimer;

  function typeChar() {
    if (charIdx < fullText.length) {
      loaderEl.textContent += fullText[charIdx];
      charIdx++;
      typeTimer = setTimeout(typeChar, 55);
    } else {
      // All typed — wait then reveal
      setTimeout(revealSite, 500);
    }
  }

  function revealSite() {
    preloader.classList.add('slide-up');

    // Show site after curtain lifts
    setTimeout(() => {
      site.classList.remove('site-hidden');
      site.classList.add('site-visible');
      preloader.style.display = 'none';
      initScrollReveal();
      initArrowDrawing();
    }, 900);
  }

  // Kick off after a brief pause
  setTimeout(typeChar, 300);
})();


/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */
(function initCursor() {
  // Only on pointer-capable devices
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let curX   = 0, curY   = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows immediately
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Outer ring lags behind (lerp)
  function animateCursor() {
    curX += (mouseX - curX) * 0.14;
    curY += (mouseY - curY) * 0.14;
    cursor.style.transform = `translate(${curX}px, ${curY}px)`;
    raf = requestAnimationFrame(animateCursor);
  }
  raf = requestAnimationFrame(animateCursor);

  // Expand on hover targets
  document.querySelectorAll('.hover-target, a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expand'));
  });

  // Sparkle on click
  document.addEventListener('click', (e) => {
    spawnSparkle(e.clientX, e.clientY);
  });
})();

function spawnSparkle(x, y) {
  const symbols = ['✦', '★', '✦', '✺', '✦'];
  const el = document.createElement('span');
  el.className = 'sparkle';
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 750);
}


/* ═══════════════════════════════════════════
   NAVBAR — SCROLL STATE
   ═══════════════════════════════════════════ */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 48) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
})();


/* ═══════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger based on position within parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx      = siblings.indexOf(entry.target);
          const delay    = Math.min(idx * 70, 300);

          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}


/* ═══════════════════════════════════════════
   FISHHOOK ARROWS — Draw-on animation
   ═══════════════════════════════════════════ */
function initArrowDrawing() {
  const paths = document.querySelectorAll('.fh-path');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  paths.forEach((path) => {
    // Measure actual path length and set dasharray accordingly
    const len = path.getTotalLength ? path.getTotalLength() : 300;
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    path.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s';
    observer.observe(path);
  });
}


/* ═══════════════════════════════════════════
   MARQUEE — Pause on hover
   ═══════════════════════════════════════════ */
(function initMarquee() {
  const track = document.querySelector('.marquee-inner');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


/* ═══════════════════════════════════════════
   REGISTRATION FORM
   ═══════════════════════════════════════════ */
(function initForm() {
  const form       = document.getElementById('reg-form');
  const emailInput = document.getElementById('reg-email');
  const submitBtn  = form?.querySelector('.btn-submit');
  const successEl  = document.getElementById('success-state');
  const errorEl    = document.getElementById('form-error');

  if (!form || !submitBtn) return;

  function setError(msg) {
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError() {
    if (errorEl) errorEl.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const email = emailInput?.value?.trim();

    if (!email || !validateEmail(email)) {
      setError('please enter a valid email address 🙏');
      emailInput?.focus();
      return;
    }

    // Loading state
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    try {
      /*
       * INTEGRATION POINT:
       * Replace the simulated delay below with a real endpoint.
       *
       * Option A — Formspree (free, easy):
       *   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       *     method: 'POST',
       *     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
       *     body: JSON.stringify({ email }),
       *   });
       *   if (!res.ok) throw new Error('submission failed');
       *
       * Option B — Mailchimp / ConvertKit embedded action URL:
       *   Replace the fetch URL with your list's POST URL.
       */
      await simulateSubmit(1600);

      // Success state
      submitBtn.classList.remove('is-loading');
      submitBtn.classList.add('is-success');

      spawnSparkle(
        submitBtn.getBoundingClientRect().left + submitBtn.offsetWidth / 2,
        submitBtn.getBoundingClientRect().top
      );

      setTimeout(() => {
        form.style.opacity = '0';
        form.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          form.style.display = 'none';
          successEl.classList.add('visible');
          successEl.setAttribute('aria-hidden', 'false');
        }, 400);
      }, 700);

      // Persist in localStorage so reload doesn't lose the state
      try {
        localStorage.setItem('lovelet_registered', email);
      } catch (_) {}

    } catch (err) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      setError('something went wrong — try again in a sec 🙏');
      console.error('[LoveLet] Form error:', err);
    }
  });

  // If already registered, show success immediately
  try {
    if (localStorage.getItem('lovelet_registered')) {
      form.style.display = 'none';
      successEl.classList.add('visible');
      successEl.setAttribute('aria-hidden', 'false');
    }
  } catch (_) {}
})();

function simulateSubmit(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/* ═══════════════════════════════════════════
   PHONE MOCKUP — Moment cycling animation
   ═══════════════════════════════════════════ */
(function initMomentCycle() {
  const moments = [
    { emoji: '🌅', caption: '"thinking about u rn tbh 🧡"' },
    { emoji: '☕', caption: '"made your fav coffee. come home."' },
    { emoji: '🌙', caption: '"good night. you\'re my fav person."' },
    { emoji: '🎵', caption: '"this song is literally us."' },
    { emoji: '🌻', caption: '"saw this and thought of u immediately."' },
  ];

  const emojiEl   = document.querySelector('.moment-emoji-layer');
  const captionEl = document.querySelector('.moment-msg');

  if (!emojiEl || !captionEl) return;

  let idx = 0;

  function cycleMoment() {
    idx = (idx + 1) % moments.length;
    const m = moments[idx];

    emojiEl.style.opacity   = '0';
    captionEl.style.opacity = '0';

    setTimeout(() => {
      emojiEl.textContent   = m.emoji;
      captionEl.textContent = m.caption;
      emojiEl.style.opacity   = '1';
      captionEl.style.opacity = '1';
    }, 350);
  }

  emojiEl.style.transition   = 'opacity 0.35s ease';
  captionEl.style.transition = 'opacity 0.35s ease';

  setInterval(cycleMoment, 3500);
})();


/* ═══════════════════════════════════════════
   SMOOTH ANCHOR SCROLLING
   ═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ═══════════════════════════════════════════
   STICKER BADGE — subtle tilt on hover
   ═══════════════════════════════════════════ */
document.querySelectorAll('.sticker-badge').forEach((badge) => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'rotate(1.5deg) scale(1.04)';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'rotate(-1.5deg) scale(1)';
  });
});


/* ═══════════════════════════════════════════
   TAG HOVER — pop effect
   ═══════════════════════════════════════════ */
document.querySelectorAll('.tag').forEach((tag, i) => {
  tag.style.transitionDelay = `${i * 40}ms`;
});
