import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const MovieSearch = () => {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState({});
  const [error, setError] = useState("");

  const searchMovie = async () => {
    if (!movieName) {
      setError("Ingresa el nombre de una película");
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movieName}&apikey=8c58db6a`
      );

      if (!response.ok) {
        setError("error");
        return;
      }

      const data = await response.json();

      setMovieData(data); // `data.Search` es el array con todas las coincidencias
    } catch (err) {
      setError("Hubo un error al realizar la búsqueda.");
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Películas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de una película"
        value={movieName}
        onChangeText={(text) => setMovieName(text)}
      />
      <TouchableOpacity onPress={searchMovie} style={styles.button} >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView>
          <View key={movieData.imdbID} style={styles.movieContainer}>
            <Image
              style={styles.poster}
              source={{
                uri:
                  movieData.Poster !== "N/A"
                    ? movieData.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image",
              }}
            />
            <Text style={styles.movieTitle}>{movieData.Title}</Text>
            <Text style={styles.moviePlot}>{movieData.Plot}</Text>
            <Text style={styles.movieYear}>{movieData.Year}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderColor: "#dddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#ffff",
    color: "#3333",
  },
  button: {
    backgroundColor: "#5a67d8",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#e53e3e",
    textAlign: "center",
    marginTop: 10,
  },
  movieContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    borderColor: "#e2e8f0",
    borderWidth: 1,
  },
  poster: {
    width: 180,
    height: 270,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  moviePlot: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  movieYear: {
    fontSize: 16,
    color: "#5a67d8",
    textAlign: "center",
    marginTop: 5,
  },
});

export default MovieSearch;
