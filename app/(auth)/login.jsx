import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
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
      <Pressable style={styles.button}>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
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
});
