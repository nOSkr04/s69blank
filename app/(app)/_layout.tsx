import { useSession } from "@/src/context/ctx";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";
export { ErrorBoundary } from "expo-router";
import React from "react";
export const unstableSettings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const [loaded, error] = useFonts({
    SpaceMono: require("../../src/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, loaded]);

  if (!loaded) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
