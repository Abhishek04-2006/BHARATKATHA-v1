// src/services/api.js
const API_BASE = 'http://localhost:5000/api';

// Auth Token Helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('bharatkatha_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// --- AUTH APIS ---
export const register = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

// --- ORAL ROOTS APIS ---
export const fetchOralRoots = async () => {
  const res = await fetch(`${API_BASE}/oral-roots`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Could not fetch stories');
  return data;
};

export const submitOralRoot = async (storyData) => {
  const res = await fetch(`${API_BASE}/oral-roots`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(storyData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Could not submit story');
  return data;
};

export const toggleUpvote = async (storyId) => {
  const res = await fetch(`${API_BASE}/oral-roots/${storyId}/upvote`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upvote failed');
  return data;
}

// --- CHRONICLE STUDIO APIS ---
export const fetchChronicles = async () => {
  const res = await fetch(`${API_BASE}/chronicles`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch chronicles');
  return data;
};

export const saveChronicle = async (chronicleData) => {
  const res = await fetch(`${API_BASE}/chronicles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(chronicleData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to publish chronicle');
  return data;
};

export const toggleChronicleLike = async (chronicleId) => {
  const res = await fetch(`${API_BASE}/chronicles/${chronicleId}/like`, {
    method: 'PUT',
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to like chronicle');
  return data;
};

export const sendCharacterMessage = async (characterId, message, language = 'en') => {
  const res = await fetch(`${API_BASE}/characters/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ characterId, message, language })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Dialogue failed');
  return data;
};
// --- EXPLORER ACHIEVEMENT & RELIC SYNC ---
export const syncExplorerAchievement = async (relicId, pointsAwarded = 50) => {
  const res = await fetch(`${API_BASE}/auth/achievement`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ relicId, pointsAwarded })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Achievement sync failed');
  return data;
};
export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_BASE}/auth/leaderboard`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to load leaderboard');
  return data;
};

export const fetchTimelineInsight = async (eventData, language = 'en') => {
  const res = await fetch(`${API_BASE}/characters/timeline-insight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...eventData, language })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch event insight');
  return data;
};