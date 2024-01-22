/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="one"
        options={{
          title     : "Tab One",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="home" size={size} />
          ),
          tabBarLabel: "gg",
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title     : "Tab Two",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="home" size={size} />
          ),
          tabBarLabel: "gg",
        }}
      />
    </Tabs>
  );
}
