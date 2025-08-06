// features/auth/services/authService.ts
import { webApiCaller } from '@/utils/webApiCaller'

export const login = (data: any) =>
  webApiCaller('POST', '/auth/login', false, false, data)

export const register = (data: any) =>
  webApiCaller('POST', '/auth/register', false, false, data)

export const forgotPassword = (data: any) =>
  webApiCaller('POST', '/auth/forgot-password', false, false, data)

export const resetPassword = (data: any) =>
  webApiCaller('POST', '/auth/reset-password', false, false, data)
