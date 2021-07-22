import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "@firebase/app";

export default function ChatScreen({ route }) {
  var user = firebase.auth().currentUser;
  
  const [messages, setMessages] = useState([]);
  const { chatname } = route.params;

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc(chatname)
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!");
        let newMessages = snapshot.data().messages.map((singleMessage) => {
          singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
          return singleMessage;
        });

        setMessages(newMessages);
      });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    db.collection("Chats")
      .doc(chatname)
      .update({
        // arrayUnion appends the message to the existing array
        messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
