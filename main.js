// ============================================================
// WEEKENDJE WEG — Main Application
// ============================================================

import L from 'leaflet';

// --- Trip Imports ---
import tilburg from './trips/tilburg.js';
import leeuwarden from './trips/leeuwarden.js';

// --- Interactive Feature Imports ---
import { showUserPicker } from './components/user-picker.js';
import { heartHTML, updateHeartUI, attachHeartListeners } from './components/hearts.js';
import { noteHTML, updateNoteUI, attachNoteListeners } from './components/notes.js';
import { rankHTML, updateRankUI, attachRankListeners } from './components/ranking.js';
import { subscribeToTrip, unsubscribeFromTrip, placeSlug, getAllPlaceData, getUserAddedPlaces, deleteUserPlace, isMutualReject } from './store.js';
import { renderAddPlaceFAB, removeAddPlaceFAB } from './components/add-place.js';

// All trips (add new imports here)
const trips = [tilburg, leeuwarden];

// --- State ---
let currentTrip = trips[0];
let map = null;
let currentMarkers = [];
let tileLayer = null;

// --- DOM Elements ---
const tabsContainer = document.getElementById('trip-tabs');
const contentContainer = document.getElementById('trip-content');

// --- Init ---
document.addEventListener('DOMContentLoaded', async () => {
  // Show user picker first, then render app
  await showUserPicker();

  renderTabs();
  renderTrip(currentTrip);

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ============================================================
// TABS
// ============================================================

function renderTabs() {
  if (!tabsContainer) return;
  tabsContainer.innerHTML = '';
  trips.forEach(trip => {
    const btn = document.createElement('button');
    btn.className = `trip-tab ${currentTrip?.id === trip.id ? 'active' : ''}`;
    btn.innerHTML = `<i data-lucide="map-pin" style="width: 14px; height: 14px; stroke-width: 2.5"></i> ${trip.name}`;
    btn.onclick = () => selectTrip(trip.id);
    tabsContainer.appendChild(btn);
  });

  if (window.lucide) {
    window.lucide.createIcons({
      root: tabsContainer,
      attrs: { 'stroke-width': 2.5 }
    });
  }
}

function selectTrip(tripId) {
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return;

  // Unsubscribe from old trip
  unsubscribeFromTrip();

  currentTrip = trip;
  renderTabs();
  renderTrip(trip);
}

function renderTrip(trip) {
  contentContainer.style.opacity = '0';

  setTimeout(() => {
    const html = `
      <div class="hero">
        ${trip.banner
        ? `<img src="${trip.banner}" alt="${trip.name}" class="hero-image" onerror="this.outerHTML='<div class=\\'hero-fallback\\'>${trip.name.charAt(0)}</div>'"/>`
        : `<div class="hero-fallback">${trip.name.charAt(0)}</div>`
      }
        <div class="hero-gradient"></div>
        <div class="hero-text">
          <h1 class="hero-title">${trip.name}</h1>
          <p class="hero-subtitle">${trip.subtitle}</p>
          ${trip.dates ? `<div class="hero-dates"><i data-lucide="calendar"></i> ${trip.dates}</div>` : ''}
        </div>
      </div>

      <!-- Sticky Map Section -->
      <div class="map-sticky-wrapper" id="map-sticky-wrapper">
        <div class="map-sticky-header" id="map-toggle">
          <div class="map-sticky-header-left">
            <i data-lucide="map"></i>
            <span class="map-sticky-title">Kaart van ${trip.name}</span>
          </div>
          <div class="map-sticky-header-right">
            <div class="map-legend-inline">
              ${trip.categories.map(cat => `
                <div class="legend-dot-wrapper legend-dot-wrapper--small" style="background: ${cat.color}20">
                  <i data-lucide="${cat.icon}" style="color: ${cat.color}"></i>
                </div>
              `).join('')}
            </div>
            <button class="map-collapse-btn" aria-label="Kaart in-/uitklappen">
              <i data-lucide="chevron-up" class="map-collapse-icon"></i>
            </button>
          </div>
        </div>
        <div class="map-sticky-body" id="map-sticky-body">
          <div id="leaflet-map" class="map-container"></div>
        </div>
      </div>

      <!-- Categories -->
      ${trip.categories.map(createCategoryHTML).join('')}

      <div class="footer-spacer"></div>
    `;

    contentContainer.innerHTML = html;

    if (window.lucide) {
      window.lucide.createIcons({ root: contentContainer });
    }

    // Attach category accordion listeners
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const section = e.currentTarget.closest('.category-section');
        section.classList.toggle('open');
      });
    });

    // Calculate sticky offset
    const mapWrapper = document.getElementById('map-sticky-wrapper');
    const topBar = document.getElementById('top-bar');
    const tabs = document.getElementById('trip-tabs');
    if (mapWrapper && topBar && tabs) {
      const stickyOffset = topBar.offsetHeight + tabs.offsetHeight;
      mapWrapper.style.setProperty('--sticky-offset', `${stickyOffset}px`);
    }

    // Map collapse/expand toggle
    const mapToggle = document.getElementById('map-toggle');
    if (mapToggle && mapWrapper) {
      mapToggle.addEventListener('click', () => {
        const isCollapsed = mapWrapper.classList.toggle('collapsed');
        if (!isCollapsed && map) {
          setTimeout(() => map.invalidateSize(), 350);
        }
      });
    }

    // "Bekijk op kaart" links
    document.querySelectorAll('.view-on-map').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat(e.currentTarget.dataset.lat);
        const lng = parseFloat(e.currentTarget.dataset.lng);
        const name = e.currentTarget.dataset.name;

        if (mapWrapper && mapWrapper.classList.contains('collapsed')) {
          mapWrapper.classList.remove('collapsed');
          if (map) setTimeout(() => map.invalidateSize(), 350);
        }

        document.getElementById('map-sticky-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (map) {
          setTimeout(() => {
            map.setView([lat, lng], 17, { animate: true });
            const marker = currentMarkers.find(m => m.options.title === name);
            if (marker) setTimeout(() => marker.openPopup(), 500);
          }, 400);
        }
      });
    });

    // --- Attach archive toggle listeners ---
    document.querySelectorAll('.archive-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.category-archive').classList.toggle('open');
      });
    });

    // --- Attach interactive feature listeners ---
    attachHeartListeners(contentContainer, trip.id);
    attachNoteListeners(contentContainer, trip.id);
    attachRankListeners(contentContainer, trip.id, trip);

    // Initialize map
    initMap(trip);

    // Render FAB button
    renderAddPlaceFAB(trip.id, trip.categories, trip.mapCenter);

    // Subscribe to Firestore for real-time updates
    subscribeToTrip(trip.id, (data) => {
      updateAllInteractiveUI(trip);
      renderUserAddedPlaces(trip);
      updateArchiveState(trip);
    });

    // Fade in
    requestAnimationFrame(() => {
      contentContainer.style.opacity = '1';
    });
  }, 200);
}

