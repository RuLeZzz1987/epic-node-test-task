import axios from 'axios';
import logger from './logger';

const instance = axios.create();

instance.interceptors.response.use(response => {
  logger.info({
    requestId: response.config.headers['Request-Id'],
    url: response.config.url,
    method: response.config.method,
    status: response.status
  });
  return response.data;
}, error => {
  logger.error({
    requestId: error.config.headers['Request-Id'],
    url: error.config.url,
    method: error.config.method,
    status: error.response.status
  });
  throw error;
});

export default instance;