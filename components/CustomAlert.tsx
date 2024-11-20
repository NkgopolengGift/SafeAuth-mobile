import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <StyledView className="flex-1 justify-center items-center bg-black/50">
        <StyledView className="w-72 p-6 bg-white rounded-2xl items-center shadow-lg">
          <StyledText className="text-lg text-gray-800 text-center mb-5">
            {message}
          </StyledText>
          <StyledTouchableOpacity
            className="bg-blue-500 px-6 py-2 rounded-lg"
            onPress={onClose}
          >
            <StyledText className="text-white font-semibold">OK</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default CustomAlert;
