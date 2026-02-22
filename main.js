// ============================================================
// WEEKENDJE WEG — Main Application
// ============================================================

import L from 'leaflet';

// --- Trip Imports ---
import tilburg from './trips/tilburg.js';

// All trips (add new imports here)
const trips = [tilburg];

// --- State ---
let activeTrip = trips[0];
let map = null;
let mapMarkers = [];

// --- Icons per category type ---
const categoryIcons = {
    hotel: '🏨',
    cocktail: '🍸',
    restaurant: '🍽️',
    culture: '🎬',
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    renderTrip(activeTrip);
});

// ============================================================
// TABS
// ============================================================

function renderTabs() {
    const tabsContainer = document.getElementById('trip-tabs');
    tabsContainer.innerHTML = '';

    trips.forEach((trip) => {
        const tab = document.createElement('button');
        tab.className = `trip-tab${trip.id === activeTrip.id ? ' active' : ''}`;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', trip.id === activeTrip.id);
        tab.id = `tab-${trip.id}`;
        tab.textContent = trip.name;

        tab.addEventListener('click', () => {
            if (trip.id === activeTrip.id) return;
            activeTrip = trip;
            renderTabs();
            renderTrip(trip);
        });

        tabsContainer.appendChild(tab);
    });

    // "Coming soon" indicator
    const comingSoon = document.createElement('span');
    comingSoon.className = 'trip-tab';
    comingSoon.style.opacity = '0.4';
    comingSoon.style.cursor = 'default';
    comingSoon.textContent = '+ Volgende trip';
    tabsContainer.appendChild(comingSoon);
}

// ============================================================
// TRIP RENDERING
// ============================================================

function renderTrip(trip) {
    const container = document.getElementById('trip-content');

    // Build HTML
    let html = '';

    // Hero Banner
    html += `
    <div class="hero">
      ${trip.banner
            ? `<img class="hero-image" src="${trip.banner}" alt="${trip.name}" />`
            : `<div class="hero-fallback">🏙️</div>`
        }
      <div class="hero-gradient"></div>
      <div class="hero-text">
        <h1 class="hero-title">${trip.name}</h1>
        <p class="hero-subtitle">${trip.subtitle}</p>
        <span class="hero-dates">📅 ${trip.dates}</span>
      </div>
    </div>
  `;

    // Categories
    trip.categories.forEach((cat, idx) => {
        html += `
      <section class="category-section open" data-category="${cat.type}" id="cat-${cat.type}">
        <div class="category-header" onclick="toggleCategory('${cat.type}')">
          <div class="category-header-left">
            <span class="category-icon">${cat.icon}</span>
            <span class="category-label" style="color: ${cat.color}">${cat.label}</span>
            <span class="category-count">${cat.places.length}</span>
          </div>
          <span class="category-chevron">▼</span>
        </div>
        <div class="category-divider"></div>
        <div class="category-places">
          ${cat.places
                .map(
                    (place) => `
            <article class="place-card" data-type="${cat.type}" id="place-${slugify(place.name)}">
              <h3 class="place-name">${place.name}</h3>
              <p class="place-description">${place.description}</p>
              <p class="place-address">
                <span class="place-address-icon">📍</span>
                <span>${place.address}</span>
              </p>
              <div class="place-tags">
                ${place.tags
                            .map(
                                (tag) =>
                                    `<span class="place-tag" data-type="${cat.type}">${tag}</span>`
                            )
                            .join('')}
              </div>
              ${place.link
                            ? `<a class="place-link" data-type="${cat.type}" href="${place.link}" target="_blank" rel="noopener noreferrer">
                       Website bezoeken →
                     </a>`
                            : ''
                        }
            </article>
          `
                )
                .join('')}
        </div>
      </section>
    `;
    });

    // Map section
    html += `
    <section class="map-section">
      <div class="map-section-header">
        <span>🗺️</span>
        <h2 class="map-section-title">Kaart van ${trip.name}</h2>
      </div>
      <div class="map-container" id="map"></div>
      <div class="map-legend">
        ${trip.categories
            .map(
                (cat) => `
          <div class="legend-item">
            <span class="legend-dot" style="background: ${cat.color}"></span>
            <span>${cat.icon} ${cat.label}</span>
          </div>
        `
            )
            .join('')}
      </div>
    </section>
    <div class="footer-spacer"></div>
  `;

    container.innerHTML = html;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Init map after DOM update
    requestAnimationFrame(() => {
        initMap(trip);
    });
}

// ============================================================
// CATEGORY TOGGLE
// ============================================================

window.toggleCategory = function (type) {
    const section = document.getElementById(`cat-${type}`);
    if (section) {
        section.classList.toggle('open');
    }
};

// ============================================================
// MAP
// ============================================================

function initMap(trip) {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    // Destroy previous map
    if (map) {
        map.remove();
        map = null;
    }

    // Create map
    map = L.map('map', {
        center: trip.mapCenter,
        zoom: trip.mapZoom,
        zoomControl: true,
        attributionControl: true,
    });

    // Dark tile layer
    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
        }
    ).addTo(map);

    // Add markers
    mapMarkers = [];

    trip.categories.forEach((cat) => {
        cat.places.forEach((place) => {
            if (!place.coords) return;

            // Custom icon
            const markerIcon = L.divIcon({
                className: 'custom-marker-wrapper',
                html: `
          <div class="custom-marker marker-${cat.type}">
            <span class="custom-marker-inner">${cat.icon}</span>
          </div>
        `,
                iconSize: [36, 42],
                iconAnchor: [18, 42],
                popupAnchor: [0, -42],
            });

            const marker = L.marker(place.coords, { icon: markerIcon }).addTo(map);

            marker.bindPopup(`
        <div class="popup-name" style="color: ${cat.color}">${place.name}</div>
        <div class="popup-category">${cat.icon} ${cat.label}</div>
        <div style="margin-top: 4px; font-size: 0.78rem; color: #9A9AB0;">${place.address}</div>
      `);

            // Click on card -> center map on marker
            const cardEl = document.getElementById(`place-${slugify(place.name)}`);
            if (cardEl) {
                cardEl.addEventListener('click', () => {
                    map.setView(place.coords, 16, { animate: true });
                    marker.openPopup();
                    mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            }

            mapMarkers.push(marker);
        });
    });

    // Fit bounds to all markers
    if (mapMarkers.length > 0) {
        const group = L.featureGroup(mapMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// ============================================================
// UTILS
// ============================================================

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
