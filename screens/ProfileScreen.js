import firebase from "@firebase/app";
import "@firebase/storage";
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
  var user = firebase.auth().currentUser;
  const { showActionSheetWithOptions } = useActionSheet();
  const [imageURI, setImageURI] = useState(user ? user.photoURL : "");

  const onPressLogout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out!");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  const onEditAvatar = () => {
    showActionSheetWithOptions(
      {
        options: ["Camera", "Image Library", "Cancel"],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          handleCamera();
        } else if (buttonIndex == 1) {
          handleLibrary();
        }
        console.log(buttonIndex);
      }
    );
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
      console.log(result);
      setImageURI(result.uri);
      uploadAndUpdateAvatar(result.uri);
    }
  };

  const handleLibrary = async () => {
    if (Platform.OS !== "web") {
      let permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!permissions.granted) {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need media library to make this work!");
        }
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      console.log(result);
      setImageURI(result.uri);
      uploadAndUpdateAvatar(result.uri);
    }
  };

  const uploadAndUpdateAvatar = async (imageURI) => {
    try {
      const filename = imageURI.substring(imageURI.lastIndexOf("/") + 1);
      const response = await fetch(imageURI);
      const blob = await response.blob();

      const uploadTask = firebase
        .storage()
        .ref(user.uid + "/" + filename) // unique path
        .put(blob);
      // set progress state
      uploadTask.on("state_changed", (snapshot) => {
        // Can keep track of upload progress here
        // setTransferred(
        //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        // );
      });

      await uploadTask;
      let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
      console.log(downloadURL);
      user.updateProfile({
        photoURL: downloadURL,
      });
    } catch (e) {
      alert("There was an error uploading your avatar");
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={onEditAvatar}>
              <Image style={styles.userImage} source={{ uri: imageURI }} />
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
    backgroundColor: "white",
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
    borderColor: Colors.tintColor,
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
