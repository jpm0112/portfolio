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
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let rafId = null;

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      card.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateY(-3px)`;
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        rafId = requestAnimationFrame(animate);
      }
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetX = ((y - centerY) / centerY) * -3;
      targetY = ((x - centerX) / centerX) * 3;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
      // Smooth return to rest
      function settle() {
        currentX += (0 - currentX) * 0.06;
        currentY += (0 - currentY) * 0.06;
        card.style.transform = `perspective(800px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
          rafId = requestAnimationFrame(settle);
        } else {
          card.style.transform = '';
          rafId = null;
        }
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(settle);
    });
  });
})();

/* ===== Magnetic button effect (lerped like tilt) ===== */
(function initMagnetic() {
  const buttons = document.querySelectorAll('.btn--filled, .btn--ghost, .nav__cta');
  if (window.matchMedia('(pointer: fine)').matches === false) return;

  buttons.forEach(btn => {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let rafId = null;

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetX = x * 0.12;
      targetY = y * 0.12;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    btn.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
      // Smooth settle back to rest
      function settle() {
        currentX += (0 - currentX) * 0.06;
        currentY += (0 - currentY) * 0.06;
        btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
        if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
          rafId = requestAnimationFrame(settle);
        } else {
          btn.style.transform = '';
          rafId = null;
        }
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(settle);
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

/* ===== Floating Particle System ===== */
(function initParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animFrame;

  function resize() {
    const hero = canvas.parentElement.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawParticles(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Pulse opacity
      const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.15 + 0.85;
      const alpha = p.opacity * pulse;

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += dx * force * 0.02;
        p.y += dy * force * 0.02;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184, 115, 51, ${alpha})`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(184, 115, 51, ${0.06 * (1 - cdist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animFrame = requestAnimationFrame(drawParticles);
  }

  canvas.parentElement.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  resize();
  createParticles();
  requestAnimationFrame(drawParticles);

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Stop animation when hero is not in view
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(animFrame);
      } else {
        requestAnimationFrame(drawParticles);
      }
    });
  }, { threshold: 0 });
  heroObserver.observe(canvas.parentElement.parentElement);
})();

/* ===== Text Scramble on Section Numbers ===== */
(function initTextScramble() {
  const chars = '0123456789!@#$%&*';
  const numbers = document.querySelectorAll('.section__number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalText = el.textContent;
        const duration = 800;
        const start = performance.now();

        function scramble(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          let result = '';

          for (let i = 0; i < finalText.length; i++) {
            if (progress > (i + 1) / finalText.length) {
              result += finalText[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          el.textContent = result;
          if (progress < 1) {
            requestAnimationFrame(scramble);
          } else {
            el.textContent = finalText;
          }
        }

        requestAnimationFrame(scramble);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  numbers.forEach(num => observer.observe(num));
})();

/* ===== Word-by-Word Section Title Reveal ===== */
(function initWordReveal() {
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

/* ===== Card Scale-In on Scroll ===== */
(function initScaleReveal() {
  // Apply scale-reveal to project cards, edu cards, and skill columns
  const cards = document.querySelectorAll('.project, .edu__card, .skill-col, .pub, .contact__item');

  cards.forEach((card, i) => {
    if (!card.classList.contains('reveal')) {
      card.classList.add('scale-reveal');
    } else {
      // Replace reveal with scale-reveal for a more dramatic entrance
      card.classList.remove('reveal');
      card.classList.add('scale-reveal');
    }
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
