// ============================================================
// ADD PLACE — Google Places search + Firestore save
// ============================================================

import { saveUserPlace, deleteUserPlace, placeSlug } from '../store.js';

// --- Category auto-detection from Google Places types ---
const TYPE_MAP = {
  hotel: ['lodging', 'hotel', 'resort_hotel'],
  cocktail: ['bar', 'night_club'],
  restaurant: ['restaurant', 'cafe', 'bakery', 'food', 'meal_delivery', 'meal_takeaway'],
  culture: ['museum', 'art_gallery', 'tourist_attraction', 'park', 'church', 'library', 'stadium', 'amusement_park']
};

function detectCategory(googleTypes = []) {
  for (const [category, types] of Object.entries(TYPE_MAP)) {
    if (googleTypes.some(t => types.includes(t))) return category;
  }
  return 'culture';
}

// --- Generate readable tags from Google types ---
const TYPE_LABELS = {
  lodging: 'hotel', hotel: 'hotel', resort_hotel: 'resort',
  bar: 'bar', night_club: 'nachtclub',
  restaurant: 'restaurant', cafe: 'café', bakery: 'bakkerij', food: 'eten',
  museum: 'museum', art_gallery: 'galerie', tourist_attraction: 'attractie',
  park: 'park', church: 'kerk', library: 'bibliotheek',
  spa: 'spa', gym: 'gym', shopping_mall: 'shopping',
  movie_theater: 'bioscoop', bowling_alley: 'bowling',
  point_of_interest: 'bezienswaardigheid', establishment: null,
  political: null, locality: null, route: null
};

function generateTags(googleTypes = []) {
  return googleTypes
    .map(t => TYPE_LABELS[t])
    .filter(label => label != null)
    .filter((v, i, a) => a.indexOf(v) === i) // unique
    .slice(0, 4);
}

// --- FAB button ---
export function renderAddPlaceFAB(tripId, categories, mapCenter) {
  document.querySelector('.add-place-fab')?.remove();

  const fab = document.createElement('button');
  fab.className = 'add-place-fab';
  fab.innerHTML = '<i data-lucide="plus"></i>';
  fab.setAttribute('aria-label', 'Plaats toevoegen');
  fab.addEventListener('click', () => showAddPlaceModal(tripId, categories, mapCenter));
  document.body.appendChild(fab);

  if (window.lucide) {
    window.lucide.createIcons({ root: fab });
  }
}

export function removeAddPlaceFAB() {
  document.querySelector('.add-place-fab')?.remove();
}

// --- Modal ---
let autocompleteInstance = null;