// --- Update all interactive UI from Firestore cache ---
function updateAllInteractiveUI(trip) {
  // Static places
  trip.categories.forEach(category => {
    category.places.forEach(place => {
      const slug = placeSlug(place.name);
      updateHeartUI(slug);
      updateNoteUI(slug);
      updateRankUI(slug);
    });
  });
  // User-added places
  getUserAddedPlaces().forEach(place => {
    updateHeartUI(place.slug);
    updateNoteUI(place.slug);
    updateRankUI(place.slug);
  });
}

// --- Archive state: move/restore cards on mutual reject ---
function updateArchiveState(trip) {
  document.querySelectorAll('.category-section').forEach(section => {
    const inner = section.querySelector('.category-places-inner');
    const archive = section.querySelector('.category-archive');
    const archivePlaces = section.querySelector('.archive-places');
    if (!inner || !archive || !archivePlaces) return;

    // Check all cards in this section (both in main and archive)
    const allCards = section.querySelectorAll('.place-card');
    let archiveCount = 0;

    allCards.forEach(card => {
      const slug = card.dataset.placeSlug;
      if (!slug) return;

      const rejected = isMutualReject(slug);

      if (rejected && !card.classList.contains('place-card--archived')) {
        // Move to archive
        card.classList.add('place-card--archived');
        archivePlaces.appendChild(card);
      } else if (!rejected && card.classList.contains('place-card--archived')) {
        // Restore from archive
        card.classList.remove('place-card--archived');
        inner.appendChild(card);
      }

      if (card.classList.contains('place-card--archived')) {
        archiveCount++;
      }
    });

    // Update archive visibility and count
    const countEl = archive.querySelector('.archive-count');
    if (countEl) countEl.textContent = archiveCount;
    archive.hidden = archiveCount === 0;

    // Update category count (visible cards only)
    const categoryType = section.dataset.type;
    const category = trip.categories.find(c => c.type === categoryType);
    const countHeader = section.querySelector('.category-count');
    if (countHeader && category) {
      const visibleStatic = inner.querySelectorAll(`.place-card:not([data-user-added])`).length;
      const visibleDynamic = inner.querySelectorAll(`.place-card[data-user-added]`).length;
      countHeader.textContent = visibleStatic + visibleDynamic;
    }
  });
}

