const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", postMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
