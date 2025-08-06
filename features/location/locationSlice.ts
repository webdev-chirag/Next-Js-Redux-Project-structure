// /features/location/locationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCountries, getStates } from './services/locationService'

export const fetchCountries = createAsyncThunk('location/fetchCountries', async () => {
  const res = await getCountries()
  return res.data
})

export const fetchStates = createAsyncThunk('location/fetchStates', async (countryId: number) => {
  const res = await getStates(countryId)
  return res.data
})

interface LocationState {
  countries: any[]; // Ideally, replace `any` with a `Country` type
  states: any[];    // Ideally, replace `any` with a `State` type
}

const initialState: LocationState = {
  countries: [],
  states: [],
};
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload
      })
  },
})

export default locationSlice.reducer
