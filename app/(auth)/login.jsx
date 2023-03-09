import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Auth";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useSelector((state) => state.Auth.Auth);
  const dispatch = useDispatch();
  const router = useRouter();

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  const LoginHandler = async () => {
    try {
      const attempt = await axios({
        method: "post",
        url: "https://www.lawa.best/api/auth/signin",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          email: email,
          password: password,
        },
      });
      if (attempt.status === 200) {
        dispatch(loginUser(attempt.data.user));
        save("token", attempt.data.token);
        router.replace("/home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.Header}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.5)"
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Pressable
        onPress={() => {
          LoginHandler();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  Header: {
    marginTop: 50,
    height: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  LoginText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  textInput: {
    height: 40,
    width: "95%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  form: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 20,
  },
});
