// ============================================================
// WEEKENDJE WEG — Main Application
// ============================================================

import L from 'leaflet';

// --- Trip Imports ---
import tilburg from './trips/tilburg.js';

// All trips (add new imports here)
const trips = [tilburg];

// --- State ---
let currentTrip = trips[0];
let map = null;
let currentMarkers = [];
let tileLayer = null;

// --- DOM Elements ---
const tabsContainer = document.getElementById('trip-tabs');
const contentContainer = document.getElementById('trip-content');

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
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
    // Gebruik de map-pin icon voor de tabbladen
    btn.innerHTML = `<i data-lucide="map-pin" style="width: 14px; height: 14px; stroke-width: 2.5"></i> ${trip.name}`;
    btn.onclick = () => selectTrip(trip.id);
    tabsContainer.appendChild(btn);
  });

  // Render lucide icons in tabs na het toevoegen
  if (window.lucide) {
    window.lucide.createIcons({
      root: tabsContainer,
      attrs: {
        'stroke-width': 2.5
      }
    });
  }
}

function selectTrip(tripId) {
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return;

  currentTrip = trip;
  renderTabs(); // Update active state
  renderTrip(trip);
}

function renderTrip(trip) {
  // Fade out effect
  contentContainer.style.opacity = '0';

  setTimeout(() => {
    // 1. Hero Banner
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

    // Render lucide icons in content
    if (window.lucide) {
      window.lucide.createIcons({
        root: contentContainer
      });
    }

    // Attach event listeners for accordions
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const section = e.currentTarget.closest('.category-section');
        section.classList.toggle('open');
      });
    });

    // Calculate sticky offset dynamically (top-bar + tabs height)
    const mapWrapper = document.getElementById('map-sticky-wrapper');
    const topBar = document.getElementById('top-bar');
    const tabs = document.getElementById('trip-tabs');
    if (mapWrapper && topBar && tabs) {
      const stickyOffset = topBar.offsetHeight + tabs.offsetHeight;
      mapWrapper.style.setProperty('--sticky-offset', `${stickyOffset}px`);
    }

    // Map collapse/expand toggle
    const mapToggle = document.getElementById('map-toggle');
    const mapBody = document.getElementById('map-sticky-body');

    if (mapToggle && mapWrapper) {
      mapToggle.addEventListener('click', () => {
        const isCollapsed = mapWrapper.classList.toggle('collapsed');
        // Invalidate map size when expanding
        if (!isCollapsed && map) {
          setTimeout(() => map.invalidateSize(), 350);
        }
      });
    }

    // Attach event listeners for "Bekijk op kaart" links
    document.querySelectorAll('.view-on-map').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat(e.currentTarget.dataset.lat);
        const lng = parseFloat(e.currentTarget.dataset.lng);
        const name = e.currentTarget.dataset.name;

        // Expand map if collapsed
        if (mapWrapper && mapWrapper.classList.contains('collapsed')) {
          mapWrapper.classList.remove('collapsed');
          if (map) {
            setTimeout(() => map.invalidateSize(), 350);
          }
        }

        // Scroll to map
        document.getElementById('map-sticky-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Open popup
        if (map) {
          setTimeout(() => {
            map.setView([lat, lng], 17, { animate: true });
            const marker = currentMarkers.find(m => m.options.title === name);
            if (marker) {
              setTimeout(() => marker.openPopup(), 500);
            }
          }, 400);
        }
      });
    });

    // Initialize map
    initMap(trip);

    // Fade in
    requestAnimationFrame(() => {
      contentContainer.style.opacity = '1';
    });
  }, 200);
}

