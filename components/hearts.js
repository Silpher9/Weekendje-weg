// ============================================================
// HEARTS & REJECTS — Like/reject button rendering & Firestore sync
// ============================================================

import { getCurrentUser, getUsers, getPlaceData, toggleHeart, toggleReject, placeSlug } from '../store.js';

// Generate heart + reject HTML for a place card
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
      <button class="reject-btn" data-slug="${slug}" aria-label="Nee">
        <svg class="reject-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16.5 16.5 12 21l-7-7c-1.5-1.45-2-3.2-2-4.5a5.5 5.5 0 0 1 10-3.25A5.5 5.5 0 0 1 23 9.5c0 1.3-.5 3.05-2 4.5l-1 .96"></path>
          <line x1="2" y1="2" x2="22" y2="22"></line>
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

// Update heart + reject UI for a specific place
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

  // Update reject button
  const rejectBtn = document.querySelector(`.reject-btn[data-slug="${slug}"]`);
  if (rejectBtn) {
    const isRejected = data?.rejects?.[currentUser] === true;
    rejectBtn.classList.toggle('reject-btn--active', isRejected);
  }

  // Update avatar indicators
  users.forEach(user => {
    const avatar = document.querySelector(`.heart-avatar[data-slug="${slug}"][data-user="${user}"]`);
    if (avatar) {
      const liked = data?.hearts?.[user] === true;
      const rejected = data?.rejects?.[user] === true;
      avatar.classList.toggle('heart-avatar--liked', liked);
      avatar.classList.toggle('heart-avatar--rejected', rejected);
    }
  });
}

// Attach click handlers for all heart + reject buttons in a container
export function attachHeartListeners(container, tripId) {
  container.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.dataset.slug;
      toggleHeart(tripId, slug);
    });
  });

  container.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.dataset.slug;
      toggleReject(tripId, slug);
    });
  });
}
