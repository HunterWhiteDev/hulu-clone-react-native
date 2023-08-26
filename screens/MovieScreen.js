import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
const MovieScreen = ({ route: { params }, navigation }) => {
  const { movie, related } = params;
  const { url, title, name, overview } = movie;
  const base_url = "https://image.tmdb.org/t/p/original";

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [movie]);

  const MoviePoster = ({ movie, movies }) => {
    const url = `${base_url}/${movie.backdrop_path || movie.poster_path}`;

    return (
      <Pressable
        onPress={() =>
          navigation.navigate("movie", {
            movie: { ...movie, url },
            related: movies,
          })
        }
      >
        <Image
          style={{ width: 112.5, height: 162.5, margin: 7.5 }}
          source={{
            uri: url,
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.movieScreen}>
      <StatusBar style="light" backgroundColor="#000" />

      <ScrollView ref={scrollRef}>
        <View>
          <Image style={styles.banner} source={{ uri: url }} />
          <View style={styles.overlay} />
          <Text style={styles.heading}>{title || name}</Text>
          <Pressable style={{ ...styles.button, bottom: 65 }}>
            <Text style={styles.buttonText}>Watch Now</Text>
          </Pressable>
          <Pressable
            style={{ ...styles.button, backgroundColor: "white", zIndex: 10 }}
          >
            <Text style={{ ...styles.buttonText, color: "black" }}>
              Add To Watch List
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            ...styles.text,
            fontSize: 20,
            padding: 10,
            textAlign: "center",
          }}
        >
          {overview}
        </Text>

        <Text style={{ color: "white", fontSize: 28, marginLeft: 20 }}>
          {" "}
          Related Titles{" "}
        </Text>

        <View>
          <FlatList
            scrollEnabled={false}
            data={related}
            renderItem={({ item }) => (
              <MoviePoster
                navigation={navigation}
                movie={item}
                movies={related}
              />
            )}
            keyExtractor={(movie) => movie.id}
            numColumns={3}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  movieScreen: {
    marginTop: 20,
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    color: "white",
  },

  banner: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  heading: {
    color: "white",
    position: "absolute",
    fontSize: 40,
    top: "10%",
    left: 0,
    right: 0,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  overlay: {
    backgroundColor: "#000000a6",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 250,
  },

  button: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    backgroundColor: "red",
    width: 200,
    height: 35,
    padding: 5,
    borderRadius: 5,
    zIndex: 0,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default MovieScreen;
