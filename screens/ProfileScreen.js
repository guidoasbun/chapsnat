import firebase from "@firebase/app";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  var user = firebase.auth().currentUser
  const onPressLogout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        var errorMessage = error.message;
        // An error happened.
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerColumn}>
        <TouchableOpacity onPress={() => alert("edit!")}>
          <Image style={styles.userImage} source={{}} />
        </TouchableOpacity>
        <Text style={styles.userNameText}>{user.displayName}</Text>
        <View style={styles.Row}>
          <Text style={styles.descriptionText}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.Row}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.logoutButton]}
          onPress={onPressLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerColumn: {
    backgroundColor: "transparent",
    paddingBottom: 20,
    paddingTop: 45,
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'center'
  },
  descriptionText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
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
  logoutButton: {
    backgroundColor: Colors.snapblue,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
