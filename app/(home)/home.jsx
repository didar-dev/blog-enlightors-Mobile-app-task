import {
  Text,
  FlatList,
  Dimensions,
  Button,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "expo-router";
import { signout } from "../../redux/Auth";
import { AddArticles } from "../../redux/Articles";
import { useRouter } from "expo-router";
import axios from "axios";
import { Grid, List } from "./article/Cards";
export default function home() {
  const windowWidth = Dimensions.get("window").width;
  const [isgrid, setisGrid] = useState(true);
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth.Auth);
  const Articles = useSelector((state) => state.Articles.Articles);
  const router = useRouter();
  useEffect(() => {
    async function getArticles() {
      try {
        const attempt = await axios({
          method: "get",
          url: "https://www.lawa.best/api/article/articles",
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${Auth?.token}`,
          },
        });
        console.log(attempt);
        if (attempt.status === 200) {
          dispatch(AddArticles(attempt.data.articles));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getArticles();
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Home",
          headerRight: () => (
            <Button
              onPress={() => {
                dispatch(signout());
                router.replace("/login");
              }}
              title="Logout"
              color="#fff"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => {
                setisGrid(!isgrid);
              }}
              title={isgrid ? "List" : "Grid"}
              color="#fff"
            />
          ),
        }}
      />
      <View
        style={{
          width: windowWidth,
          height: "100%",
        }}
      >
        {isgrid ? (
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              rowGap: 10,
              columnGap: 10,
            }}
          >
            <FlatList
              data={Articles}
              renderItem={({ item }) => {
                return isgrid ? (
                  <Grid article={item} />
                ) : (
                  <List article={item} />
                );
              }}
              keyExtractor={(item) => item.id}
              numColumns={2}
              key={2}
            />
          </View>
        ) : (
          <FlatList
            data={Articles}
            renderItem={({ item }) => {
              return isgrid ? <Grid article={item} /> : <List article={item} />;
            }}
            keyExtractor={(item) => item.id}
            numColumns={1}
            key={1}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
