import { Platform } from "react-native";

/**
 * Get the correct localhost URL for the platform
 * Android emulator uses special alias to host machine
 * iOS simulator and web can use localhost
 */
export const getLocalServerUrl = (path: string = '/sample.pdf') => {
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:3000${path}`;
  }
  return `http://localhost:3000${path}`;
};
