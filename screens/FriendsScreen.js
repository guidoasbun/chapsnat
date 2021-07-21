import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import CustomMultiPicker from "react-native-multiple-select-list";

import * as React from "react";
import { useState, useEffect } from "react";
import Colors from "../constants/Colors";

const userListDemo = {
  123: "Jenny",
  124: "Ashwin",
  125: "Pavan",
};

export default function FriendsScreen() {
  const [chatName, setChatName] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // download user list from Firebase
  }, []);

  const onPressCreateChat = () => {
    console.log("Create Chat button pressed!");
    // Create new chat in Firebase
  };

  return (
    <View>
      <View style={styles.friendListContainer}>
        <CustomMultiPicker
          options={userListDemo}
          search={true} // should show search bar?
          multiple={true} // allow multiple select
          placeholder={"Search"}
          placeholderTextColor={"#757575"}
          returnValue={"value"} // label or value
          callback={(selected) => {
            selected = selected.filter((user) => user !== undefined);
            setSelectedUsers(selected);
          }} // callback, array of selected items
          rowBackgroundColor={"#eee"}
          rowHeight={45}
          rowRadius={5}
          searchIconName="ios-checkmark"
          searchIconColor="red"
          searchIconSize={30}
          iconColor={"#00a2dd"}
          iconSize={30}
          selectedIconName={"ios-checkmark-circle-outline"}
          unselectedIconName={"ios-radio-button-off-outline"}
          scrollViewHeight={300}
        />
      </View>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.newChatContainer}>
          <Text>New chat name:</Text>
          <TextInput style={styles.chatNameInput} onChangeText={setChatName} />
          <Button
            onPress={onPressCreateChat}
            title="Create Chat"
            color={Colors.snapblue}
            accessibilityLabel="Create Chat"
            disabled={chatName.length < 1 || selectedUsers.length < 1}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const offset = 16;
const styles = StyleSheet.create({
  newChatContainer: {
    margin: offset,
    padding: offset,
    borderRadius: offset,
    backgroundColor: Colors.snapyellow,
  },
  chatNameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
    fontSize: offset,
  },
});
