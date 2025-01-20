import axios from 'axios';

const apikey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_API_URL;
const hash = import.meta.env.VITE_API_HASH;

const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    ts: 1,
    apikey,
    hash,
  };
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    try {
      return new Error(error.response.data.status);
    } catch (errorInternal) {
      console.log(errorInternal);
      return new Error('Network Error.');
    }
  },
);

export { API };

export * from './CharactersService';
