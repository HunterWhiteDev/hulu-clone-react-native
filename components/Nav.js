import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";

const Nav = ({ opacity, navigation }) => {
  return (
    <Animated.View
      style={{
        ...styles.imagesContainer,
        opacity: opacity,
      }}
    >
      <Pressable onPress={() => navigation.navigate("home")}>
        <Image
          style={{ ...styles.image, height: 50, width: 30 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1128px-Netflix_2015_N_logo.svg.png",
          }}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("profile")}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
          }}
          style={styles.image}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    paddingTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    zIndex: 5,
    elevation: 5,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },

  image: {
    height: 40,
    width: 40,
  },
});

export default Nav;
