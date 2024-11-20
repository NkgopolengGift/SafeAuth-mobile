import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { logIn } from "../(api)/AuthenticationService";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLogInPress = async () => {
    if (password === null) {
      Alert.alert("Password field can't be empty.");
      if (email === null) {
        Alert.alert("Email field can't be empty.");
      }
    } else {
      const response = await logIn(email, password);
      console.log("LogIn :", response);
      router.push("/(root)/(tabs)/home");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.auth} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Log In
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <CustomButton
            title="Log In"
            onPress={onLogInPress}
            className="mt-6"
          />

          {/* Forgot Password Link */}
          <Link
            href="/forgot-password"
            className="text-center mt-4 text-primary-500"
          >
            Forgot Password?
          </Link>

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-3"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;
