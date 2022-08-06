import axios from 'axios';
const lampostAPI = axios.create({
  baseURL: 'http://localhost:3500/api',
  mode: 'cors',
});

export default lampostAPI;
