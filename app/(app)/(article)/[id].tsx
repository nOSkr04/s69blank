import {  Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ArticleDetailScreen = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  return (
    <View>
      <Text>ArticleDetailScreen{id}</Text>
    </View>
  );
};

export default ArticleDetailScreen;

