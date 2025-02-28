import * as SecureStore from "expo-secure-store";
import { Platform, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import {toast} from "sonner-native"

const isAndroid = Platform.OS === "android";
const isIOS = Platform.OS === "ios";

const ACCESS_TOKEN_KEY = "token";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getAvatar(name: string) {
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

  return avatarUrl;
}

/**
/**
 * The function `getAuthToken` asynchronously retrieves an access token using SecureStore and handles
 * any errors that may occur.
 * @returns The `getAuthToken` function is returning the result of the
 * `SecureStore.getItemAsync(ACCESS_TOKEN_KEY)` call, which is the access token stored in the
 * SecureStore.
 */
export async function getAuthToken() {
  try {
    const result = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

    return result;
  } catch (e) {
    console.log("Failed to get token:", e);
  }
}

/**
 * The function setAuthToken asynchronously stores a token using SecureStore and handles any errors
 * that may occur.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * that will be stored securely using the `SecureStore.setItemAsync` function.
 */
export async function setAuthToken(token: string) {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  } catch (e) {
    console.log("Failed to store token:", e);
  }
}

/**
 * The function `clearAuthToken` clears the access token stored in SecureStore asynchronously.
 */
export async function clearAuthToken() {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, "");
  } catch (e) {
    console.log("Failed to delete token:", e);
  }
}

/**
 * The function `copyToClipboard` copies the provided text to the clipboard and displays a toast
 * notification confirming the action.
 * @param {string} text - The `text` parameter is a string that represents the content you want to copy
 * to the clipboard. In the provided function `copyToClipboard`, the `text` parameter is the content
 * that will be copied to the clipboard when the function is called.
 */
export async function copyToClipboard(text: string) {
  await Clipboard.setStringAsync(text);
  toast.success("Copied to clipboard");
}

/**
 * This function determines the time of day (morning, afternoon, or evening) based on the
 * current hour.
 * @returns The function `getDaySegment` returns a string indicating the time segment of the day based
 * on the current time. It returns "morning" if the current time is before 12 PM, "afternoon" if the
 * current time is between 12 PM and 6 PM, and "evening" if the current time is after 6 PM.
 */
export function getDaySegment() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "morning";
  } else if (hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}