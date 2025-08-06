// /features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers, createUser, updateUser, deleteUser } from './services/userService'

export const fetchUsers = createAsyncThunk('user/fetch', async () => {
  const res = await getUsers()
  return res.data
})

export const addUser = createAsyncThunk('user/add', async (data: any) => {
  const res = await createUser(data)
  return res.data
})

export const editUser = createAsyncThunk('user/edit', async ({ id, data }: any) => {
  const res = await updateUser(id, data)
  return res.data
})

export const removeUser = createAsyncThunk('user/delete', async (id: number) => {
  await deleteUser(id)
  return id
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addUser.fulfilled, (state:any, action) => {
        state.list.push(action.payload)
      })
      .addCase(editUser.fulfilled, (state:any, action:any) => {
        console.log("editUser payload:", action.payload);
        const idx = state.list.findIndex((u:any) => u.id === action.payload.id)
        if (idx !== -1) state.list[idx] = action.payload
      })
      .addCase(removeUser.fulfilled, (state:any, action:any) => {
        state.list = state.list.filter((u:any) => u.id !== action.payload)
      })
  },
})

export default userSlice.reducer
