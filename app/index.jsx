import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { loginUser } from "../redux/Auth";
import { Stack } from "expo-router";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
export default function Page() {
  const [isReady, setReady] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  }
  async function getToken() {
    const token = await getValueFor("token");
    return token;
  }
  async function checkToken() {
    const token = await getToken();
    if (token) {
      try {
        const attempt = await axios({
          method: "get",
          url: "https://www.lawa.best/api/auth/me",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (attempt.status === 200) {
          dispatch(
            loginUser({
              token: token,
              user: attempt.data.user,
            })
          );

          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
        router.replace("/login");
      }
    } else {
      setReady(true);
      router.replace("/login");
    }
  }
  checkToken();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      {isReady ? null : <ActivityIndicator size="large" color="#ff9c0c" />}
    </View>
  );
}
