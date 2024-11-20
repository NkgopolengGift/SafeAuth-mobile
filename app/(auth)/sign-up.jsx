import { Alert, Image, Modal, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { signUp, verifyAccount } from "../(api)/AuthenticationService";

const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otp, setOtp] = useState("");

  const [verifyAccountModal, setVerifyAccountModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSignUpPress = async () => {
    // if (passwordStrength < 4) {
    //   alert("Strong password must at least have 4 characters.");
    //   return;
    // }

    if (password === confirmPassword) {
      try {
        const response = await signUp(email, password);
        if (response) {
          setVerifyAccountModal(true);
        } else {
          Alert.alert(
            "Email already registered",
            "Please log in to your account.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("log-in"),
              },
            ]
          );
        }
      } catch (error) {}
    } else {
      alert("Passwords do not match");
    }
  };

  // Verify account
  const onPressVerify = async () => {
    if (otp != null) {
      try {
        const response = await verifyAccount(email, otp);
        if (response != null) {
          setIsVerified(true);
        }
      } catch (error) {}
    }
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

          <PasswordStrengthMeter
            password={password}
            onStrengthChange={setPasswordStrength}
          />

          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

        {/* Verify Account Modal */}
        <Modal
          transparent={true}
          visible={verifyAccountModal}
          animationType="slide"
        >
          <View className="bg-white h-[570px] mt-40">
            <View className="bg-white px-7 py-9  mt-10 rounded-2xl min-h-[300px] ml-3 mr-3 shadow-2xl shadow-black">
              <Text className="font-JakartaExtraBold text-2xl mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5">
                We've sent a verification code to {email}.
              </Text>
              <InputField
                label={"Code"}
                icon={icons.lock}
                placeholder={"12345"}
                value={otp}
                keyboardType="numeric"
                onChangeText={setOtp}
              />
              <CustomButton
                title="Verify Email"
                onPress={onPressVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </View>
        </Modal>

        {/* Account verified Modal */}
        <Modal transparent={true} visible={isVerified} animationType="slide">
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] mt-44 ml-3 mr-3 shadow-2xl shadow-black">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Login"
              onPress={() => navigation.navigate("log-in")}
              className="mt-5"
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
