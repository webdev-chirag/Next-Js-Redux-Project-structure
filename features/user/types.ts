// features/user/types.ts
export interface User {
  id: number
  name: string
  email: string
  country_id: string
  state_id: string
  country?: { name: string }
  state?: { name: string }
}