function createCategoryHTML(category) {
  const placesHTML = category.places.map(place => {
    return `
      <article class="place-card ${place.isWildcard ? 'place-card-wildcard' : ''}" data-type="${category.type}">
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
            ${place.priceLevel ? `
            <div class="place-price" title="Prijsniveau: ${place.priceLevel} / 3">
               <span class="place-price-symbol ${place.priceLevel >= 1 ? 'place-price-symbol--active' : ''}">€</span>
               <span class="place-price-symbol ${place.priceLevel >= 2 ? 'place-price-symbol--active' : ''}">€</span>
               <span class="place-price-symbol ${place.priceLevel >= 3 ? 'place-price-symbol--active' : ''}">€</span>
            </div>
            ` : ''}
          </div>
          ${place.rating ? `
          <div class="place-rating" title="Google Maps: ${place.rating} / 5">
            <i data-lucide="star" class="place-rating-star"></i>
            <span class="place-rating-value">${place.rating}</span>
          </div>
          ` : ''}
          <p class="place-description">${place.description}</p>
          
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
          
          <div class="place-tags">
            ${place.tags.map(tag => `<span class="place-tag" data-type="${category.type}">${tag}</span>`).join('')}
          </div>

          ${place.reviews && place.reviews.length > 0 ? `
          <details class="place-reviews-accordion">
            <summary class="reviews-summary"><i data-lucide="message-square" style="width: 14px; height: 14px;"></i> Bekijk ${place.reviews.length} reviews</summary>
            <div class="reviews-content">
              ${place.reviews.map(r => `
                <div class="review-item">
                  <p class="review-text">"${r.text}"</p>
                  <span class="review-author">— ${r.author}</span>
                </div>
              `).join('')}
            </div>
          </details>
          ` : ''}

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
  }).join('');

  return `
    <section class="category-section open">
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
      </div>
    </section>
  `;
}

// --- Map Logic ---

function initMap(trip) {
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;

  // Cleanup old map if exists
  if (map) {
    map.remove();
    currentMarkers = [];
  }

  // Init map with Positron (Light/Warm) theme for Japandi look
  map = L.map('leaflet-map', {
    zoomControl: false, // We reposition it
    scrollWheelZoom: false, // Prevent accidental scrolling while reading
    dragging: !L.Browser.mobile, // Disable 1-finger drag on mobile
    tap: false // Disable tap handler to prevent touch issues
  }).setView(trip.mapCenter, trip.mapZoom);

  // Two-finger gesture handling for mobile
  if (L.Browser.mobile) {
    setupTwoFingerGesture(mapEl, map);
  }

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Group for bounds
  const group = L.featureGroup();

  trip.categories.forEach(category => {
    category.places.forEach(place => {
      // Create custom marker with Lucide icon
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
        title: place.name // For later querying
      });

      // Initialize lucide icons in popup when it opens
      marker.bindPopup(popupHtml).on('popupopen', (e) => {
        if (window.lucide) {
          window.lucide.createIcons({
            root: e.popup._contentNode
          });
        }
      });

      marker.addTo(group);
      currentMarkers.push(marker);
    });
  });

  group.addTo(map);

  // Re-create icons for the markers that were just added to the DOM
  if (window.lucide) {
    window.lucide.createIcons({
      root: document.getElementById('leaflet-map')
    });
  }

  // Fit bounds if there are markers
  if (currentMarkers.length > 0) {
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

// --- Two-finger gesture handling for mobile ---
function setupTwoFingerGesture(mapEl, mapInstance) {
  // Create overlay hint
  const overlay = document.createElement('div');
  overlay.className = 'map-gesture-overlay';
  overlay.textContent = 'Gebruik twee vingers om de kaart te bewegen';
  mapEl.parentElement.appendChild(overlay);

  let hideTimeout = null;

  mapEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      // Show hint on single finger touch
      overlay.classList.add('visible');
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => overlay.classList.remove('visible'), 1500);
    } else if (e.touches.length >= 2) {
      // Enable dragging for two-finger gesture
      overlay.classList.remove('visible');
      clearTimeout(hideTimeout);
      mapInstance.dragging.enable();
    }
  }, { passive: true });

  mapEl.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      // Disable dragging when less than 2 fingers
      setTimeout(() => mapInstance.dragging.disable(), 50);
    }
  }, { passive: true });
}
