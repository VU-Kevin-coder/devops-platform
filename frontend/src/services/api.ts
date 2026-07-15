import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000
})

export interface HealthResponse {
  status: string
  uptime: number
  environment: string
  timestamp: string
}

export interface StatusResponse {
  status: string
  service: string
  version: string
}

export async function fetchStatus() {
  try {
    const response = await api.get<StatusResponse>('/api/status')
    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error: 'Status service unavailable' }
  }
}

export async function fetchHealth() {
  try {
    const response = await api.get<HealthResponse>('/api/health')
    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error: 'Health endpoint unreachable' }
  }
}
