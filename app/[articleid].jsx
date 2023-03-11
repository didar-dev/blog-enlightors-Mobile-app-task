import { View, Text } from "react-native";
import React from "react";
import { Stack, useSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "expo-image";

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
      <Image
        style={{
          width: "100%",
          height: 240,
        }}
        source={{ uri: `https://www.lawa.best/api/${Article.image}` }}
        placeholder={
          Article.image_blurhash
            ? Article.image_blurhash
            : "LSED;i8^a0I:.mQ-VsNaozt7WBWB"
        }
        contentFit="cover"
        transition={1000}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        {Article?.title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          margin: 10,
        }}
      >
        {Article?.description}
      </Text>
    </View>
  );
}
