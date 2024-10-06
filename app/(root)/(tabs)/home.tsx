import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import * as Clipboard from "expo-clipboard";

// Define the Password type
type Password = {
  platform: string;
  username: string;
  email: string;
  password: string;
  created: string;
  modified: string;
};

export default function Home() {
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<Password | null>(
    null,
  );

  const passwords: Password[] = [
    {
      platform: "Facebook",
      email: "123@gmail.com",
      username: "user123",
      password: "pass123",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
    {
      platform: "Twitter",
      email: "123@gmail.com",
      username: "user456",
      password: "pass456",
      created: "12 August 2024",
      modified: "12 August 2024",
    },
  ];

  // Function to toggle details modal
  const showDetailsModal = (passwordItem: Password) => {
    setSelectedPassword(passwordItem);
    setDetailsModalVisible(true);
  };

  // Function to toggle options modal
  const showOptionsModal = (passwordItem: Password) => {
    setSelectedPassword(passwordItem);
    setOptionsModalVisible(true);
  };

  // Function to close both modals
  const closeModals = () => {
    setDetailsModalVisible(false);
    setOptionsModalVisible(false);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    console.log("Copied:", text);
  };

  const toggleEmailVisibility = () => setIsEmailVisible(!isEmailVisible);
  const toggleUsernameVisibility = () =>
    setIsUsernameVisible(!isUsernameVisible);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-950">
      <View className="p-4">
        {/* Search Bar */}
        <InputField
          placeholder="Search by platform name"
          icon={icons.search}
          value={""}
          label={""}
        />

        <Text className="p-3 text-green-500 font-JakartaLight text-[14px]">
          Saved  passwords
        </Text>

        {/* List of saved passwords */}
        <ScrollView className="mb-56" showsVerticalScrollIndicator={false}>
          {passwords.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between p-4 mb-3 bg-gray-800 rounded-lg border border-white"
            >
              <TouchableOpacity
                className="flex-1"
                onPress={() => showDetailsModal(item)}
              >
                <Text className="text-white font-JakartaMedium">
                  {item.platform}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="p-2"
                onPress={() => showOptionsModal(item)}
              >
                <Image
                  source={icons.ellipsis}
                  className="h-6 w-6"
                  tintColor="white"
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Modal for platform details */}
        {selectedPassword && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={isDetailsModalVisible}
            onRequestClose={closeModals}
          >
            {/* TouchableOpacity to close the modal when clicking outside */}
            <TouchableOpacity
              className="flex-1 bg-blue-950 bg-opacity-50"
              activeOpacity={1}
              onPress={closeModals}
            >
              <TouchableOpacity
                className="w-full p-4"
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  marginTop: 0,
                }}
              >
                <View className="flex-row justify-between items-center mb-4">
                  <TouchableOpacity onPress={closeModals}>
                    <Image
                      source={icons.backArrow}
                      className="h-8 w-15"
                      tintColor="white"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-green-500 p-2 w-24 h-11 rounded-lg flex-row justify-center ml-12 items-center">
                    <Text className="font-JakartaMedium text-white">Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-red-500 p-2 w-24 h-11 rounded-lg flex-row justify-center items-center">
                    <Text className="font-JakartaMedium text-white">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text className="p-2 text-xl font-JakartaExtraBold text-center text-white mb-3">
                  {selectedPassword.platform}
                </Text>

                <View className="border border-white rounded-lg">
                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Email :
                  </Text>

                  <TouchableOpacity
                    onPress={() => copyToClipboard(selectedPassword.email)}
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isEmailVisible
                        ? selectedPassword.email
                        : "•".repeat(selectedPassword.email.length)}
                    </Text>
                    <TouchableOpacity onPress={toggleEmailVisibility}>
                      <Image
                        source={isEmailVisible ? icons.eyecross : icons.eye}
                        className="h-5 w-5"
                        tintColor="white"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <View className="mx-6 my-2 h-[1px] bg-white"></View>

                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Username :
                  </Text>

                  <TouchableOpacity
                    onPress={() => copyToClipboard(selectedPassword.username)}
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isUsernameVisible
                        ? selectedPassword.username
                        : "•".repeat(selectedPassword.username.length)}
                    </Text>
                    <TouchableOpacity onPress={toggleUsernameVisibility}>
                      <Image
                        source={isUsernameVisible ? icons.eyecross : icons.eye}
                        className="h-5 w-5"
                        tintColor="white"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <View className="mx-6 my-2 h-[1px] bg-white"></View>

                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Password :
                  </Text>

                  <TouchableOpacity
                    onPress={() => copyToClipboard(selectedPassword.password)}
                    className="flex-row items-center mx-6 mt-2 mb-5"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isPasswordVisible
                        ? selectedPassword.password
                        : "•".repeat(selectedPassword.password.length)}
                    </Text>
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Image
                        source={isPasswordVisible ? icons.eyecross : icons.eye}
                        className="h-5 w-5"
                        tintColor="white"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>

                <View className="border border-white rounded-lg mt-5">
                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Created :
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {selectedPassword.created}
                    </Text>
                  </View>

                  <View className="mx-6 my-2 h-[1px] bg-white"></View>

                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Modified :
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2 mb-5">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {selectedPassword.modified}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Modal for copy, edit, and delete options */}
        {selectedPassword && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={isOptionsModalVisible}
            onRequestClose={closeModals}
          >
            <TouchableOpacity
              className="flex-1 justify-center items-center bg-blue-950 bg-opacity-50"
              activeOpacity={1}
              onPress={closeModals}
            >
              <TouchableOpacity
                className="w-80 p-6 rounded-lg"
                activeOpacity={1}
                onPress={() => {}}
              >
                <Text className="text-lg font-JakartaExtraBold text-center mb-7 text-white">
                  {selectedPassword.platform}
                </Text>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => copyToClipboard(selectedPassword.email)}
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy email address
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => copyToClipboard(selectedPassword.username)}
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy username
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => copyToClipboard(selectedPassword.password)}
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy password
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => {
                    console.log("Edit:", selectedPassword.platform);
                    closeModals();
                  }}
                >
                  <Image source={icons.write} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center bg-red-500 p-3 rounded-lg"
                  onPress={() => {
                    console.log("Delete:", selectedPassword.platform);
                    closeModals();
                  }}
                >
                  <Image source={icons.bin} className="h-5 w-5 mr-2" />
                  <Text className="text-center text-white font-JakartaMedium">
                    Delete
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}
