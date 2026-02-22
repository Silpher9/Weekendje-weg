// ============================================================
// HEARTS — Like button rendering & Firestore sync
// ============================================================

import { getCurrentUser, getUsers, getPlaceData, toggleHeart, isMutualLike, placeSlug } from '../store.js';

// Generate heart HTML for a place card
export function heartHTML(place) {
  const slug = placeSlug(place.name);
  const users = getUsers();

  return `
    <div class="place-hearts" data-slug="${slug}">
      <button class="heart-btn" data-slug="${slug}" aria-label="Like">
        <svg class="heart-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <div class="heart-indicators">
        ${users.map(u => `
          <span class="heart-avatar" data-slug="${slug}" data-user="${u}" title="${u}">${u.charAt(0)}</span>
        `).join('')}
      </div>
    </div>
  `;
}

// Update heart UI for a specific place
export function updateHeartUI(slug) {
  const data = getPlaceData(slug);
  const currentUser = getCurrentUser();
  const users = getUsers();

  // Update heart button
  const btn = document.querySelector(`.heart-btn[data-slug="${slug}"]`);
  if (btn) {
    const isLiked = data?.hearts?.[currentUser] === true;
    btn.classList.toggle('heart-btn--active', isLiked);
  }

  // Update avatar indicators
  users.forEach(user => {
    const avatar = document.querySelector(`.heart-avatar[data-slug="${slug}"][data-user="${user}"]`);
    if (avatar) {
      const liked = data?.hearts?.[user] === true;
      avatar.classList.toggle('heart-avatar--liked', liked);
    }
  });
}

// Attach click handlers for all heart buttons in a container
export function attachHeartListeners(container, tripId) {
  container.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.dataset.slug;
      toggleHeart(tripId, slug);
    });
  });
}
