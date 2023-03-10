import { Text, Button, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "expo-router";
import { signout } from "../../redux/Auth";
import { AddArticles } from "../../redux/Articles";
import { useRouter } from "expo-router";
import axios from "axios";
export default function home() {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth.Auth);
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
          dispatch(AddArticles(attempt.articles));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getArticles();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        }}
      />
      <Text>WELCOME {Auth?.user.name}</Text>
    </View>
  );
}