// --- Render user-added places from Firestore ---
function renderUserAddedPlaces(trip) {
  const userPlaces = getUserAddedPlaces();

  // Track which user-added slugs are in cache
  const cacheSlugs = new Set(userPlaces.map(p => p.slug));

  // Remove cards for deleted user-added places
  document.querySelectorAll('.place-card[data-user-added]').forEach(card => {
    if (!cacheSlugs.has(card.dataset.placeSlug)) {
      removeMarkerByName(card.querySelector('.place-name')?.textContent?.trim());
      card.remove();
    }
  });

  userPlaces.forEach(place => {
    const slug = place.slug;
    const categoryType = place.categoryType;

    // Skip if already rendered
    if (document.querySelector(`.place-card[data-place-slug="${slug}"]`)) return;

    // Find the correct category section
    const section = document.querySelector(`.category-section[data-type="${categoryType}"]`);
    if (!section) return;

    const inner = section.querySelector('.category-places-inner');
    if (!inner) return;

    // Find category metadata
    const category = trip.categories.find(c => c.type === categoryType);
    if (!category) return;

    // Create card
    const wrapper = document.createElement('div');
    wrapper.innerHTML = createPlaceCardHTML(place, category, true);
    const card = wrapper.firstElementChild;
    inner.appendChild(card);

    if (window.lucide) {
      window.lucide.createIcons({ root: card });
    }

    // Attach interactive listeners
    attachHeartListeners(card, trip.id);
    attachNoteListeners(card, trip.id);
    attachRankListeners(card, trip.id, trip);

    // Attach delete button
    const deleteBtn = card.querySelector('.delete-place-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        if (!confirm('Weet je zeker dat je deze plek wilt verwijderen?')) return;
        removeMarkerByName(place.name);
        card.remove();
        await deleteUserPlace(trip.id, slug);
      });
    }

    // Attach "view on map" link
    card.querySelectorAll('.view-on-map').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat(e.currentTarget.dataset.lat);
        const lng = parseFloat(e.currentTarget.dataset.lng);
        const name = e.currentTarget.dataset.name;

        const mapWrapper = document.getElementById('map-sticky-wrapper');
        if (mapWrapper?.classList.contains('collapsed')) {
          mapWrapper.classList.remove('collapsed');
          if (map) setTimeout(() => map.invalidateSize(), 350);
        }

        mapWrapper?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (map) {
          setTimeout(() => {
            map.setView([lat, lng], 17, { animate: true });
            const marker = currentMarkers.find(m => m.options.title === name);
            if (marker) setTimeout(() => marker.openPopup(), 500);
          }, 400);
        }
      });
    });

    // Add map marker
    addDynamicMarker(place, category);

    // Update category count
    const countEl = section.querySelector('.category-count');
    if (countEl) {
      const staticCount = category.places.length;
      const dynamicCount = section.querySelectorAll('.place-card[data-user-added]').length;
      countEl.textContent = staticCount + dynamicCount;
    }
  });
}

