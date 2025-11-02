import axios from 'axios'
import { CONFIG } from '@/shared/constants/config.constants'

// Axios instance for Payload CMS REST API
const axiosInstance = axios.create({
  baseURL: `${CONFIG.SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Payload API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    })
    return Promise.reject(error)
  }
)

// REST API client for client-side fetching
export const payloadAPI = {
  getCollection: async <T>(collection: string, params?: Record<string, any>) => {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
        }
      })
    }

    const url = `/${collection}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const { data } = await axiosInstance.get(url)
    return data.docs as T[]
  },

  getItem: async <T>(collection: string, id: string) => {
    const { data } = await axiosInstance.get(`/${collection}/${id}`)
    return data as T
  },

  getGlobal: async <T>(slug: string) => {
    const { data } = await axiosInstance.get(`/globals/${slug}`)
    return data as T
  },
}

export default payloadAPI
