//Typically we would store in {process.env.API_KEY}
const API_KEY = "56c592795b216ba8d10ccb473ce9af81";
const base_url = "https://api.themoviedb.org/3";

const requests = {
  // fetchTrending: `${base_url}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${base_url}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentiaries: `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
