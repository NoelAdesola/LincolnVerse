// src/services/api.js
import axios from 'axios';

// Backend API service
const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Allows session-based authentication
});

// Authentication endpoints
export const registerUser = (userData) =>
  API.post('/auth/register', userData);
export const loginUser = (userData) =>
  API.post('/auth/login', userData);
export const logoutUser = () =>
  API.post('/auth/logout');

// Password reset
export const sendResetLink = (payload) =>
  API.post('/auth/password/forgot', payload);
export const resetPasswordConfirm = (payload) =>
  API.post('/auth/password/reset', payload);

// User profile endpoints
export const getUserProfile = () =>
  API.get('/user/profile');
export const updateUserProfile = (profileData) =>
  API.put('/user/profile', profileData);

// Favorites endpoints
export const getFavorites = () =>
  API.get('/favorites');
export const addFavorite = (media) =>
  API.post('/favorites', media);
export const removeFavorite = (id) =>
  API.delete(`/favorites/${id}`);

// Search history endpoints
export const saveSearch = (query, filters = {}) =>
  API.post('/search/save', { query, filters });
export const getRecentSearches = () =>
  API.get('/search/recent');
export const getSearchHistory = () =>
  API.get('/search/history');
export const deleteSearch = (id) =>
  API.delete(`/search/${id}`);

// Contact form endpoint
export const sendContactMessage = (payload) =>
  API.post('/contact', payload);

// Openverse API service (public media search)
const OPENVERSE_API = axios.create({
  baseURL: 'https://api.openverse.org/v1',
  headers: { Accept: 'application/json' },
});

// Openverse search & details
export const searchMedia = (
  query,
  mediaType = 'images',
  page = 1,
  perPage = 20,
  filters = {}
) => {
  const params = { q: query, page, page_size: perPage, ...filters };
  return OPENVERSE_API.get(`/${mediaType}/`, { params });
};
export const getMediaDetails = (mediaType, id) =>
  OPENVERSE_API.get(`/${mediaType}/${id}/`);

// Global auth error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Authentication error, please log in again.');
      // You could dispatch a logout action or redirect to /login here
    }
    return Promise.reject(error);
  }
);

export default API;
