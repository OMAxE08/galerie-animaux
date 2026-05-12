/* ═══════════════════════════════════════════════════════
   SCRIPT.JS — Galerie Photo Animaux
═══════════════════════════════════════════════════════ */

// ─────────────────────────────────────────
// 1. FILTRES PAR CATÉGORIE
//    Cache/affiche les cartes selon la
//    catégorie sélectionnée
// ─────────────────────────────────────────
alert("Bienvenue sur notre cite: Galerie phote groupe 7 ");
const filterBtns = document.querySelectorAll(".filter-btn");
const photoCards = document.querySelectorAll(".photo-card");
const noResults = document.getElementById("no-results");
const photoCount = document.getElementById("photo-count");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1a. Mettre à jour le bouton actif
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter; // "all", "felins", etc.
    let visible = 0;

    // 1b. Afficher / masquer les cartes
    photoCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      if (match) {
        card.classList.remove("hidden");
        // Relancer l'animation d'entrée
        card.style.animation = "none";
        card.offsetHeight; // forcer le reflow
        card.style.animation = "";
        visible++;
      } else {
        card.classList.add("hidden");
      }
    });

    // 1c. Mettre à jour le compteur dans le header
    photoCount.textContent = visible + " photo" + (visible > 1 ? "s" : "");

    // 1d. Afficher le message si aucun résultat
    noResults.style.display = visible === 0 ? "block" : "none";
  });
});

// ─────────────────────────────────────────
// 2. MODALE — VUE AGRANDIE
//    Ouvre la modale avec les infos de
//    la photo cliquée
// ─────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img");
const modalBadge = document.getElementById("modal-badge");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalDate = document.getElementById("modal-date");
const modalDl = document.getElementById("modal-dl");

// Ouvrir la modale au clic sur le bouton ⤢
document.querySelectorAll(".btn-view").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".photo-card");

    // Récupérer les données depuis les attributs data-*
    const src = card.dataset.src;
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    const date = card.dataset.date;
    const category = card.dataset.category;

    // Remplir la modale
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalDate.textContent = date;
    modalDl.href = src;

    // Badge avec la bonne couleur
    modalBadge.textContent =
      category.charAt(0).toUpperCase() + category.slice(1);
    modalBadge.className = "modal-badge " + category;

    // Ouvrir
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // bloquer le scroll
  });
});

// Fermer avec le bouton ✕
modalClose.addEventListener("click", closeModal);

// Fermer en cliquant en dehors de la boîte
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Fermer avec la touche Echap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = ""; // rétablir le scroll
  // Vider l'image pour éviter de voir l'ancienne en rouvrant
  setTimeout(() => {
    modalImg.src = "";
  }, 300);
}

// ─────────────────────────────────────────
// 3. TÉLÉCHARGEMENT
//    Le bouton ↓ sur chaque carte déclenche
//    le téléchargement de l'image HD
// ─────────────────────────────────────────
document.querySelectorAll(".btn-dl").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Le lien <a download> gère déjà le téléchargement
    // On stoppe juste la propagation pour ne pas ouvrir la modale
    e.stopPropagation();
  });
});
