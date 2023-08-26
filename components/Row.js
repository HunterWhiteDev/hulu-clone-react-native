import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Row = ({ url, title, base_url, navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(url);
      setMovies(response.data.results);
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
          style={styles.movies}
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

styles = StyleSheet.create({
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
