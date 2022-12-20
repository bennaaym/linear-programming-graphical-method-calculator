import axios from 'axios';
import env from 'react-dotenv';

const apiClient = () =>
  axios.create({
    baseURL: env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });

export default apiClient;
