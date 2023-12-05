import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { login, signUp, auth } from "../firebase";
export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = () => {
    login(auth, email, password)
      .then((authUser) => {})
      .catch((error) => {
        // Toast.show(error.message, {
        //   duration: 10000,
        //   backgroundColor: "red",
        //   textColor: "white",
        // });
      });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Image
        style={styles.image}
        source={{
          uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
        }}
      />

      <View
        style={{
          backgroundColor: "#000000bc",
          padding: 20,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.loginHeading}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={(e: string) => setEmail(e)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="password"
          onChangeText={(e: string) => setPassword(e)}
        />

        <Pressable onPress={signIn} style={styles.button}>
          <Text style={{ ...styles.text, fontSize: 20 }}>Login</Text>
        </Pressable>
        <Pressable style={{ ...styles.button, backgroundColor: "#242424" }}>
          <Text
            style={{
              ...styles.text,
              fontSize: 20,
            }}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000",
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#12111a",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 150,
    marginTop: -250,
  },
  textInput: {
    width: 300,
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#dbdad5",
    borderRadius: 5,
  },
  loginHeading: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
  },

  button: {
    backgroundColor: "red",
    color: "red",
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    width: 300,
  },
});
