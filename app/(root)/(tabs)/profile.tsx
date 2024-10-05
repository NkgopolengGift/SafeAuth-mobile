import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { icons } from "@/constants";

const Profile = () => {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to show/hide modal
  const [selectedLockTime, setSelectedLockTime] = useState(1); // Default lock time is 1 minute
  const [subject, setSubject] = useState(""); // State for subject
  const [message, setMessage] = useState(""); // State for message

  const lockTimes = [1, 2, 3, 4, 5]; // Array of lock time options

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectLockTime = (time) => {
    setSelectedLockTime(time);
    toggleModal();
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-950">
      <ScrollView showsVerticalScrollIndicator={false} className="mx-2 p-4">
        <Text className="font-JakartaLight text-white mt-3">Security</Text>

        <View className="border border-white rounded-lg mt-4">
          {/* Biometric Toggle */}
          <View className="flex-row">
            <Text className="text-white text-base font-JakartaLight p-4">
              Biometric
            </Text>
            <TouchableOpacity
              onPress={() => setIsBiometricEnabled(!isBiometricEnabled)}
              className={`${
                isBiometricEnabled ? "bg-green-500" : "bg-gray-500"
              } w-16 h-9 rounded-full justify-center ml-24 mt-4`}
            >
              <Text className="text-white text-center">
                {isBiometricEnabled ? "On" : "Off"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border-t border-gray-300 mx-3 mt-4" />

          {/* Automatic Lock Time */}
          <Text className="text-white text-base font-JakartaLight p-4">
            Automatic lock
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text className="text-green-500 text-base font-JakartaLight p-3">
              After {selectedLockTime} minute{selectedLockTime > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="font-JakartaLight text-white mt-5">Account</Text>
        <View className="border border-white rounded-lg mt-4">
          <Text className="text-white font-JakartaMedium p-4">Username:</Text>
          <View className="flex-row mx-4">
            <Image
              source={icons.email}
              className="w-7 h-6 mr-2"
              tintColor="white"
            />
            <Text className=" font-JakartaLight text-white ">
              NkgopolengGift
            </Text>
          </View>

          <View className="border-t border-gray-300 mx-3 mt-4" />

          <View className="flex-row mx-4 mt-4">
            <Text className="text-white font-JakartaMedium">
              Reset password
            </Text>
            <TouchableOpacity className="h-10 w-24 bg-green-500 rounded-lg ml-11 justify-center">
              <Text className="text-white font-JakartaLight text-center">
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border-t border-gray-300 mx-3 mt-4" />

          <View className="flex-row mt-4 mx-4 mb-4">
            <TouchableOpacity className="h-12 w-28 bg-green-500 rounded-lg justify-center">
              <Text className="text-center text-white font-JakartaMedium">
                Log out
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="h-12 w-28 bg-red-500 rounded-lg justify-center ml-10">
              <Text className="text-center text-white font-JakartaMedium">
                Delete account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="font-JakartaLight text-white mt-3">Feedback</Text>

        <View className="border border-white rounded-lg mt-4 mb-28">
          <Text className="text-white font-JakartaMedium p-4">Subject:</Text>
          <View className="flex-row mx-4">
            <TextInput
              className="flex-1 font-JakartaLight text-black bg-white rounded-lg h-12"
              placeholder="subject"
              placeholderTextColor="gray"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />
          </View>

          <View className="border-t border-gray-300 mx-3 mt-4" />

          <Text className="text-white font-JakartaMedium p-4">Content:</Text>
          <View className="flex-row mx-4 ">
            <TextInput
              className="flex-1 font-JakartaLight text-black bg-white rounded-lg h-12"
              placeholder="Type your message here"
              placeholderTextColor="gray"
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
          </View>

          <View className="border-t border-gray-300 mx-3 mt-4" />

          <TouchableOpacity className="mt-4 bg-green-500 h-12 w-50 mx-4 justify-center rounded-lg mb-4">
            <Text className="text-white font-JakartaMedium text-center">
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for selecting lock time */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-blue-950 bg-opacity-50">
          <View className=" w-80 rounded-lg p-4">
            <Text className="text-white text-center text-lg font-JakartaBold mb-5">
              Select Lock Time
            </Text>
            <FlatList
              data={lockTimes}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-300"
                  onPress={() => selectLockTime(item)}
                >
                  <Text className="text-white text-base font-JakartaLight">
                    After {item} minute{item > 1 ? "s" : ""}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg mt-4"
              onPress={toggleModal}
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
