import axios from 'axios';

// Automatically uses the .env URL, with a default fallback to your live Vercel backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://quetta-dry-fruit-backend.vercel.app';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;