import axios from 'axios';
// import Constants from 'expo-constants';

const lampostAPI = axios.create({
  // baseURL: Constants.manifest.extra.baseURL,
  // baseURL: 'http://192.168.11.5:3500/api',
  baseURL: 'https://lampost-server-production.onrender.com/api',
  mode: 'cors',
});

export default lampostAPI;
