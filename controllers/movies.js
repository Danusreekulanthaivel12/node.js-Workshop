const movieServices = require("../services/movies");

/**
 * Get all movies
 * @param {object} req
 * @param {object} res
 */
const getMovies = async (req, res) => {
  const movies = await movieServices.getAllMovies();
  res.status(200).send(movies);
};

/**
 * Get id from the path param and fetch the movie by using movie service
 * @param {object} req
 * @param {object} res
 */
const getMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movies = await movieServices.getMovieById(id);
    movies
      ? res.status(200).send(movies)
      : res.status(404).send({ message: "Movie not found" });
  } catch (error) {
    console.log("Error getting movie:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }

  // res.status(200).send(movies);
};

/**
 * Check if name and genre are present in the request body and then add the movie
 * @param {object} req
 * @param {object} res
 */
const postMovie = async (req, res) => {
  try {
    const { name, genre, favouriteStatus, posterLink, plot } = req.body;
    if (!name || !genre || !favouriteStatus || !posterLink || !plot) {
      res.status(400).send({ message: "Name and genre are required" });
    } else {
      await movieServices.addMovie(req.body);
      res.status(201).send({ message: "Movie added successfully" });
    }
  } catch (error) {
    console.log("Error getting movie:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { favouriteStatus } = req.body;
    if (typeof favouriteStatus !== "boolean") {
      return res
        .status(400)
        .send({ message: "favoriteStatus must be a boolean" });
    }
    const updatedMovie = await movieServices.updateFavoriteStatus(
      id,
      favouriteStatus
    );
    if (updatedMovie) {
      res.status(200).send({
        message: "Favorite status updated successfully",
        movie: updatedMovie,
      });
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  } catch (error) {
    console.log("Error updating favorite status:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await movieServices.deleteMovie(id);
    deletedMovie
      ? res.status(200).send({ message: "Movie deleted Successfully" })
      : res.status(404).send({ message: "Movie not Found" });
  } catch (error) {
    console.log("Error updating favorite status:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getMovies, getMovie, postMovie, updateMovie, deleteMovie };
