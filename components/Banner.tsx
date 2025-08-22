import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../requests";
import { LinearGradient } from "expo-linear-gradient";

const Banner = ({ base_url }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const movieResult =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ];
        if (!movieResult?.backdrop_path && !movieResult?.poster_path) {
          fetchData();
        }

        setMovie(movieResult);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.banner}>
      <View style={styles.backdropContainer}>
        <Image
          style={styles.backdrop}
          source={
            movie && {
              uri: `${base_url}/${movie?.backdrop_path || movie?.poster_path}`,
            }
          }
        />

        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.26)"].reverse()}
          style={{ ...styles.overlayBottom, top: 0 }}
        />
        <Text style={{ ...styles.heading, zIndex: 10 }}>
          {movie?.name || movie?.title}
        </Text>

        <LinearGradient
          colors={["transparent", "rgba(255, 0, 0, 0.403)"]}
          style={styles.overlayBottom}
        />
        <Pressable style={{ ...styles.button, bottom: 50 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  backdropContainer: {
    position: "relative",
    width: "75%",
    alignSelf: "center",
    borderRadius: 5,
    zIndex: 1,
    elevation: 1,
    marginTop: 100,
  },
  backdrop: {
    width: "100%",
    height: 350,
    alignSelf: "center",
    borderRadius: 10,
    zIndex: 0,
  },
  overlayBottom: {
    zIndex: 0, // Place the overlay above the backdrop imag
    height: "45%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    shadowColor: "black",
    zIndex: 0,
    elevation: 0,
  },

  heading: {
    color: "white",
    position: "absolute",
    alignSelf: "center",
    fontSize: 45,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -5, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: 10,
    zIndex: 0,
    elevation: 0,
  },

  button: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "#12874d",
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

  banner: {
    zIndex: 0,
  },
});

export default Banner;