function showAddPlaceModal(tripId, categories, mapCenter) {
  // Prevent duplicates
  document.querySelector('.add-place-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'add-place-overlay';
  overlay.innerHTML = `
    <div class="add-place-modal">
      <div class="add-place-modal-header">
        <h2 class="add-place-modal-title">Plaats toevoegen</h2>
        <button class="add-place-close-btn" aria-label="Sluiten">
          <i data-lucide="x"></i>
        </button>
      </div>

      <!-- Step 1: Search -->
      <div class="add-place-step add-place-step-search" data-step="search">
        <div class="add-place-search-wrapper">
          <input type="text" class="add-place-search" placeholder="Zoek een plek..." autocomplete="off" />
        </div>
        <p class="add-place-hint">Zoek op naam, bijv. "De Pont Museum" of "Bar Bistro Bunk"</p>
      </div>

      <!-- Step 2: Confirm (hidden initially) -->
      <div class="add-place-step add-place-step-confirm" data-step="confirm" style="display: none;">
        <div class="add-place-preview"></div>

        <label class="add-place-field-label">Categorie</label>
        <div class="add-place-categories"></div>

        <label class="add-place-field-label">Beschrijving <span class="add-place-optional">(optioneel)</span></label>
        <textarea class="add-place-description" placeholder="Korte beschrijving..." rows="2"></textarea>

        <div class="add-place-actions">
          <button class="add-place-back-btn">
            <i data-lucide="arrow-left"></i> Terug
          </button>
          <button class="add-place-confirm-btn">Toevoegen</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  if (window.lucide) {
    window.lucide.createIcons({ root: overlay });
  }

  // Animate in
  requestAnimationFrame(() => overlay.classList.add('visible'));

  // Close handlers
  const closeBtn = overlay.querySelector('.add-place-close-btn');
  closeBtn.addEventListener('click', () => closeModal(overlay));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  // Category pills
  const categoriesContainer = overlay.querySelector('.add-place-categories');
  categories.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = 'add-place-category-pill';
    pill.dataset.type = cat.type;
    pill.style.setProperty('--pill-color', cat.color);
    pill.innerHTML = `<i data-lucide="${cat.icon}" style="width: 14px; height: 14px;"></i> ${cat.label}`;
    categoriesContainer.appendChild(pill);
  });

  if (window.lucide) {
    window.lucide.createIcons({ root: categoriesContainer });
  }

  // Category pill selection
  let selectedCategory = null;
  categoriesContainer.addEventListener('click', (e) => {
    const pill = e.target.closest('.add-place-category-pill');
    if (!pill) return;
    categoriesContainer.querySelectorAll('.add-place-category-pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    selectedCategory = pill.dataset.type;
  });

  // Google Places Autocomplete
  const searchInput = overlay.querySelector('.add-place-search');
  let selectedPlaceData = null;

  initAutocomplete(searchInput, mapCenter, categories, (placeData) => {
    selectedPlaceData = placeData;
    selectedCategory = placeData.categoryType;
    showConfirmStep(overlay, placeData, categories);
  });

  // Back button
  overlay.querySelector('.add-place-back-btn').addEventListener('click', () => {
    overlay.querySelector('[data-step="confirm"]').style.display = 'none';
    overlay.querySelector('[data-step="search"]').style.display = '';
    // Clear autocomplete element value
    const acEl = overlay.querySelector('gmp-place-autocomplete');
    if (acEl) acEl.value = '';
    selectedPlaceData = null;
  });

  // Confirm button
  overlay.querySelector('.add-place-confirm-btn').addEventListener('click', async () => {
    const confirmBtn = overlay.querySelector('.add-place-confirm-btn');

    if (!selectedPlaceData) {
      console.warn('Add place: no place data selected');
      return;
    }
    if (!selectedCategory) {
      // Auto-fallback to detected category or first available
      selectedCategory = selectedPlaceData.categoryType || categories[0]?.type;
      if (!selectedCategory) {
        console.warn('Add place: no category selected');
        return;
      }
    }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Bezig...';

    const description = overlay.querySelector('.add-place-description').value.trim();

    // Build clean data object for Firestore (avoid non-serializable values)
    const dataToSave = {
      name: selectedPlaceData.name || '',
      description: description || selectedPlaceData.name || '',
      address: selectedPlaceData.address || '',
      coords: selectedPlaceData.coords || [0, 0],
      link: selectedPlaceData.link || '',
      rating: selectedPlaceData.rating || null,
      priceLevel: selectedPlaceData.priceLevel || null,
      openingHours: selectedPlaceData.openingHours || null,
      image: selectedPlaceData.image || null,
      tags: selectedPlaceData.tags || [],
      reviews: selectedPlaceData.reviews || [],
      isWildcard: false,
      categoryType: selectedCategory,
      googlePlaceId: selectedPlaceData.googlePlaceId || null
    };

    try {
      await saveUserPlace(tripId, dataToSave);
      closeModal(overlay);
    } catch (err) {
      console.error('Error saving place:', err);
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Toevoegen';
      alert('Opslaan mislukt: ' + (err.message || 'Onbekende fout'));
    }
  });

  // Focus search input
  setTimeout(() => searchInput.focus(), 350);
}

function initAutocomplete(inputEl, mapCenter, categories, onSelect) {
  if (!window.google?.maps?.places) {
    console.warn('Google Places API not loaded');
    inputEl.placeholder = 'Google Places API niet geladen...';
    inputEl.disabled = true;
    return;
  }

  // Use new PlaceAutocompleteElement API (replaces deprecated Autocomplete)
  const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({
    locationBias: mapCenter
      ? { center: { lat: mapCenter[0], lng: mapCenter[1] }, radius: 15000 }
      : undefined,
  });

  // Style the element to fit our design
  placeAutocomplete.style.width = '100%';
  placeAutocomplete.style.position = 'relative';

  // Replace the input with the autocomplete element
  const wrapper = inputEl.closest('.add-place-search-wrapper');
  const searchIcon = wrapper.querySelector('.add-place-search-icon');
  if (searchIcon) searchIcon.remove(); // Element has its own icon
  inputEl.replaceWith(placeAutocomplete);

  // Listen for place selection (new API uses 'gmp-select' event)
  placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
    const place = placePrediction.toPlace();

    try {
      // Fetch full place details
      await place.fetchFields({
        fields: [
          'displayName', 'formattedAddress', 'location', 'types',
          'photos', 'rating', 'priceLevel', 'regularOpeningHours',
          'websiteURI', 'googleMapsURI', 'reviews', 'id'
        ]
      });

      console.log('Place data received:', {
        name: place.displayName,
        hasPhotos: !!place.photos?.length,
        rating: place.rating,
        hasReviews: !!place.reviews?.length,
        types: place.types,
        priceLevel: place.priceLevel
      });

      onSelect(buildPlaceData(place));
    } catch (err) {
      console.error('Failed to fetch place details:', err);
      // Use whatever data we have
      onSelect({
        name: place.displayName || 'Onbekende plek',
        address: place.formattedAddress || '',
        coords: place.location ? [place.location.lat(), place.location.lng()] : [0, 0],
        link: '', rating: null, priceLevel: null, openingHours: null,
        image: null, tags: [], reviews: [], isWildcard: false,
        categoryType: 'culture', googlePlaceId: place.id || null
      });
    }
  });

  autocompleteInstance = placeAutocomplete;
}

function buildPlaceData(place) {
  const loc = place.location;

  // Get photo URI (new API uses getURI() method)
  let imageUrl = null;
  if (place.photos?.length > 0) {
    try {
      imageUrl = place.photos[0].getURI({ maxWidth: 800 });
    } catch {
      imageUrl = null;
    }
  }

  // Map price level enum to number (new API uses PRICE_LEVEL_ prefix)
  const priceLevelMap = {
    'PRICE_LEVEL_FREE': 0, 'PRICE_LEVEL_INEXPENSIVE': 1, 'PRICE_LEVEL_MODERATE': 2,
    'PRICE_LEVEL_EXPENSIVE': 3, 'PRICE_LEVEL_VERY_EXPENSIVE': 3,
    // Fallback for legacy values
    'FREE': 0, 'INEXPENSIVE': 1, 'MODERATE': 2, 'EXPENSIVE': 3, 'VERY_EXPENSIVE': 3
  };
  const priceLevel = place.priceLevel != null
    ? (priceLevelMap[place.priceLevel] ?? (typeof place.priceLevel === 'number' ? place.priceLevel : null))
    : null;

  // Opening hours
  let openingHours = null;
  if (place.regularOpeningHours?.weekdayDescriptions) {
    openingHours = place.regularOpeningHours.weekdayDescriptions.join(' | ');
  }

  // Reviews (new API format)
  const reviews = (place.reviews || []).slice(0, 3).map(r => ({
    text: (r.text?.text || r.text || '').substring(0, 200),
    author: r.authorAttribution?.displayName || 'Anoniem'
  }));

  // Types in new API
  const types = place.types || [];

  return {
    name: place.displayName || '',
    address: place.formattedAddress || '',
    coords: loc ? [loc.lat(), loc.lng()] : [0, 0],
    link: place.websiteURI || place.googleMapsURI || '',
    rating: place.rating || null,
    priceLevel: priceLevel,
    openingHours: openingHours,
    image: imageUrl,
    tags: generateTags(types),
    reviews: reviews,
    isWildcard: false,
    categoryType: detectCategory(types),
    googlePlaceId: place.id || null
  };
}

function showConfirmStep(overlay, placeData, categories) {
  // Hide search, show confirm
  overlay.querySelector('[data-step="search"]').style.display = 'none';
  overlay.querySelector('[data-step="confirm"]').style.display = '';

  // Build preview
  const preview = overlay.querySelector('.add-place-preview');
  preview.innerHTML = `
    ${placeData.image ? `<img src="${placeData.image}" alt="${placeData.name}" class="add-place-preview-image" />` : ''}
    <h3 class="add-place-preview-name">${placeData.name}</h3>
    <div class="add-place-preview-address">
      <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i>
      ${placeData.address}
    </div>
    ${placeData.rating ? `
    <div class="add-place-preview-rating">
      <i data-lucide="star" style="width: 14px; height: 14px;"></i>
      ${placeData.rating} / 5
    </div>
    ` : ''}
    ${placeData.priceLevel ? `
    <div class="add-place-preview-price">
      ${'€'.repeat(placeData.priceLevel)}
    </div>
    ` : ''}
  `;

  if (window.lucide) {
    window.lucide.createIcons({ root: preview });
  }

  // Pre-select detected category
  const pills = overlay.querySelectorAll('.add-place-category-pill');
  pills.forEach(pill => {
    pill.classList.toggle('selected', pill.dataset.type === placeData.categoryType);
  });
}

function closeModal(overlay) {
  overlay.classList.remove('visible');
  autocompleteInstance = null;
  setTimeout(() => overlay.remove(), 300);
}

export { deleteUserPlace };
