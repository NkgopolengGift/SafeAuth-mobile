import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onLogInPress = async () => {
    // Login logic will be here

    // On successful login, go to home
    router.push("/(root)/(tabs)/home");
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
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
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
