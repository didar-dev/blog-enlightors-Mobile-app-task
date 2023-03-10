import { View, Text } from "react-native";
import React from "react";
import { Stack, useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
export default function Article() {
  const dispatch = useDispatch();

  const { articleid } = useSearchParams();
  const Articles = useSelector((state) => state.Articles.Articles);
  const Article = Articles.find(
    (article) => article.id.toString() === articleid
  );
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: Article?.title,
        }}
      />
    </View>
  );
}
