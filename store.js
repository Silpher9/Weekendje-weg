// ============================================================
// STORE — Firestore helpers & real-time sync
// ============================================================

import { db } from './firebase.js';
import {
  collection,
  doc,
  setDoc,
  deleteField,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

// --- Local cache (updated by onSnapshot) ---
let cache = {}; // { placeSlug: { hearts: {}, rank: null, notes: '' } }
let unsubscribe = null;

// --- User state ---
const STORAGE_KEY = 'weekendje-user';
const USERS = ['Ingmar', 'Marcia'];

export function getCurrentUser() {
  return localStorage.getItem(STORAGE_KEY);
}

export function setCurrentUser(name) {
  localStorage.setItem(STORAGE_KEY, name);
}

export function getUsers() {
  return USERS;
}

export function getOtherUser() {
  const current = getCurrentUser();
  return USERS.find(u => u !== current) || USERS[1];
}

// --- Place slug ---
export function placeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// --- Cache access ---
export function getPlaceData(slug) {
  return cache[slug] || null;
}

export function getAllPlaceData() {
  return cache;
}

// --- Real-time listener ---
export function subscribeToTrip(tripId, callback) {
  if (unsubscribe) unsubscribe();
  cache = {};

  const placesRef = collection(db, 'trips', tripId, 'places');
  unsubscribe = onSnapshot(placesRef, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        delete cache[change.doc.id];
      } else {
        cache[change.doc.id] = change.doc.data();
      }
    });
    callback(cache);
  });
}

export function unsubscribeFromTrip() {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  cache = {};
}

// --- Heart toggle ---
export async function toggleHeart(tripId, slug) {
  const user = getCurrentUser();
  if (!user) return;

  const ref = doc(db, 'trips', tripId, 'places', slug);
  const current = cache[slug]?.hearts?.[user];

  const update = {
    hearts: { [user]: current ? deleteField() : true }
  };

  // Remove reject if setting heart
  if (!current && cache[slug]?.rejects?.[user]) {
    update.rejects = { [user]: deleteField() };
  }

  await setDoc(ref, update, { merge: true });
}

// --- Reject toggle ---
export async function toggleReject(tripId, slug) {
  const user = getCurrentUser();
  if (!user) return;

  const ref = doc(db, 'trips', tripId, 'places', slug);
  const current = cache[slug]?.rejects?.[user];

  const update = {
    rejects: { [user]: current ? deleteField() : true }
  };

  // Remove heart if setting reject
  if (!current && cache[slug]?.hearts?.[user]) {
    update.hearts = { [user]: deleteField() };
  }

  await setDoc(ref, update, { merge: true });
}

// --- Check mutual like ---
export function isMutualLike(slug) {
  const data = cache[slug];
  if (!data?.hearts) return false;
  return USERS.every(u => data.hearts[u] === true);
}

// --- Check mutual reject ---
export function isMutualReject(slug) {
  const data = cache[slug];
  if (!data?.rejects) return false;
  return USERS.every(u => data.rejects[u] === true);
}

// --- Rank management ---
export function findPlaceWithRank(tripId, categoryPlaces, rank) {
  for (const place of categoryPlaces) {
    const slug = placeSlug(place.name);
    if (cache[slug]?.rank === rank) return slug;
  }
  return null;
}

export async function setRank(tripId, slug, rank, categoryPlaces) {
  // Clear existing place with this rank in same category
  const existing = findPlaceWithRank(tripId, categoryPlaces, rank);
  if (existing && existing !== slug) {
    const oldRef = doc(db, 'trips', tripId, 'places', existing);
    await setDoc(oldRef, { rank: deleteField() }, { merge: true });
  }

  const ref = doc(db, 'trips', tripId, 'places', slug);
  const currentRank = cache[slug]?.rank;

  if (currentRank === rank) {
    // Toggle off if clicking same rank
    await setDoc(ref, { rank: deleteField() }, { merge: true });
  } else {
    await setDoc(ref, { rank }, { merge: true });
  }
}

// --- User-added places ---
export function getUserAddedPlaces() {
  return Object.entries(cache)
    .filter(([, data]) => data.isUserAdded === true)
    .map(([slug, data]) => ({ slug, ...data }));
}

export async function saveUserPlace(tripId, placeData) {
  const slug = placeSlug(placeData.name);
  const ref = doc(db, 'trips', tripId, 'places', slug);
  await setDoc(ref, {
    ...placeData,
    addedBy: getCurrentUser(),
    addedAt: serverTimestamp(),
    hearts: {},
    isUserAdded: true
  });
  return slug;
}

export async function deleteUserPlace(tripId, slug) {
  const ref = doc(db, 'trips', tripId, 'places', slug);
  await deleteDoc(ref);
}

// --- Notes ---
export async function saveNote(tripId, slug, text) {
  const ref = doc(db, 'trips', tripId, 'places', slug);
  const trimmed = text.trim();
  await setDoc(ref, {
    notes: trimmed || deleteField()
  }, { merge: true });
}
