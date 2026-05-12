/* ═══════════════════════════════════════════════════════
   SCRIPT.JS — Interactions du portfolio
═══════════════════════════════════════════════════════ */

// ─────────────────────────────────────────
// 1. CURSEUR PERSONNALISÉ
//    Fait suivre le curseur vert à la souris
// ─────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursor.style.left     = e.clientX + 'px';
  cursor.style.top      = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});


// ─────────────────────────────────────────
// 2. SCROLL REVEAL
//    Fait apparaître les éléments .reveal
//    quand ils entrent dans le viewport
// ─────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Légère cascade entre les éléments (80ms d'écart)
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      // On arrête d'observer une fois visible
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));


// ─────────────────────────────────────────
// 3. BARRES DE COMPÉTENCES ANIMÉES
//    Les barres se remplissent quand la
//    section compétences devient visible
// ─────────────────────────────────────────
const skillCategories = document.querySelectorAll('.skill-category');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Pour chaque barre dans la carte visible
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        // data-w contient le pourcentage cible (ex: 70)
        bar.style.width = bar.dataset.w + '%';
      });

      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCategories.forEach((cat) => barObserver.observe(cat));
