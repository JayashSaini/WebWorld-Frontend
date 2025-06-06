// Importing necessary modules and interfaces
import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/api";
import { formatDistanceToNow } from "date-fns";
import { jwtDecode } from "jwt-decode";

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = async (
  api: () => Promise<AxiosResponse<ApiResponse>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: ApiResponse) => void,
  onError: (error: string) => void
) => {
  // Show loading state if setLoading function is provided

  if (setLoading) {
    setLoading(true);
  }

  try {
    // Make the API request
    const response = await api();
    const { data } = response;

    if (data?.success) {
      // Call the onSuccess callback with the response data
      onSuccess(data);
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      const errorObject = error.response.data.errors[0];
      const [_, value] = Object.entries(errorObject)[0];
      onError(value as string);
    } else if (401 == error?.response.status || error?.response.status == 403) {
      LocalStorage.clear();
      if (isBrowser) window.location.href = "/auth/login"; // Redirect to login page
    } else {
      onError(error.response?.data?.message || "Something went wrong");
    }
  } finally {
    // Hide loading state if setLoading function is provided
    if (setLoading) setLoading(false);
  }
};

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get<T>(key: string): T | null {
    if (!isBrowser) return null;

    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (err) {
        return null;
      }
    }

    return null;
  }

  // Set a value in local storage by key
  static set(key: string, value: string) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

// Function for formatting the date
export const formatMongoDate = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `${formattedDate}`;
};

export function formatRelativeTime(mongoDate: string) {
  const date = new Date(mongoDate); // Convert MongoDB date string to JavaScript Date object
  return formatDistanceToNow(date, { addSuffix: true }); // Format the date relative to now
}

export const checkTokenExpiry = (token: string | null) => {
  if (!token) return true; // Consider expired if token is missing

  try {
    // Ensure the token is decoded and its expiration time is extracted
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Return true if the token has expired
    return decodedToken.exp < currentTime;
  } catch (error) {
    // If there's an error decoding the token, assume it's expired
    return true;
  }
};
