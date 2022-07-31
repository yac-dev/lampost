import axios from 'axios';
const lampostAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  mode: 'cors',
});

export default lampostAPI;
