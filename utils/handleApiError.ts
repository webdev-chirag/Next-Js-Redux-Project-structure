// utils/handleApiError.ts
import toast from "react-hot-toast";

/**
 * Handles API errors in a consistent way.
 * Extracts message, logs it, and shows toast (optional).
 * 
 * @param error Error object (from Axios, Fetch, or native Error)
 * @param showToast Whether to show a toast notification (default: true)
 */
export function handleApiError(error: any, showToast: boolean = true): string {
    let message = "Something went wrong. Please try again.";

    if (error?.response?.data?.message) {
        message = error.response.data.message;
    } else if (error?.message) {
        message = error.message;
    } else if (typeof error === "string") {
        message = error;
    }

    // // Optional logging for debugging
    // console.error("API Error →", message, error);

    // Show toast centrally
    if (showToast) {
        toast.error(message);
    }

    return message;
}
