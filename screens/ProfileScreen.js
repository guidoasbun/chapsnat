import { Text, View } from "react-native";
import firebase from "@firebase/app";
import * as React from "react";

export default function ProfileScreen() {
  console.log(firebase.auth().currentUser);
  return (
    <View>
      <Text>{firebase.auth().currentUser.displayName}</Text>
    </View>
  );
}