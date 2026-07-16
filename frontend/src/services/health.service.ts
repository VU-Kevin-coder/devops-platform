import { api, type HealthResponse, getApiErrorMessage } from './api'

export async function fetchHealth(): Promise<{ data: HealthResponse | null; error: string | null }> {
  try {
    const response = await api.get<HealthResponse>('/api/health')
    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error: getApiErrorMessage(error) }
  }
}
