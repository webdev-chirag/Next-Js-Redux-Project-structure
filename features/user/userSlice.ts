import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers, createUser, updateUser, deleteUser, getUserById } from './services/userService'
import { toast } from 'react-hot-toast'
import { createAppAsyncThunk } from '@/utils/createAppAsyncThunk'

export const fetchUsers = createAsyncThunk('user/fetch', async () => {
  const res = await getUsers()
  return res.data
})

export const addUser = createAppAsyncThunk(
  "user/add",
  async (data: any) => {
    const res = await createUser(data);
    return res.data;
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (id: number) => {
    const res = await getUserById(id);
    return res.data;
  }
);

export const editUser = createAppAsyncThunk(
  "user/edit",
  async ({ id, data }: any) => {
    const res = await updateUser(id, data);
    return res.data;
  }
);

export const removeUser = createAsyncThunk(
  'user/delete',
  async (id: number) => {
    await deleteUser(id)
    return id
  })

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    loading: false,
    error: null,
    validationErrors: {} as Record<string, string[]>
  },
  reducers: {
    clearValidationErrors: (state) => {
      state.validationErrors = {}
    }
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        toast.error(action.error.message || 'Failed to fetch users')
      })

    // Create
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.validationErrors = {}
      })
      .addCase(addUser.fulfilled, (state: any, action: any) => {
        state.loading = false
        state.list.push(action.payload)
        toast.success('User created successfully')
      })
      .addCase(addUser.rejected, (state: any, action: any) => {
        state.loading = false
        if (action.payload?.validation) {
          state.validationErrors = action.payload.validation
        } else {
          toast.error(action.payload?.message || 'Failed to create user')
        }
      });

    builder
      .addCase(fetchUserById.fulfilled, (state: any, action) => {
        const idx = state.list.findIndex((u: any) => u.id === action.payload.id);
        if (idx >= 0) {
          state.list[idx] = { ...state.list[idx], ...action.payload }; // merge extra details
        } else {
          state.list.push(action.payload);
        }
      });
    // Update
    builder
      .addCase(editUser.fulfilled, (state: any, action) => {
        const index = state.list.findIndex((u: any) => u.id === action.payload.id)
        if (index !== -1) state.list[index] = action.payload
        toast.success('User updated successfully')
      })
      .addCase(editUser.rejected, (state: any, action: any) => {
        if (action.payload?.validation) {
          state.validationErrors = action.payload.validation
        } else {
          toast.error(action.payload?.message || 'Failed to update user')
        }
      })

    // Delete
    builder
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u: any) => u.id !== action.payload)
        toast.success('User deleted successfully')
      })
  }
})

export const { clearValidationErrors } = userSlice.actions
export default userSlice.reducer
