/* ============================================
   LUXE STORE — script.js
   ============================================ */

// ---- Header scroll effect ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ---- Burger menu ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Ferme le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ---- Scroll reveal animation ----
const revealElements = document.querySelectorAll(
  '.product-card, .service-card, .stat-item, .value-item, .contact-item, .about-text, .about-image'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ---- Product filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        // Re-trigger animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ---- Contact form ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  // Simulation d'envoi (remplace par un vrai fetch/API)
  setTimeout(() => {
    formSuccess.classList.add('show');
    form.reset();
    btn.innerHTML = '<span>Envoyer le message</span><span class="btn-arrow">→</span>';
    btn.disabled = false;

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1500);
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80; // hauteur du header
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
});