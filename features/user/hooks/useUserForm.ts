// features/user/hooks/useUserForm.ts
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  fetchCountries,
  fetchStates,
} from '@/features/location/locationSlice'
import { RootState } from '@/redux/store'; // Path to store.ts

export const useUserForm = (initialData = null) => {
  const dispatch = useAppDispatch()
  const countries = useAppSelector((state: RootState) => state.location.countries);
  const states = useAppSelector((state: RootState) => state.location.states);
  
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    country_id: '',
    state_id: '',
  })

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  useEffect(() => {
    if (form.country_id) {
      dispatch(fetchStates(Number(form.country_id)))
    }
  }, [form.country_id])

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const resetForm = () => {
    setForm({ id: null, name: '', email: '', country_id: '', state_id: '' })
  }

  return { form, setForm, countries, states, resetForm }
}
