import axios from 'axios';

const { VITE_PUBLIC_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_PUBLIC_API_URL,
  timeout: 10_000,
});

export default instance;
