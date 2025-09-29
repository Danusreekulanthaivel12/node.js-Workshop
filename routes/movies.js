const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const { verifyToken } = require('../middlewares/auth');

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", verifyToken, postMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
