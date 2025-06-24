import {Slot} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {FernsProvider} from "ferns-ui";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {AuthProvider} from "@/contexts/AuthContext";

export default function RootLayout(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <FernsProvider>
        <AuthProvider>
          <Slot />
          <StatusBar style="auto" />
        </AuthProvider>
      </FernsProvider>
    </SafeAreaProvider>
  );
}
