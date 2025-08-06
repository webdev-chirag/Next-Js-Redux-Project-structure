// /features/location/locationAPI.ts
import axios from '@/lib/axios'

export const getCountries = () => axios.get('/countries')
export const getStates = (countryId: number) => axios.get(`/states/${countryId}`)
