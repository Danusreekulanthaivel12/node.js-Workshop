const fs = require("fs");
const Movie = require("../models/movies");
const { updateMovie } = require("../controllers/movies");

/**
 * Get all movies from the JSON file
 * @returns {Array} Array of movies
 */
const getAllMovies = async () => {
  //   const movies = fs.readFileSync("./movies.json");
  //   const moviesJson = JSON.parse(movies);
  //   return moviesJson;
  return await Movie.find();
};

/**
 * Get a movie by its Id
 * @param {string} id
 * @returns
 */
const getMovieById = async (id) => {
  const movies = await Movie.findById(id);
  //   console.log(movies);
  return movies;
  //   const movies = getAllMovies();
  //   return movies.find((movie) => movie.id === id);
};

/**
 * Add a new movie to the JSON file
 * @param {string} name
 * @param {string} genre
 */
const addMovie = async ({ name, genre, favouriteStatus, posterLink, plot }) => {
  // const movies = getAllMovies();
  // const newMovie = { id: movies.length + 1, name, genre };
  // movies.push(newMovie);
  // fs.writeFileSync('./movies.json', JSON.stringify(movies));

  const movie = new Movie({
    name: name,
    genre: genre,
    favouriteStatus: favouriteStatus,
    posterLink: posterLink,
    plot,
  });

  await movie.save();
};

const updateFavoriteStatus = async (id, status) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { favoriteStatus: status },
    { new: true }
  );
  return updatedMovie;
};

const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateFavoriteStatus,
};
