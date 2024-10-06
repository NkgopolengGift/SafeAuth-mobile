import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { useRouter } from "expo-router";

export default function SavePassword() {
  const router = useRouter();
  const [platformName, setPlatformName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [length, setLength] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);
  const [capitalLetters, setCapitalLetters] = useState(true);
  const [numbers, setNumbers] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState("ZYb#klb33OOTE");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const confirmPassword = () => {
    setPassword(generatedPassword);
    toggleModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-blue-950">
        {/* Top Bar */}
        <View className="flex-row justify-between items-center mb-4 mt-3 mx-3">
          <TouchableOpacity onPress={() => router.push("home")}>
            <Image
              source={icons.backArrow}
              className="h-6 w-15"
              tintColor="white"
            />
          </TouchableOpacity>

          <TouchableOpacity className="bg-green-500 p-2 w-24 h-11 rounded-lg flex-row justify-center ml-12 items-center">
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
              source={icons.email}
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
            <View className="absolute top-0 w-full h-[230px] bg-blue-500 rounded-3xl">
              <Image
                source={images.signUpCar}
                className="z-0 w-full rounded-lg h-[180px]"
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
                {/* Generate Password */}
                <View className="flex flex-row items-center justify-center mb-4">
                  <Text className="text-white font-JakartaBold text-center mr-11">
                    Generate Password
                  </Text>
                  <TouchableOpacity className="w-24 h-10 rounded-lg bg-green-500 items-center justify-center">
                    <Text className="text-white font-JakartaLight">
                      Generate
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="border-t border-gray-300 mx-3 mb-4" />

                {/* Length Toggle */}
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-JakartaBold text-center mr-44">
                    Length
                  </Text>

                  <TouchableOpacity
                    className={`w-14 h-8 rounded-full ${length ? "bg-green-500" : "bg-gray-500"}`}
                    onPress={() => setLength(!length)}
                  >
                    <Text className="font-JakartaMedium text-white text-center">
                      {length ? "On" : "Off"}
                    </Text>
                  </TouchableOpacity>
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
                <View className="flex-row items-center mb-2">
                  <Text className="text-white font-JakartaBold text-center mr-14">
                    Include numbers (0-9)
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

              <View className="flex-row mt-6">
                <TouchableOpacity
                  className="bg-red-500 p-2 w-24 h-11 rounded-lg  ml-5 items-center"
                  onPress={toggleModal}
                >
                  <Text className="font-JakartaMedium text-white">Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-green-500 p-2 w-24 h-11 rounded-lg  ml-28 items-center"
                  onPress={confirmPassword}
                >
                  <Text className="font-JakartaMedium text-white">Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
