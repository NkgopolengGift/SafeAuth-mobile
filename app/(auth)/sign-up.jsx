import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const onSignUpPress = async () => {};

  const checkPasswordStrength = (password) => {
    const isStrong =
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 6;

    if (password.length === 0) return setPasswordStrength("");
    if (isStrong) return setPasswordStrength("strong");
    if (password.length >= 4) return setPasswordStrength("medium");
    return setPasswordStrength("weak");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-64">
          <Image
            source={images.auth}
            className="absolute inset-0 w-full h-full"
          />
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({ ...form, email: value, username: value })
            }
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
              checkPasswordStrength(value);
            }}
          />
          {/* Password Strength Indicator */}
          <View className="mt-2 mb-4">
            <View
              className={`h-2 rounded ${
                passwordStrength === "strong"
                  ? "bg-green-500"
                  : passwordStrength === "medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{
                width:
                  passwordStrength === "strong"
                    ? "100%"
                    : passwordStrength === "medium"
                      ? "60%"
                      : "30%",
              }}
            />
            <Text className="text-sm mt-1">
              {passwordStrength === "strong"
                ? "Strong password"
                : passwordStrength === "medium"
                  ? "Medium strength"
                  : "Weak password"}
            </Text>
          </View>
          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.confirmPassword}
            onChangeText={(value) =>
              setForm({ ...form, confirmPassword: value })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <Link
            href="/log-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
