import { useSession } from "@/src/context/ctx";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
export default function LoginScreen() {
  const { signIn } = useSession();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          signIn("token123");
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});
