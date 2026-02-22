// ============================================================
// USER PICKER — "Wie ben je?" modal
// ============================================================

import { getCurrentUser, setCurrentUser, getUsers } from '../store.js';

export function showUserPicker() {
  return new Promise((resolve) => {
    const existing = getCurrentUser();
    if (existing) {
      updateTopBarBadge(existing);
      resolve(existing);
      return;
    }

    const users = getUsers();
    const overlay = document.createElement('div');
    overlay.className = 'user-picker-overlay';
    overlay.innerHTML = `
      <div class="user-picker-modal">
        <h2 class="user-picker-title">Wie ben je?</h2>
        <div class="user-picker-buttons">
          ${users.map(name => `
            <button class="user-picker-btn" data-user="${name}">
              <span class="user-avatar user-avatar--large">${name.charAt(0)}</span>
              <span class="user-picker-name">${name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger enter animation
    requestAnimationFrame(() => overlay.classList.add('visible'));

    overlay.querySelectorAll('.user-picker-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.user;
        setCurrentUser(name);
        updateTopBarBadge(name);

        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 300);

        resolve(name);
      });
    });
  });
}

export function updateTopBarBadge(name) {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) return;

  // Remove existing badge
  const existing = subtitle.querySelector('.current-user-badge');
  if (existing) existing.remove();

  const badge = document.createElement('span');
  badge.className = 'current-user-badge';
  badge.textContent = name.charAt(0);
  badge.title = name;
  subtitle.appendChild(badge);
}
