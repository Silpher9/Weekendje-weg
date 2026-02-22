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

      <!-- Categories -->
      ${trip.categories.map(createCategoryHTML).join('')}

      <!-- Map Section -->
      <div class="map-section">
        <div class="map-section-header">
          <i data-lucide="map"></i>
          <h2 class="map-section-title">Kaart van ${trip.name}</h2>
        </div>
        <div id="leaflet-map" class="map-container"></div>
        <div class="map-legend">
          ${trip.categories.map(cat => `
            <div class="legend-item">
              <div class="legend-dot-wrapper" style="background: ${cat.color}20">
                <i data-lucide="${cat.icon}" style="color: ${cat.color}"></i>
              </div>
              <span>${cat.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
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

    // Attach event listeners for "Bekijk op kaart" links
    document.querySelectorAll('.view-on-map').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat(e.currentTarget.dataset.lat);
        const lng = parseFloat(e.currentTarget.dataset.lng);
        const name = e.currentTarget.dataset.name;

        // Scroll to map
        document.getElementById('leaflet-map').scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Open popup
        if (map) {
          map.setView([lat, lng], 17, { animate: true });
          const marker = currentMarkers.find(m => m.options.title === name);
          if (marker) {
            setTimeout(() => marker.openPopup(), 500); // Wait for pan
          }
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
    const slug = slugify(place.name);
    return `
      <article class="place-card" data-type="${category.type}">
        ${place.image ? `
        <div class="place-image-wrapper">
          <img src="${place.image}" alt="${place.name}" class="place-image" loading="lazy">
        </div>
        ` : ''}
        <div class="place-content">
          <h3 class="place-name">${place.name}</h3>
          <p class="place-description">${place.description}</p>
          
          <div class="place-address">
            <i data-lucide="map-pin" class="place-address-icon"></i>
            <span>${place.address}</span>
          </div>
          
          <div class="place-tags">
            ${place.tags.map(tag => `<span class="place-tag" data-type="${category.type}">${tag}</span>`).join('')}
          </div>

          <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
            ${place.link ? `
              <a href="${place.link}" target="_blank" rel="noopener noreferrer" class="place-link" data-type="${category.type}">
                <i data-lucide="external-link"></i> Website
              </a>
            ` : ''}
            <a href="#" class="place-link view-on-map" data-type="${category.type}" data-lat="${place.coords[0]}" data-lng="${place.coords[1]}" data-name="${place.name}">
              <i data-lucide="navigation"></i> Bekijk op kaart
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
        ${placesHTML}
      </div>
    </section>
  `;
}

// --- Map Logic ---

function initMap(trip) {
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl) return;

  // Maak globale L referentie veilig
  const L = window.L;
  if (!L) {
    console.error('Leaflet not loaded');
    return;
  }

  // Cleanup old map if exists
  if (map) {
    map.remove();
    currentMarkers = [];
  }

  // Init map with Positron (Light/Warm) theme for Japandi look
  map = L.map('leaflet-map', {
    zoomControl: false, // We reposition it
    scrollWheelZoom: false // Prevent accidental scrolling while reading
  }).setView(trip.mapCenter, trip.mapZoom);

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

// --- Utils ---
function slugify(text) {
  return text.toLowerCase().replace(/[\s\W-]+/g, '-');
}

// Ensure icon creation runs on initial load
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
