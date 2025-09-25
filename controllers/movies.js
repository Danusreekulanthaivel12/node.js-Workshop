const movieServices = require("../services/movies");

const getMovies = (req, res) => {
  const movies = movieServices.getAllMovies();
  res.status(200).send(movies);
};
const getMovie = (req, res) => {
  const id = req.params.id;
  const movies = movieServices.getMovieById(id);
  movies
    ? res.status(200).send(movies)
    : res.status(404).send({ message: "Movie not found" });
  // res.status(200).send(movies);
};

const postMovie = (req, res) => {
  const { name, genre } = req.body;
  if (!name || !genre) {
    return res.status(400).send({ message: "Name and genre are required" });
  }
  movieServices.addMovie(name, genre);
  res.status(201).send({ message: "Movie added successfully" });
};
module.exports = { getMovies, getMovie, postMovie };
