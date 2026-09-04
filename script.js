/* Single source of truth for the user's motion preference. */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== Navigation ===== */
(function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');
  const navAnchors = links.querySelectorAll('a');

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });

  // Mobile toggle
  function toggleMobile() {
    const isOpen = links.classList.contains('open');
    toggle.classList.toggle('active', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.classList.toggle('open', !isOpen);
    overlay.classList.toggle('active', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  }

  toggle.addEventListener('click', toggleMobile);
  overlay.addEventListener('click', toggleMobile);

  // Close mobile nav on link click
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = links.querySelector(`a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
})();

/* ===== Scroll Reveal ===== */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add stagger delay if element has --d custom property
        const delay = getComputedStyle(entry.target).getPropertyValue('--d');
        if (delay) {
          entry.target.style.transitionDelay = `${parseInt(delay) * 0.1}s`;
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
})();

/* ===== Dynamic Stat Values =====
   Populates data-count for stats whose values should derive from page state
   instead of being hard-coded:
   - data-since="YYYY-MM": years elapsed since that month (floored)
   - data-source="research-projects": count of project cards in the first
     .projects__grid (the Research grid that precedes Applied Projects).
*/
(function initDynamicStats() {
  // Years-since computation, floored. Used with data-suffix="+" to render "7+".
  document.querySelectorAll('[data-since]').forEach(el => {
    const since = new Date(el.dataset.since + '-01T00:00:00');
    if (isNaN(since)) return;
    const now = new Date();
    const ms = now - since;
    const years = Math.floor(ms / (365.25 * 24 * 3600 * 1000));
    if (years >= 0) el.dataset.count = String(years);
  });

  // Research project count: first .projects__grid contains the Research tier.
  const projectStat = document.querySelector('[data-source="research-projects"]');
  if (projectStat) {
    const researchGrid = document.querySelector('.projects__grid');
    if (researchGrid) {
      const count = researchGrid.querySelectorAll('.project').length;
      if (count > 0) projectStat.dataset.count = String(count);
    }
  }
})();

/* ===== Counter Animation ===== */
(function initCounters() {
  if (REDUCED_MOTION) {
    document.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
    return;
  }
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const start = performance.now();

        const suffix = el.dataset.suffix || '';

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + (progress >= 1 ? suffix : '');
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  counters.forEach(el => observer.observe(el));
})();

/* ===== Smooth scroll for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
    }
  });
});

/* ===== Subtle parallax on hero grid pattern ===== */
(function initHeroParallax() {
  if (REDUCED_MOTION) return;
  const grid = document.querySelector('.hero__grid-pattern');
  if (!grid) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      grid.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  });
})();

/* ===== Back to Top ===== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
  });
})();

/* ===== Scroll Progress Bar ===== */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ===== Experience Timeline Animation ===== */
(function initTimeline() {
  const timeline = document.querySelector('.exp__timeline');
  if (!timeline) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('timeline-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(timeline);
})();

/* ===== Smooth section number count-up on scroll ===== */
(function initSectionNumbers() {
  if (REDUCED_MOTION) return;
  const numbers = document.querySelectorAll('.section__number');
  numbers.forEach(num => {
    num.style.opacity = '0';
    num.style.transform = 'translateX(-10px)';
    num.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  numbers.forEach(num => observer.observe(num));
})();

/* ===== Word-by-Word Section Title Reveal ===== */
(function initWordReveal() {
  if (REDUCED_MOTION) return;
  const titles = document.querySelectorAll('.section__title');

  titles.forEach(title => {
    const text = title.textContent.trim();
    const words = text.split(/\s+/);
    title.innerHTML = '';
    title.classList.add('word-reveal');

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.classList.add('word');
      span.textContent = word;
      span.style.transitionDelay = `${i * 0.08}s`;
      title.appendChild(span);
      // Add space between words
      if (i < words.length - 1) {
        title.appendChild(document.createTextNode('\u00A0'));
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  titles.forEach(title => observer.observe(title));
})();

/* ===== Card Scale-In on Scroll =====
   Cards are visible immediately; only the publication card keeps the
   scale-in entrance as a signature reveal. */
(function initScaleReveal() {
  if (REDUCED_MOTION) return;
  // Strip the fade-up class from card-style elements so they just appear.
  document.querySelectorAll('.project, .edu__card, .skill-col, .contact__item, .stat, .exp__item, .section__subheader, .about__text').forEach(el => {
    el.classList.remove('reveal');
  });

  // Publications: convert reveal to scale-reveal for the dramatic entrance.
  document.querySelectorAll('.pub').forEach(card => {
    card.classList.remove('reveal');
    card.classList.add('scale-reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.scale-reveal').forEach(el => observer.observe(el));
})();

/* ===== Parallax Depth on Scroll ===== */
(function initParallaxDepth() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const layers = [
    { selector: '.about__stats', speed: 0.05 },
    { selector: '.edu__cards', speed: 0.03 },
    { selector: '.section__number', speed: -0.08, individual: true },
  ];

  function updateParallax() {
    const scrollY = window.scrollY;

    layers.forEach(layer => {
      const elements = layer.individual
        ? document.querySelectorAll(layer.selector)
        : [document.querySelector(layer.selector)];

      elements.forEach(el => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * layer.speed;
        el.style.transform = el.style.transform
          ? el.style.transform.replace(/translateY\([^)]+\)/, `translateY(${offset}px)`)
          : `translateY(${offset}px)`;
      });
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
})();

/* ===== Skill list stagger animation ===== */
(function initSkillStagger() {
  if (REDUCED_MOTION) return;
  const skillCols = document.querySelectorAll('.skill-col');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((li, i) => {
          li.style.opacity = '0';
          li.style.transform = 'translateX(-12px)';
          li.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
          requestAnimationFrame(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCols.forEach(col => observer.observe(col));
})();


/* ===== Footer Year ===== */
(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
