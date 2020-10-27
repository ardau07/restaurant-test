import axios from 'axios';
import { Service } from 'axios-middleware';

export const baseURL = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

const defaultHeaders = () => {
  const token = localStorage.getItem('token');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const service = new Service(axios);

service.register({
  onRequest(config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...defaultHeaders(),
      },
    };
  },
});

const INSTANCE = axios.create({
  baseURL,
});

const createAxiosResponseInterceptor = () => {
  const interceptor = INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      INSTANCE.interceptors.response.eject(interceptor);

      localStorage.clear();
      return Promise.reject(error);
    }
  );
};

createAxiosResponseInterceptor();

export default INSTANCE;
