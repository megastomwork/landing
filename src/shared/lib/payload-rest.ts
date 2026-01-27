import axios from 'axios';
import { CONFIG } from '@/shared/constants/client-config.constants';

// Axios instance for Payload CMS REST API
const axiosInstance = axios.create({
  baseURL: `${CONFIG.SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Payload API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

// REST API client for client-side fetching
export const payloadAPI = {
  /**
   * Fetches a collection from Payload CMS
   * @template T - The type of the collection items
   * @param collection - The name of the collection to fetch
   * @param params - Query parameters (filters, sorting, etc.). Default limit is 1000 records
   * @returns Array of collection items
   */
  getCollection: async <T>(
    collection: string,
    params?: Record<string, unknown>,
  ) => {
    const queryParams = new URLSearchParams();

    // Set default limit to 1000 if not specified
    const finalParams = {
      limit: 1000,
      ...params,
    };

    if (finalParams) {
      Object.entries(finalParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : String(value),
          );
        }
      });
    }

    const url = `/${collection}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const { data } = await axiosInstance.get(url);
    return data.docs as T[];
  },

  getCollectionWithPagination: async <T>(
    collection: string,
    params?: Record<string, unknown>,
  ) => {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : String(value),
          );
        }
      });
    }

    const url = `/${collection}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const { data } = await axiosInstance.get(url);
    return {
      docs: data.docs as T[],
      totalDocs: data.totalDocs as number,
      totalPages: data.totalPages as number,
      page: data.page as number,
      limit: data.limit as number,
      hasNextPage: data.hasNextPage as boolean,
      hasPrevPage: data.hasPrevPage as boolean,
    };
  },

  getItem: async <T>(collection: string, id: string) => {
    const { data } = await axiosInstance.get(`/${collection}/${id}`);
    return data as T;
  },

  getGlobal: async <T>(slug: string) => {
    const { data } = await axiosInstance.get(`/globals/${slug}`);
    return data as T;
  },
};

export default payloadAPI;
