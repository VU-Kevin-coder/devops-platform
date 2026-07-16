import { api, type StatusResponse, getApiErrorMessage } from './api'

export async function fetchStatus(): Promise<{ data: StatusResponse | null; error: string | null }> {
  try {
    const response = await api.get<StatusResponse>('/api/status')
    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error: getApiErrorMessage(error) }
  }
}
