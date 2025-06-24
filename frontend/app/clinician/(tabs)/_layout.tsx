import {Tabs, usePathname, useRouter} from "expo-router";
import {Icon, useTheme} from "ferns-ui";
import React, {useEffect} from "react";
import {Platform} from "react-native";

import {HapticTab} from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {useAuth} from "@/contexts/AuthContext";

const ClinicianTabLayout: React.FC = (): React.ReactElement | null => {
  const {isLoggedIn, isLoading} = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const {theme} = useTheme();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, pathname, router]);

  if (isLoading) return null;

  if (!isLoggedIn) {
    // Avoid rendering layout while redirecting
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.surface.primary,
        headerShown: false,
        tabBarButton: HapticTab as any,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: () => <Icon iconName="house" size="md" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <Icon iconName="person" size="md" />,
        }}
      />
    </Tabs>
  );
};

export default ClinicianTabLayout;
