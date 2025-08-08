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
    const status = error?.response?.status || 500
    const message =
      error?.response?.data?.message || 'Something went wrong, please try again.'
    const errors = error?.response?.data?.errors || null // Laravel-style validation errors

    // ✅ Always throw the same shape
    throw {
      status,
      message,
      errors,
    }
  }
}
