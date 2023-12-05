import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Nav from "./components/Nav";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MovieScreen from "./screens/MovieScreen";
import { login, logout, selectUser } from "./slices/userSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./stores/store";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "./firebase";
import { RootSiblingParent } from "react-native-root-siblings";
import ProfileScreen from "./screens/ProfileScreen";
function Stacks() {
  const Stack = createStackNavigator();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userToken = await userAuth.getIdToken();
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            userToken: userToken,
          })
        );
      } else if (!userAuth) {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="movie"
              component={MovieScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile"
              component={ProfileScreen}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 10,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Stacks />
      </RootSiblingParent>
    </Provider>
  );
}
