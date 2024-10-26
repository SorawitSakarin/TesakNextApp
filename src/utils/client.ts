import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { env } from 'next-runtime-env';

const axiosInstance = axios.create({
  timeout: 10 * 1000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = env('NEXT_PUBLIC_API_URL') as string;
    const session = await getSession();
    const accessToken = session?.user?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await signOut();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
