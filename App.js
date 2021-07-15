import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Message 1",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Guido",
          avatar: "https://git-readme-images.s3.amazonaws.com/image1.png",
        },
      },
      {
        _id: 2,
        text: "Message 2",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native Bot",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 3,
        text: "Message 3",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Guido Asbun",
          avatar: "https://git-readme-images.s3.amazonaws.com/image1.png",
        },
      },
      {
        _id: 4,
        text: "Message 4",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native Bot",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
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
