// /features/user/userService.ts
import { webApiCaller } from '@/utils/webApiCaller'

// All requests below assume you want Authorization header included
export const getUsers = () =>
  webApiCaller('GET', '/users', true)

export const createUser = (data: any) =>
  webApiCaller('POST', '/users', true, false, data)

export const updateUser = (id: number, data: any) =>
  webApiCaller('PUT', `/users/${id}`, true, false, data)

export const deleteUser = (id: number) =>
  webApiCaller('DELETE', `/users/${id}`, true)

export const getUserById = (id: number) =>
  webApiCaller('GET', `/users/${id}`, true)

