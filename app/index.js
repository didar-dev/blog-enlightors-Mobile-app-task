import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useRouter, useSegments } from "expo-router";
import { SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { login } from "../redux/Auth";
import * as SecureStore from "expo-secure-store";
export default function Page() {
  const [isReady, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const Auth = useSelector((state) => state.Auth.Auth);
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  }
  useEffect(() => {
    async function check() {
      let token = await getValueFor("token");
      if (token) {
        router.push("/home");
      } else {
        setReady(true);
      }
    }
    check();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isReady && <SplashScreen />}
      <Text>Welcome</Text>
      <Pressable onPress={() => router.push("/login")}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
}
