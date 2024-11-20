import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { icons, images } from "@/constants";
import { useRouter } from "expo-router";
import {
  generateStrongPassword,
  createPassword,
} from "@/app/(api)/PasswordService";
import { useNavigation } from "@react-navigation/native";

export default function SavePassword() {
  const navigation = useNavigation();

  const router = useRouter();
  const [platformName, setPlatformName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [length, setLength] = useState(12);
  const [specialChars, setSpecialChars] = useState(true);
  const [capitalLetters, setCapitalLetters] = useState(true);
  const [numbers, setNumbers] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const confirmPassword = () => {
    setPassword(generatedPassword);
    toggleModal();
  };

  useEffect(() => {
    if (isModalVisible) {
      generateNewPassword();
    }
  }, [isModalVisible]);

  const handleCreatePassword = async () => {
    const userId = "e638caa2-fe8f-4b38-85bb-f8578b7b300b"; // Replace with dynamic userId if needed

    if (userId) {
      try {
        // Construct the password request object
        const passwordRequest = {
          userId,
          serviceName: platformName,
          serviceWebsite: "",
          serviceEmail: email,
          serviceUsername: username,
          servicePassword: password,
        };

        const data = await createPassword(passwordRequest);

        if (data) {
          Alert.alert(
            "Password Saved Successfully",
            "Stay safe with your new password!"
          );

          // Navigate back to the home page and trigger a refresh
          navigation.navigate("home", { refresh: true });
        }
      } catch (error) {
        Alert.alert("Unable to Save Password", "Please try again later.");
      }
    }
  };

  // Function to generate a new password based on the current settings
  const generateNewPassword = async () => {
    try {
      const password = await generateStrongPassword(
        length.toString(),
        capitalLetters,
        numbers,
        specialChars
      );
      setGeneratedPassword(password);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-blue-950">
        {/* Top Bar */}
        <View className="flex-row justify-between items-center mb-4 mt-3 mx-3">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Image
              source={icons.backArrow}
              className="h-6 w-15"
              tintColor="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 p-2 w-24 h-11 rounded-lg flex-row justify-center ml-12 items-center"
            onPress={handleCreatePassword}
          >
            <Text className="font-JakartaMedium text-white">Save</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View className="border border-white mx-3 p-3 rounded-lg mt-4">
          <Text className="font-JakartaMedium text-white mb-3">Name:</Text>
          <TextInput
            className="bg-white font-JakartaLight text-black px-4 py-3 rounded-lg"
            placeholder="Enter platform name"
            placeholderTextColor="gray"
            value={platformName}
            onChangeText={(text) => setPlatformName(text)}
          />
        </View>

        <View className="border border-white mx-3 p-3 rounded-lg mt-4">
          <Text className="font-JakartaMedium text-white mb-3">Email:</Text>
          <View className="flex-row items-center bg-white rounded-lg px-4 py-3">
            <Image
              source={icons.email}
              className="w-7 h-6 mr-2"
              tintColor="gray"
            />
            <TextInput
              className="flex-1 font-JakartaLight text-black"
              placeholder="Enter login email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View className="border-t bg-gray-200 mx-3 my-4" />

          <Text className="font-JakartaMedium text-white mb-3">Username:</Text>
          <View className="flex-row items-center bg-white rounded-lg px-4 py-3">
            <Image
              source={icons.user}
              className="w-7 h-6 mr-2"
              tintColor="gray"
            />
            <TextInput
              className="flex-1 font-JakartaLight text-black"
              placeholder="Enter username"
              placeholderTextColor="gray"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <View className="border-t bg-gray-200 mx-3 my-4" />

          <Text className="font-JakartaMedium text-white mb-3">Password:</Text>
          <View className="flex-row items-center bg-white rounded-lg px-4 py-3">
            <Image
              source={icons.lock}
              className="w-7 h-6 mr-2"
              tintColor="gray"
            />
            <TextInput
              className="flex-1 font-JakartaLight text-black"
              placeholder="Enter password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        {/* Button to Open Modal */}
        <TouchableOpacity
          className="h-14 w-74 mx-3 rounded-lg mt-5 bg-green-500 justify-center content-center"
          onPress={toggleModal}
        >
          <Text className="text-white text-sm text-center font-JakartaMedium ">
            Generate a strong password
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={false}
        >
          <SafeAreaView className="flex-1 bg-blue-950">
            <View className="absolute top-0 w-full h-[210px] bg-blue-500 rounded-3xl">
              <Image
                source={images.strongPass}
                className="z-0 w-full rounded-lg h-[150px]"
              />
              <View>
                <Text className="text-white font-JakartaMedium text-center mt-1">
                  Your password is Strong
                </Text>
              </View>

              <Text className="text-white font-JakartaMedium text-center mt-14 mb-5">
                {generatedPassword}
              </Text>

              <View className="border border-white rounded-lg p-3 mx-3">
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-JakartaBold mr-20">
                    Length
                  </Text>
                  <View className="flex-1 border border-gray-500 rounded-lg overflow-hidden">
                    <Picker
                      selectedValue={length}
                      onValueChange={(itemValue) => setLength(itemValue)}
                      style={{ color: "white" }}
                      dropdownIconColor="white"
                    >
                      <Picker.Item label="8" value={8} />
                      <Picker.Item label="12" value={12} />
                      <Picker.Item label="16" value={16} />
                      <Picker.Item label="20" value={20} />
                    </Picker>
                  </View>
                </View>

                <View className="border-t border-gray-300 mx-3 mb-4" />

                {/* Special Characters Toggle */}
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-JakartaBold text-center mr-10">
                    Special characters (!&*)
                  </Text>
                  <TouchableOpacity
                    className={`w-14 h-8 rounded-full ${specialChars ? "bg-green-500" : "bg-gray-500"}`}
                    onPress={() => setSpecialChars(!specialChars)}
                  >
                    <Text className="font-JakartaMedium text-white text-center">
                      {specialChars ? "On" : "Off"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="border-t border-gray-300 mx-3 mb-4" />

                {/* Capital Letters Toggle */}
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-JakartaBold text-center mr-20">
                    Capital letters (A-Z)
                  </Text>
                  <TouchableOpacity
                    className={`w-14 h-8 rounded-full ${capitalLetters ? "bg-green-500" : "bg-gray-500"}`}
                    onPress={() => setCapitalLetters(!capitalLetters)}
                  >
                    <Text className="font-JakartaMedium text-white text-center">
                      {capitalLetters ? "On" : "Off"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="border-t border-gray-300 mx-3 mb-4" />

                {/* Numbers Toggle */}
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-JakartaBold text-center mr-20">
                    Numbers (0-9)
                  </Text>
                  <TouchableOpacity
                    className={`w-14 h-8 rounded-full ${numbers ? "bg-green-500" : "bg-gray-500"}`}
                    onPress={() => setNumbers(!numbers)}
                  >
                    <Text className="font-JakartaMedium text-white text-center">
                      {numbers ? "On" : "Off"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className="h-14 w-74 mx-3 rounded-lg mt-5 bg-blue-500 justify-center content-center"
                onPress={generateNewPassword}
              >
                <Text className="text-white text-sm text-center font-JakartaMedium ">
                  Generate password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="h-14 w-74 mx-3 rounded-lg mt-5 bg-green-500 justify-center content-center"
                onPress={confirmPassword}
              >
                <Text className="text-white text-sm text-center font-JakartaMedium ">
                  Confirm password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleModal}
                className="absolute top-0 right-0 p-5"
              >
                <Image
                  source={icons.close}
                  className="w-6 h-6"
                  tintColor="white"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
