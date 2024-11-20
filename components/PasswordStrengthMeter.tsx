import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { PasswordStrengthMeterProps } from "../types/type";

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  onStrengthChange,
}) => {
  const getStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  useEffect(() => {
    onStrengthChange(strength);
  }, [strength, onStrengthChange]);

  const getColor = (strength: number): string => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-orange-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-300";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number): string => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <View className="mt-2">
      <View className="flex-row justify-between mb-1">
        <Text className="text-xs text-gray-500">Password strength</Text>
        <Text className="text-xs text-gray-500">
          {getStrengthText(strength)}
        </Text>
      </View>

      <View className="flex-row justify-between my-1">
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            className={`h-1 w-[24%] rounded ${index < strength ? getColor(strength) : "bg-gray-300"}`}
          />
        ))}
      </View>
    </View>
  );
};

export default PasswordStrengthMeter;
