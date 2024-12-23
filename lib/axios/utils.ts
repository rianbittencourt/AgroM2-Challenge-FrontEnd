import { getSession } from 'next-auth/react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
});

export const getAuthToken = async () => {
  const session = await getSession(); 

  if (session && session.user.accessToken) {
    return session.user.accessToken; 
  }
  return null;
};


api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken(); 


    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    } else {
      console.warn('Token não encontrado.');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções reutilizáveis para chamadas específicas da API
export const harvestsAPI = {
  getAll: async () => {
    const response = await api.get('/harvests');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/harvests', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/harvests/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/harvests/${id}`);
    return response.data;
  },
};
