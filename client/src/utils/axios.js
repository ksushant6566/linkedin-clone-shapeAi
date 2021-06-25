import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('linkedinToken') || '';

const defaultOptions = {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

export let AxiosInstance = axios.create(defaultOptions);
