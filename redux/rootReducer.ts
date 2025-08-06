import { combineReducers } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import locationSlice from '@/features/location/locationSlice'

const rootReducer = combineReducers({
  user: userSlice,
  location: locationSlice
})

export default rootReducer