// --- Dynamic map markers ---
function addDynamicMarker(place, category) {
  if (!map) return;

  // Don't add duplicate
  if (currentMarkers.find(m => m.options.title === place.name)) return;

  const markerHtml = `
    <div class="custom-marker marker-${category.type}">
      <div class="custom-marker-inner">
        <i data-lucide="${category.icon}"></i>
      </div>
    </div>
  `;

  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const popupHtml = `
    <div class="popup-content">
      <div class="popup-name">${place.name}</div>
      <div class="popup-category" style="color: ${category.color}">
        <i data-lucide="${category.icon}" style="width: 12px; height: 12px"></i>
        ${category.label}
      </div>
    </div>
  `;

  const marker = L.marker(place.coords, {
    icon: customIcon,
    title: place.name
  });

  marker.bindPopup(popupHtml).on('popupopen', (e) => {
    if (window.lucide) {
      window.lucide.createIcons({ root: e.popup._contentNode });
    }
  });

  marker.addTo(map);
  currentMarkers.push(marker);

  if (window.lucide) {
    window.lucide.createIcons({ root: document.getElementById('leaflet-map') });
  }
}

function removeMarkerByName(name) {
  if (!name) return;
  const idx = currentMarkers.findIndex(m => m.options.title === name);
  if (idx !== -1) {
    currentMarkers[idx].remove();
    currentMarkers.splice(idx, 1);
  }
}

function createPlaceCardHTML(place, category, isUserAdded = false) {
  const slug = placeSlug(place.name);
  const tags = place.tags || [];
  const reviews = place.reviews || [];

  return `
    <article class="place-card ${place.isWildcard ? 'place-card-wildcard' : ''}" data-type="${category.type}" data-place-slug="${slug}" ${isUserAdded ? 'data-user-added="true"' : ''}>
      ${isUserAdded ? `
      <button class="delete-place-btn" data-slug="${slug}" aria-label="Verwijder plek">
        <i data-lucide="trash-2"></i>
      </button>
      ` : ''}
      ${place.image ? `
      <div class="place-image-wrapper">
        <img src="${place.image}" alt="${place.name}" class="place-image" loading="lazy" onerror="this.outerHTML='<div class=\\'place-image-fallback\\'>${place.name.charAt(0)}</div>'">
      </div>
      ` : ''}
      <div class="place-content">
        <div class="place-header">
          <h3 class="place-name">
            ${place.isWildcard ? '<i data-lucide="star" class="wildcard-icon"></i> ' : ''}
            ${place.name}
          </h3>
          <div class="place-header-right">
            ${heartHTML(place)}
            ${place.priceLevel ? `
            <div class="place-price" title="Prijsniveau: ${place.priceLevel} / 3">
               <span class="place-price-symbol ${place.priceLevel >= 1 ? 'place-price-symbol--active' : ''}">€</span>
               <span class="place-price-symbol ${place.priceLevel >= 2 ? 'place-price-symbol--active' : ''}">€</span>
               <span class="place-price-symbol ${place.priceLevel >= 3 ? 'place-price-symbol--active' : ''}">€</span>
            </div>
            ` : ''}
          </div>
        </div>
        ${place.rating ? `
        <div class="place-rating" title="Google Maps: ${place.rating} / 5">
          <i data-lucide="star" class="place-rating-star"></i>
          <span class="place-rating-value">${place.rating}</span>
        </div>
        ` : ''}
        <p class="place-description">${place.description || ''}</p>

        <div class="place-address">
          <i data-lucide="map-pin" class="place-address-icon"></i>
          <span>${place.address}</span>
        </div>

        ${place.openingHours ? `
        <div class="place-hours">
          <i data-lucide="clock"></i>
          <span>${place.openingHours}</span>
        </div>
        ` : ''}

        ${tags.length > 0 ? `
        <div class="place-tags">
          ${tags.map(tag => `<span class="place-tag" data-type="${category.type}">${tag}</span>`).join('')}
        </div>
        ` : ''}

        ${reviews.length > 0 ? `
        <details class="place-reviews-accordion">
          <summary class="reviews-summary"><i data-lucide="message-square" style="width: 14px; height: 14px;"></i> Bekijk ${reviews.length} reviews</summary>
          <div class="reviews-content">
            ${reviews.map(r => `
              <div class="review-item">
                <p class="review-text">"${r.text}"</p>
                <span class="review-author">— ${r.author}</span>
              </div>
            `).join('')}
          </div>
        </details>
        ` : ''}

        ${noteHTML(place)}
        ${rankHTML(place)}

        <div class="place-actions">
          ${place.link ? `
            <a href="${place.link}" target="_blank" rel="noopener noreferrer" class="place-link" data-type="${category.type}">
              <i data-lucide="external-link"></i> Website
            </a>
          ` : ''}
          <a href="#" class="place-link view-on-map" data-type="${category.type}" data-lat="${place.coords[0]}" data-lng="${place.coords[1]}" data-name="${place.name}">
            <i data-lucide="navigation"></i> Bekijk op kaart
          </a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${place.coords[0]},${place.coords[1]}" target="_blank" rel="noopener noreferrer" class="place-link" data-type="${category.type}">
            <i data-lucide="route"></i> Route
          </a>
        </div>
      </div>
    </article>
  `;
}

