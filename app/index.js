import { View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSegments } from "expo-router";
import { SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { loginUser } from "../redux/Auth";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export default function Page() {
  const [isReady, setReady] = useState(false);
  const segments = useSegments();
  const dispatch = useDispatch();
  const router = useRouter();
  const Auth = useSelector((state) => state.Auth.Auth);

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
          dispatch(loginUser(attempt.data.user));
          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setReady(true);
      router.replace("/login");
    }
  }
  checkToken();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isReady && <SplashScreen />}
    </View>
  );
}
