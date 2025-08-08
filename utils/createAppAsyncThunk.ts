// utils/createAppAsyncThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleThunkError } from "./handleThunkError";

export function createAppAsyncThunk<Returned, ThunkArg>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>
) {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg);
      } catch (err) {
        return handleThunkError(err, rejectWithValue);
      }
    }
  );
}
