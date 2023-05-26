import axios from 'axios';
// import Constants from 'expo-constants';

const lampostAPI = axios.create({
  // baseURL: Constants.manifest.extra.baseURL,
  baseURL: 'http://192.168.11.30:3500/api', // local
  // baseURL: 'https://lampost-server-production.onrender.com/api', // ver0
  // baseURL: 'https://lampost-backend-production.onrender.com/api', // ver1
  // baseURL: 'https://lampost-backend-api-production.onrender.com/api', // ver2

  mode: 'cors',
});

export default lampostAPI;
