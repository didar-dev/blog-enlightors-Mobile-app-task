import React from "react";
import {
  Text,
  FlatList,
  Dimensions,
  Button,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

function Grid({ article }) {
  const windowWidth = Dimensions.get("window").width;
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/${article.id}`);
      }}
    >
      <Image
        style={{
          width: windowWidth / 2 - 5,
          height: 200,
          margin: 2,
        }}
        source={{ uri: `https://www.lawa.best/api/${article.image}` }}
        placeholder={
          article.image_blurhash
            ? article.image_blurhash
            : "LSED;i8^a0I:.mQ-VsNaozt7WBWB"
        }
        contentFit="cover"
        transition={1000}
      />
    </Pressable>
  );
}
function List({ article }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.List_container}
      onPress={() => {
        router.push(`/${article.id}`);
      }}
    >
      <Image
        style={{ width: 150, height: 100 }}
        source={{ uri: `https://www.lawa.best/api/${article?.image}` }}
        placeholder={
          article.image_blurhash
            ? article.image_blurhash
            : "LSED;i8^a0I:.mQ-VsNaozt7WBWB"
        }
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.List_content}>
        <Text style={styles.List_title}>{article.title}</Text>
        <Text style={styles.List_description}>
          {article.description.length < 100
            ? article.description
            : article.description.substring(0, 98) + "..."}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  List_title: {
    fontSize: 20,
    color: "#000",
    overflow: "hidden",
  },
  List_container: {
    margin: 5,
    width: Dimensions.get("window").width - 20,
    flexDirection: "row",
    gap: 10,
  },
  List_content: {
    flex: 1,
    flexDirection: "column",
  },
  List_description: {
    fontSize: 15,
    color: "grey",
    overflow: "hidden",
  },
});

export { Grid, List };
