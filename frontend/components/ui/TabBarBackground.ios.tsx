import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {BlurView} from "expo-blur";
import {StyleSheet} from "react-native";

export default function BlurTabBarBackground(): React.ReactElement {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      intensity={100}
      style={StyleSheet.absoluteFill}
      tint="systemChromeMaterial"
    />
  );
}

export const useBottomTabOverflow = (): number => {
  return useBottomTabBarHeight();
};
