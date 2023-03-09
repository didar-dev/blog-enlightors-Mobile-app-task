import { Text, Button, View } from "react-native";
import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "expo-router";
import { signout } from "../../redux/Auth";
import { useRouter, useSegments } from "expo-router";
export default function home() {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth.Auth);
  const router = useRouter();

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
      <Text>WELCOME {Auth.name}</Text>
    </View>
  );
}
