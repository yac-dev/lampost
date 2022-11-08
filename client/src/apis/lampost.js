import axios from 'axios';
const lampostAPI = axios.create({
  baseURL: 'http://localhost:3500/api',
  // baseURL: 'http://192.168.11.17:3500/api',
  mode: 'cors',
});

export default lampostAPI;
