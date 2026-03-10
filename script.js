/* ===== Page Loader ===== */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
    }, 600);
  });

  // Fallback: dismiss loader after 3s even if load event is slow
  setTimeout(() => {
    loader.classList.add('done');
  }, 3000);
})();

/* ===== Hero Title Shimmer (after clip reveal finishes) ===== */
(function initShimmer() {
  const title = document.querySelector('.hero__title');
  if (!title) return;

  // Wait for the clip-path animation to finish (~1.5s after page load)
  setTimeout(() => {
    title.classList.add('shimmer-ready');
    // After shimmer animation ends, clean up
    title.addEventListener('animationend', () => {
      title.classList.remove('shimmer-ready');
      title.classList.add('shimmer-done');
    }, { once: true });
  }, 1800);
})();

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

/* ===== Counter Animation ===== */
(function initCounters() {
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
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== Subtle parallax on hero grid pattern ===== */
(function initHeroParallax() {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== Cursor-following glow on project cards ===== */
(function initProjectGlow() {
  const projects = document.querySelectorAll('.project');
  projects.forEach(card => {
    const glow = card.querySelector('.project__glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
    });
  });
})();

/* ===== 3D Tilt effect on stat & education cards ===== */
(function initTilt() {
  const cards = document.querySelectorAll('.stat, .edu__card, .hero__card');
  if (window.matchMedia('(pointer: fine)').matches === false) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== Magnetic button effect ===== */
(function initMagnetic() {
  const buttons = document.querySelectorAll('.btn--filled, .btn--ghost, .nav__cta');
  if (window.matchMedia('(pointer: fine)').matches === false) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
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

/* ===== Custom Cursor ===== */
(function initCursor() {
  if (window.matchMedia('(pointer: fine)').matches === false) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;

    if (!dot.classList.contains('visible')) {
      dot.classList.add('visible');
      ring.classList.add('visible');
    }
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on hoverable elements
  const hoverTargets = 'a, button, .btn, .project, .stat, .edu__card, .contact__item, .skill-col';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('hovering');
    }
  });

  // Hide on mouse leave
  document.addEventListener('mouseleave', () => {
    dot.classList.remove('visible');
    ring.classList.remove('visible');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.add('visible');
    ring.classList.add('visible');
  });
})();

/* ===== Button Ripple Effect ===== */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
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

/* ===== Skill list stagger animation ===== */
(function initSkillStagger() {
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
