import axios from "axios";
import { Alert } from "react-native";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

// SignUp
export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      username: email,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Registration Error:", error);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

//verify account
export const verifyAccount = async (email: string, otp: string) => {
  try {
    console.log(email);
    console.log(otp);
    const response = await axios.post(`${BASE_URL}/auth/verify`, {
      email: email,
      otp: otp,
    });
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      Alert.alert("Invalid verification code");
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

//LogIn
export const logIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      Alert.alert("Invalid credentials, try again.");
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};
