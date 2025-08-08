// utils/handleFormSubmit.ts
import { AppDispatch } from "@/redux/store";
import { UseFormSetError } from "react-hook-form";

interface SubmitHandlerOptions<T> {
    action: (payload: T) => any; // Thunk action creator
    payload: T;
    dispatch: AppDispatch;
    setError: UseFormSetError<any>;
    onSuccess?: () => void; // Optional callback
}

export async function handleFormSubmit<T>({
    action,
    payload,
    dispatch,
    setError,
    onSuccess,
}: SubmitHandlerOptions<T>) {
    try {
        await dispatch(action(payload)).unwrap();

        // If provided, run the post-success callback (e.g., redirect or reset)
        onSuccess?.();
    } catch (err: any) {
        if (err?.status === 422 && err?.errors) {
            // Map backend validation errors into react-hook-form
            Object.entries(err.errors).forEach(([field, messages]) => {
                setError(field as any, {
                    type: "server",
                    message: (messages as string[])[0],
                });
            });
        }
        // Non-validation errors are already handled inside the slice via toast
    }
}
