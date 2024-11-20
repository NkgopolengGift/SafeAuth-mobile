import axios from "axios";
import { Alert } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// Generate a strong password
export const generateStrongPassword = async (
  length: string,
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSpecial: boolean
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/passwords/generate-strong-password`,
      {
        params: { length, includeUppercase, includeNumbers, includeSpecial },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error generating strong password:", error);
    throw error;
  }
};

// Fetch passwords by userID
export const fetchPasswordsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/passwords/${userId}`);
    if (!response.data || response.data.length === 0) {
      throw new Error("No passwords found for this user.");
    }
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching passwords:", error);
    throw error;
  }
};

// Create a new password
export const createPassword = async (passwordRequest: {
  userId: string;
  serviceName: string;
  serviceWebsite: string;
  serviceEmail: string;
  serviceUsername: string;
  servicePassword: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/passwords`,
      passwordRequest
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error creating password:", error);
    throw error;
  }
};

// Update an existing password
export const updatePassword = async (
  passwordId: string,
  passwordRequest: {
    serviceName: string;
    serviceWebsite: string;
    serviceEmail: string;
    serviceUsername: string;
    servicePassword: string;
  }
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/passwords/${passwordId}`,
      passwordRequest
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Delete a password
export const deletePassword = async (passwordId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/passwords/${passwordId}`);
    Alert.alert("Password deleted successfully.");
  } catch (error: unknown) {
    console.error("Error deleting password:", error);
    throw error;
  }
};
