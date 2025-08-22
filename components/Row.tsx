import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import movieTrailer from "movie-trailer";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["movie-trailer"]);
const Row = ({ url, title, base_url, navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(url);
      const moviesRes = response.data.results;
      console.log(moviesRes);
      let moviesArr = [];
      for (const movie of moviesRes) {
        const urlRes = await movieTrailer(`${movie.title || movie.name}`);

        if (urlRes) {
          const index = urlRes.lastIndexOf("v=");
          const trailerUrl = urlRes.slice(index + 2, urlRes.length);
          moviesArr.push({ ...movie, trailerUrl });
        }
      }
      setMovies(moviesArr);
      setIsLoading(false);
    };

    getMovies();
  }, []);

  const MoviePoster = ({ movie }) => {
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
          style={{ width: 100, height: 150, margin: 5 }}
          source={{
            uri: url,
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.row}>
      <Text style={{ color: "white", fontSize: 25, marginLeft: 5 }}>
        {title}
      </Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          horizontal={true}
          data={movies}
          renderItem={({ item }) => <MoviePoster movie={item} />}
          keyExtractor={(movie) => movie.id}
          extraData={isLoading}
        />
      )}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    margin: 5,
    marginTop: 25,
    marginLeft: 15,
  },

  heading: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },

  movieImage: {
    margin: 5,
  },
});
