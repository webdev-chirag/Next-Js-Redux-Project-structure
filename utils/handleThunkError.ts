// A reusable error handler for Redux thunks
export const handleThunkError = (err: any, rejectWithValue: any) => {
    if (err?.status === 422) {
      return rejectWithValue({ validation: err.errors });
    }
    return rejectWithValue({ message: err.message || 'Something went wrong' });
  };
  