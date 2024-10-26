import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const onSendCodePress = async () => {
    router.push("/(auth)/code");
  };

  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.auth} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Reset password
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

          <CustomButton
            title="Send code"
            onPress={onSendCodePress}
            className="mt-6"
          />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
