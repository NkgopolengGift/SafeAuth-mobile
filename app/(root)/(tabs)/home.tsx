import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import * as Clipboard from "expo-clipboard";
import { Password } from "@/types/type";
import {
  fetchPasswordsByUserId,
  deletePassword,
} from "@/app/(api)/PasswordService";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<Password | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [passwords, setPasswords] = useState<Password[]>([]);

  const fetchPasswords = async () => {
    const userId = "e638caa2-fe8f-4b38-85bb-f8578b7b300b";
    try {
      if (userId) {
        const data = await fetchPasswordsByUserId(userId);
        setPasswords(data);

        if (data.length === 0) {
          Alert.alert(
            "No passwords saved yet",
            "Please add your first password."
          );
          navigation.navigate("password");
        }
      }
    } catch (error) {
      Alert.alert("No passwords saved yet", "Please add your first password.");
      navigation.navigate("password");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPasswords();
    }, [])
  );

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleDelete = async () => {
    if (selectedPassword) {
      const passwordId = selectedPassword.passwordId;
      try {
        await deletePassword(passwordId);
        await fetchPasswords();
        closeModals();
      } catch (error) {
        // Handle any errors that occur during deletion
        Alert.alert("Error", "Failed to delete password.");
      }
    }
  };

  const filteredPasswords = passwords.filter(
    (password) =>
      password.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.serviceWebsite
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      password.serviceEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert("Success", "Copied to clipboard!");
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard.");
    }
  };

  const toggleEmailVisibility = () => setIsEmailVisible(!isEmailVisible);
  const toggleUsernameVisibility = () =>
    setIsUsernameVisible(!isUsernameVisible);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-950">
      <View className="p-4">
        {/* Search Bar */}
        <InputField
          placeholder="Search by platform name"
          icon={icons.search}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          label={""}
        />

        <Text className="p-3 text-green-500 font-JakartaLight text-[14px]">
          Saved passwords
        </Text>

        <ScrollView className="mb-56" showsVerticalScrollIndicator={false}>
          {(searchQuery ? filteredPasswords : passwords).map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between p-4 mb-3 bg-gray-800 rounded-lg border border-white"
            >
              <TouchableOpacity
                className="flex-1"
                onPress={() => showDetailsModal(item)}
              >
                <Text className="text-white font-JakartaMedium">
                  {item.serviceName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="p-2"
                onPress={() => showOptionsModal(item)}
              >
                <Image
                  source={icons.more}
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

                  <TouchableOpacity
                    className="bg-red-500 p-2 w-24 h-11 rounded-lg flex-row justify-center items-center"
                    onPress={handleDelete}
                  >
                    <Text className="font-JakartaMedium text-white">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text className="p-2 text-xl font-JakartaExtraBold text-center text-white mb-3">
                  {selectedPassword.serviceName}
                </Text>

                <View className="border border-white rounded-lg">
                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Email :
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(selectedPassword.serviceEmail)
                    }
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isEmailVisible
                        ? selectedPassword.serviceEmail
                        : "•".repeat(selectedPassword.serviceEmail.length)}
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
                    onPress={() =>
                      copyToClipboard(selectedPassword.serviceUsername)
                    }
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isUsernameVisible
                        ? selectedPassword.serviceUsername
                        : "•".repeat(selectedPassword.serviceUsername.length)}
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
                    onPress={() =>
                      copyToClipboard(selectedPassword.servicePassword)
                    }
                    className="flex-row items-center mx-6 mt-2 mb-5"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isPasswordVisible
                        ? selectedPassword.servicePassword
                        : "•".repeat(selectedPassword.servicePassword.length)}
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
                    Created Date:
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {formatDate(selectedPassword.createdAt)}
                    </Text>
                  </View>

                  <View className="mx-6 my-2 h-[1px] bg-white"></View>

                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Modified Date:
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2 mb-5">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {formatDate(selectedPassword.modifiedAt)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}

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

                  {/* <TouchableOpacity className="bg-green-500 p-2 w-24 h-11 rounded-lg flex-row justify-center ml-12 items-center">
                    <Text className="font-JakartaMedium text-white">Edit</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    className="bg-red-500 p-2 w-24 h-11 rounded-lg flex-row justify-center items-center"
                    onPress={handleDelete}
                  >
                    <Text className="font-JakartaMedium text-white">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text className="p-2 text-xl font-JakartaExtraBold text-center text-white mb-3">
                  {selectedPassword.serviceName}
                </Text>

                <View className="border border-white rounded-lg">
                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Email :
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(selectedPassword.serviceEmail)
                    }
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isEmailVisible
                        ? selectedPassword.serviceEmail
                        : "•".repeat(selectedPassword.serviceEmail.length)}
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
                    onPress={() =>
                      copyToClipboard(selectedPassword.serviceUsername)
                    }
                    className="flex-row items-center mx-6 mt-2"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isUsernameVisible
                        ? selectedPassword.serviceUsername
                        : "•".repeat(selectedPassword.serviceUsername.length)}
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
                    onPress={() =>
                      copyToClipboard(selectedPassword.servicePassword)
                    }
                    className="flex-row items-center mx-6 mt-2 mb-5"
                  >
                    <Image
                      source={icons.key}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {isPasswordVisible
                        ? selectedPassword.servicePassword
                        : "•".repeat(selectedPassword.servicePassword.length)}
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
                    Created Date:
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {formatDate(selectedPassword.createdAt)}
                    </Text>
                  </View>

                  <View className="mx-6 my-2 h-[1px] bg-white"></View>

                  <Text className="ml-6 mt-5 text-white font-JakartaMedium">
                    Modified Date:
                  </Text>
                  <View className="flex-row items-center mx-6 mt-2 mb-5">
                    <Image
                      source={icons.calender}
                      className="h-5 w-5 mr-2"
                      tintColor="white"
                    />
                    <Text className="flex-1 font-JakartaMedium ml-2 text-white">
                      {formatDate(selectedPassword.modifiedAt)}
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
                  {selectedPassword.serviceName}
                </Text>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => copyToClipboard(selectedPassword.serviceEmail)}
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy email address
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() =>
                    copyToClipboard(selectedPassword.serviceUsername)
                  }
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy username
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() =>
                    copyToClipboard(selectedPassword.servicePassword)
                  }
                >
                  <Image source={icons.copy} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">
                    Copy password
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  className="flex-row items-center mb-3 bg-gray-300 p-3 rounded-lg"
                  onPress={() => {
                    console.log("Edit:", selectedPassword.serviceName);
                    closeModals();
                  }}
                >
                  <Image source={icons.write} className="h-5 w-5 mr-2" />
                  <Text className="text-center font-JakartaMedium">Edit</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  className="flex-row items-center bg-red-500 p-3 rounded-lg"
                  onPress={handleDelete}
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
