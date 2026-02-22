// ============================================================
// NOTES — Inline note editor & display
// ============================================================

import { getPlaceData, saveNote, placeSlug } from '../store.js';

// Generate note HTML for a place card
export function noteHTML(place) {
  const slug = placeSlug(place.name);

  return `
    <div class="place-notes" data-slug="${slug}">
      <div class="note-display" data-slug="${slug}" style="display: none;">
        <div class="note-display-inner">
          <svg class="note-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>
          </svg>
          <span class="note-text"></span>
          <button class="note-edit-btn" data-slug="${slug}" aria-label="Bewerk notitie">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            </svg>
          </button>
        </div>
      </div>
      <button class="note-add-btn" data-slug="${slug}">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Notitie
      </button>
      <div class="note-editor" data-slug="${slug}" style="display: none;">
        <textarea class="note-textarea" rows="2" placeholder="Schrijf een notitie..."></textarea>
        <div class="note-editor-actions">
          <button class="note-cancel-btn" data-slug="${slug}">Annuleer</button>
          <button class="note-save-btn" data-slug="${slug}">Opslaan</button>
        </div>
      </div>
    </div>
  `;
}

// Update note UI for a specific place
export function updateNoteUI(slug) {
  const data = getPlaceData(slug);
  const noteText = data?.notes || '';
  const container = document.querySelector(`.place-notes[data-slug="${slug}"]`);
  if (!container) return;

  const display = container.querySelector('.note-display');
  const addBtn = container.querySelector('.note-add-btn');
  const editor = container.querySelector('.note-editor');
  const textSpan = container.querySelector('.note-text');

  // Only update if editor is not currently open
  if (editor.style.display === 'flex') return;

  if (noteText) {
    textSpan.textContent = noteText;
    display.style.display = 'block';
    addBtn.style.display = 'none';
  } else {
    display.style.display = 'none';
    addBtn.style.display = 'flex';
  }
}

// Attach note event listeners
export function attachNoteListeners(container, tripId) {
  // Add button -> open editor
  container.querySelectorAll('.note-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.slug;
      openNoteEditor(slug, '');
    });
  });

  // Edit button -> open editor with current text
  container.querySelectorAll('.note-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.slug;
      const data = getPlaceData(slug);
      openNoteEditor(slug, data?.notes || '');
    });
  });

  // Save button
  container.querySelectorAll('.note-save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.slug;
      const noteContainer = document.querySelector(`.place-notes[data-slug="${slug}"]`);
      const textarea = noteContainer.querySelector('.note-textarea');
      saveNote(tripId, slug, textarea.value);
      closeNoteEditor(slug);
    });
  });

  // Cancel button
  container.querySelectorAll('.note-cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeNoteEditor(btn.dataset.slug);
    });
  });
}

function openNoteEditor(slug, currentText) {
  const container = document.querySelector(`.place-notes[data-slug="${slug}"]`);
  if (!container) return;

  const display = container.querySelector('.note-display');
  const addBtn = container.querySelector('.note-add-btn');
  const editor = container.querySelector('.note-editor');
  const textarea = container.querySelector('.note-textarea');

  display.style.display = 'none';
  addBtn.style.display = 'none';
  editor.style.display = 'flex';
  textarea.value = currentText;
  textarea.focus();
}

function closeNoteEditor(slug) {
  const container = document.querySelector(`.place-notes[data-slug="${slug}"]`);
  if (!container) return;

  const editor = container.querySelector('.note-editor');
  editor.style.display = 'none';

  // Let updateNoteUI handle showing the right state
  updateNoteUI(slug);
}
