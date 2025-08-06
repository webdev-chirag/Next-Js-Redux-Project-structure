// features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from './services/authService'

export const loginUser = createAsyncThunk('auth/loginUser', async (data:any) => {
  const res = await login(data)
  return res
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state:any, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
