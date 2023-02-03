const getEnvironmentVariables = ({ config }) => {
  switch (process.env.RNENV) {
    case 'development':
      return {
        ...config,
        extra: { baseURL: 'http://192.168.11.5:3500/api', socketEndpoint: 'http://192.168.11.5:3500' },
      };
    case 'staging':
      return { ...config, extra: { baseURL: 'staging.com' } };
    case 'production':
      return {
        ...config,
        extra: {
          baseURL: 'https://lampost-server-production.onrender.com/api',
          socketEndpoint: 'https://lampost-server-production.onrender.com',
        },
      };
  }
};

export default getEnvironmentVariables;
