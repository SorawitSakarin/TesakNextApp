import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Request interceptor to add Authorization token to request
 */
axiosServices.interceptors.request.use(
  async (config) => {
    // get session by next-auth
    const session = await getSession();

    // add Authorization token to request
    if (session?.user.accessToken) {
      config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !window.location.href.includes('/login')
    ) {
      window.location.pathname = '/login';
    }

    return Promise.reject(
      (error.response && error.response.data) || 'Wrong Services',
    );
  },
);

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (
  args: string | [string, AxiosRequestConfig],
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
