import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const onResetPress = async () => {
    router.push("/(root)/(tabs)/home");
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
            label="New Password"
            placeholder="Enter your new Password"
            icon={icons.lock}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <CustomButton
            title="Reset password"
            onPress={onResetPress}
            className="mt-6"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
