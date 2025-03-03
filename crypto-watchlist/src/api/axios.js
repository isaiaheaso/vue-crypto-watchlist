import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://crypto-watchlist-api.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api; 