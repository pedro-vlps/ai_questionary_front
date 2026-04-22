import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_API_URL || null;

export const fetchApi = async (endpoint, body = null, method = 'GET') => {
  if (!BASE_URL) {
    throw new Error('BASE_API_URL is not defined in environment variables');
  }
  
  const token = localStorage.getItem('token');
  const isLoginRequest = endpoint === 'login';
  
  try {
    const config = {
      method,
      url: `${BASE_URL}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add token to all requests except login
    if (token && !isLoginRequest) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      config.data = body;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error on ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

// Convenience methods
export const get = (endpoint) => fetchApi(endpoint, null, 'GET');
export const post = (endpoint, body) => fetchApi(endpoint, body, 'POST');
export const patch = (endpoint, body) => fetchApi(endpoint, body, 'PATCH');
export const put = (endpoint, body) => fetchApi(endpoint, body, 'PUT');
export const del = (endpoint) => fetchApi(endpoint, null, 'DELETE');
