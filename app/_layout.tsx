import { SessionProvider } from "@/src/context/ctx";
import { Slot } from "expo-router";
import { AppState, AppStateStatus, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SWRConfig } from "swr";
import React from "react";
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          provider: () => new Map(),
          initFocus(callback) {
            let appState = AppState.currentState;

            const handleAppStateChange = (nextAppState: AppStateStatus) => {
              if (
                appState.match(/inactive|background/) &&
                nextAppState === "active"
              ) {
                callback();
              }
              appState = nextAppState;
            };

            const subscription = AppState.addEventListener(
              "change",
              handleAppStateChange
            );

            return () => {
              subscription.remove();
            };
          },
        }}
      >
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <Slot />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
