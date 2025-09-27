const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
const moviesRouter = require("./routes/movies");
const userRouter = require('./routes/user');

app.use("/movies", moviesRouter);
app.use('/user', userRouter);

app.use("/", (req, res) => {
  res.send("Welcome to Movie Buffet");
});

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log("Database has been connected");
});

app.listen(3000, () => console.log("Server running on port 3000"));
