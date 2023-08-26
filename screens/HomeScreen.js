import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import Banner from "../components/Banner";
import requests from "../requests";
import Row from "../components/Row";
import Nav from "../components/Nav";
import { StatusBar } from "expo-status-bar";
// import { StatusBar } from "expo-status-bar";
export default function HomeScreen({ navigation }) {
  const base_url = "https://image.tmdb.org/t/p/original";

  const scrollY = new Animated.Value(5);
  const opacity = scrollY.interpolate({
    inputRange: [1, 75], // Opacity range: fully transparent to fully opaque
    outputRange: [1, 0], // Adjust color as needed
    extrapolate: "clamp",
  });

  return (
    <View style={{ marginTop: 20 }}>
      <StatusBar style="light" backgroundColor="#000" />

      <Nav navigation={navigation} opacity={opacity} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        style={{ ...styles.home }}
      >
        <Banner base_url={base_url} />

        <Row
          title={"Trending Now"}
          url={requests.fetchTopRated}
          base_url={base_url}
          navigation={navigation}
        />
        <Row
          title={"Action Movies"}
          url={requests.fetchActionMovies}
          base_url={base_url}
          navigation={navigation}
        />

        <Row
          title={"Comedies"}
          url={requests.fetchComedyMovies}
          base_url={base_url}
          navigation={navigation}
        />

        <Row
          title={"Horror"}
          url={requests.fetchHorrorMovies}
          base_url={base_url}
          navigation={navigation}
        />

        <Row
          title={"Romance"}
          url={requests.fetchRomanceMovies}
          base_url={base_url}
          navigation={navigation}
        />
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    zIndex: 0,
    backgroundColor: "black",
  },

  backgroundImg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    elevation: 0,
  },
});
