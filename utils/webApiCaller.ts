// utils/webApiCaller.ts
import axios from '@/lib/axios'

export async function webApiCaller(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  route: string,
  authorization: boolean = false,
  isMultipart: boolean = false,
  body: any = undefined
) {
  const headers: Record<string, string> = {}

  if (authorization) {
    const token = localStorage.getItem('token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  if (isMultipart) {
    headers['Content-Type'] = 'multipart/form-data'
  } else if (body && typeof body === 'object') {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await axios({
      method,
      url: route,
      headers,
      data: body,
    })
    return response.data
  } catch (error: any) {
    throw error?.response?.data || error.message
  }
}
