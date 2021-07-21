import firebase from "@firebase/app";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [imageURI, serImageURI] = useState(null);

  var user = firebase.auth().currentUser;
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

  const handleCamera = async () => {
    if (Platform.OS !== "web") {
      let permissions = await ImagePicker.getCameraPermissionsAsync();
      if (!permissions.granted) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      console.log(result.uri);
      setImageURI(result.uri);
    }
  };

  const onEditAvatar = () => {
    showActionSheetWithOptions(
      {
        options: ["Camera", "Image Library", "Cancel"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        console.log(buttonIndex);
        if (buttonIndex === 0) {
          handleCamera();
        } else if (buttonIndex === 1) {
        } else if (buttonIndex === 2) {
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={onEditAvatar}>
              <Image style={styles.userImage} source={{ uri: image }} />
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
        </>
      ) : (
        <View></View>
      )}
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
    justifyContent: "center",
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
