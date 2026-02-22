// ============================================================
// RANKING — Top 3 selector & badge rendering
// ============================================================

import { getPlaceData, isMutualLike, setRank, placeSlug } from '../store.js';

// Generate rank UI HTML for a place card
export function rankHTML(place) {
  const slug = placeSlug(place.name);

  return `
    <div class="place-rank-area" data-slug="${slug}" style="display: none;">
      <div class="rank-badge-container" data-slug="${slug}" style="display: none;">
        <span class="rank-badge"></span>
      </div>
      <div class="rank-selector" data-slug="${slug}">
        <span class="rank-label">Top 3:</span>
        <button class="rank-option" data-slug="${slug}" data-rank="1">1</button>
        <button class="rank-option" data-slug="${slug}" data-rank="2">2</button>
        <button class="rank-option" data-slug="${slug}" data-rank="3">3</button>
      </div>
    </div>
  `;
}

// Update rank UI for a specific place
export function updateRankUI(slug) {
  const data = getPlaceData(slug);
  const mutual = isMutualLike(slug);
  const rank = data?.rank || null;

  const area = document.querySelector(`.place-rank-area[data-slug="${slug}"]`);
  if (!area) return;

  // Show/hide rank area based on mutual like
  area.style.display = mutual ? 'flex' : 'none';

  // Update badge
  const badgeContainer = area.querySelector('.rank-badge-container');
  const badge = area.querySelector('.rank-badge');

  if (rank) {
    badgeContainer.style.display = 'flex';
    badge.textContent = rank;
    badge.className = `rank-badge rank-badge--${rank === 1 ? 'gold' : rank === 2 ? 'silver' : 'bronze'}`;
  } else {
    badgeContainer.style.display = 'none';
  }

  // Update selector buttons active state
  area.querySelectorAll('.rank-option').forEach(btn => {
    const btnRank = parseInt(btn.dataset.rank);
    btn.classList.toggle('rank-option--active', btnRank === rank);
  });

  // Update card visual treatment
  const card = area.closest('.place-card');
  if (card) {
    card.classList.remove('place-card--ranked', 'place-card--rank-1', 'place-card--rank-2', 'place-card--rank-3');
    if (rank) {
      card.classList.add('place-card--ranked', `place-card--rank-${rank}`);
    }

    // Set CSS order for sorting
    card.style.order = rank ? rank : '99';
  }
}

// Attach rank click handlers
export function attachRankListeners(container, tripId, trip) {
  container.querySelectorAll('.rank-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.dataset.slug;
      const rank = parseInt(btn.dataset.rank);

      // Find which category this place belongs to
      const card = btn.closest('.place-card');
      const categorySection = card.closest('.category-section');
      const categoryType = categorySection?.dataset.type;

      // Get places in this category
      const category = trip.categories.find(c => c.type === categoryType);
      if (category) {
        setRank(tripId, slug, rank, category.places);
      }
    });
  });
}