function createCategoryHTML(category) {
  const placesHTML = category.places.map(place => createPlaceCardHTML(place, category, false)).join('');

  return `
    <section class="category-section open" data-type="${category.type}">
      <div class="category-header">
        <div class="category-header-left">
          <div class="category-icon-wrap" style="color: ${category.color}">
            <i data-lucide="${category.icon}"></i>
          </div>
          <h2 class="category-label">${category.label}</h2>
          <span class="category-count">${category.places.length}</span>
        </div>
        <i data-lucide="chevron-down" class="category-chevron"></i>
      </div>
      <div class="category-places">
        <div class="category-places-inner">
          ${placesHTML}
        </div>
        <div class="category-archive" hidden>
          <button class="archive-toggle">
            <i data-lucide="chevron-down" class="archive-chevron"></i>
            <span class="archive-label">Gearchiveerd (<span class="archive-count">0</span>)</span>
          </button>
          <div class="archive-places"></div>
        </div>
      </div>
    </section>
  `;
}

// --- Map Logic ---

function initMap(trip) {
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;

  if (map) {
    map.remove();
    currentMarkers = [];
  }

  map = L.map('leaflet-map', {
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
    tap: false
  }).setView(trip.mapCenter, trip.mapZoom);

  if (L.Browser.mobile) {
    setupTwoFingerGesture(mapEl, map);
  }

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  const group = L.featureGroup();

  trip.categories.forEach(category => {
    category.places.forEach(place => {
      const markerHtml = `
        <div class="custom-marker marker-${category.type}">
          <div class="custom-marker-inner">
            <i data-lucide="${category.icon}"></i>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const popupHtml = `
        <div class="popup-content">
          <div class="popup-name">${place.name}</div>
          <div class="popup-category" style="color: ${category.color}">
            <i data-lucide="${category.icon}" style="width: 12px; height: 12px"></i>
            ${category.label}
          </div>
        </div>
      `;

      const marker = L.marker(place.coords, {
        icon: customIcon,
        title: place.name
      });

      marker.bindPopup(popupHtml).on('popupopen', (e) => {
        if (window.lucide) {
          window.lucide.createIcons({ root: e.popup._contentNode });
        }
      });

      marker.addTo(group);
      currentMarkers.push(marker);
    });
  });

  group.addTo(map);

  if (window.lucide) {
    window.lucide.createIcons({ root: document.getElementById('leaflet-map') });
  }

  if (currentMarkers.length > 0) {
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

// --- Two-finger gesture handling for mobile ---
function setupTwoFingerGesture(mapEl, mapInstance) {
  const overlay = document.createElement('div');
  overlay.className = 'map-gesture-overlay';
  overlay.textContent = 'Gebruik twee vingers om de kaart te bewegen';
  mapEl.parentElement.appendChild(overlay);

  let hideTimeout = null;

  mapEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      overlay.classList.add('visible');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => overlay.classList.remove('visible'), 1500);
    } else if (e.touches.length >= 2) {
      overlay.classList.remove('visible');
      clearTimeout(hideTimeout);
      mapInstance.dragging.enable();
    }
  }, { passive: true });

  mapEl.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      setTimeout(() => mapInstance.dragging.disable(), 50);
    }
  }, { passive: true });
}
