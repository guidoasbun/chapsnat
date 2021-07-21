import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import firebase from "@firebase/app";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createStackNavigator();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    firebase.auth().currentUser ? true : false
  );

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(user ? true : false);
    });
  }, []);

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs">
            {isSignedIn ? (
              <>
                <Stack.Screen name="Tabs" component={BottomTabNavigator} />
                <Stack.Screen name="Chat" component={ChatScreen} />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
