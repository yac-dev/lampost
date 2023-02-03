import Constants from 'expo-constants';

const ENVIRONMENT_VARIABLES = {
  development: {
    baseURL: 'http://192.168.11.5:3500/api',
  },
  staging: {
    baseURL: '[your.staging.api.here]',
  },
  production: {
    baseURL: 'https://lampost-server-production.onrender.com/api',
  },
};

// Constants.expoConfig
const getEnvironmentVariables = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    // console.log('now in development');
    console.log(Constants);
    return ENVIRONMENT_VARIABLES.development;
  } else if (env === 'staging') {
    return ENVIRONMENT_VARIABLES.staging;
  } else if (env === 'prod') {
    console.log('now in Production');
    return ENVIRONMENT_VARIABLES.production;
  }
};

export default getEnvironmentVariables;
