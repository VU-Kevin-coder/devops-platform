import axios from 'axios'

export interface HealthResponse {
  status: string
  uptime: number
  environment: string
  hostname?: string
  pid?: number
  timestamp: string
}

export interface StatusResponse {
  status: string
  service: string
  version: string
  environment: string
  hostname?: string
  pid?: number
  timestamp: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 5000
})

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message || 'Request failed'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Request failed'
}

export { api }
