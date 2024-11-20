import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

export type User = {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  enabled?: boolean;
  otp?: string;
  otpExpiresAt?: string;
  createdAt: string;
  createBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
};

export type Role = "USER" | "ADMIN";

export type Password = {
  passwordId: string;
  user: User;
  serviceName: string;
  serviceWebsite: string;
  serviceEmail: string;
  serviceUsername: string;
  servicePassword: string;
  isActive: boolean;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string;
};

declare interface PasswordStrengthMeterProps {
  password: string;
  onStrengthChange: (strength: number) => void;
}
