import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
  } from "react-native";
  
  import React, { useState } from "react";
  import firebase from "@firebase/app";
  import Colors from "../constants/Colors";
  
  export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const onPressLogin = async () => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(login_Success, login_Failed);
    };
  
    const login_Success = () => {
      console.log("SUCCESS");
    };
  
    const login_Failed = () => {
      alert("Login failure. Please try again.");
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
  
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={onPressLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const resizeMode = "center";
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.snapyellow,
    },
    inputContainer: {
      borderBottomColor: "#F5FCFF",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      borderBottomWidth: 1,
      borderBottomWidth: 1,
      width: 300,
      height: 45,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: "#FFFFFF",
      flex: 1,
    },
    buttonContainer: {
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      width: 300,
      borderRadius: 30,
      backgroundColor: "transparent",
    },
    loginButton: {
      backgroundColor: Colors.snapblue,
    },
    loginText: {
      color: "white",
      fontWeight: "bold",
    },
    btnText: {
      color: "black",
      fontWeight: "bold",
    },
  });