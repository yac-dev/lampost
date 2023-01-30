import axios from 'axios';
const lampostAPI = axios.create({
  // baseURL: 'http://localhost:3500/api',
  baseURL: 'http://192.168.11.5:3500/api',
  // baseURL: 'https://lampost-server-production.onrender.com/api',
  mode: 'cors',
});

export default lampostAPI;
