import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase/app"
import db from "./firebase";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("Chats")
      .doc("mysecondchat")
      .get()
      .then((snapshot) => {
        setMessages(snapshot.data().messages);

        console.log(snapshot.id);
        console.log(snapshot.data());
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    db.collection("Chats").doc("mysecondchat").update({ messages: firebase.firestore.FieldValue.arrayUnion(messages[0]) });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
        name: "Guido",
        avatar: "https://git-readme-images.s3.amazonaws.com/image1.png",
      }}
      placeholder={"Enter Your Mesage Here"}
      inverted={true}
      showUserAvatar={true}
      alwaysShowSend={true}
      renderUsernameOnMessage={true}
    />
  );
}
