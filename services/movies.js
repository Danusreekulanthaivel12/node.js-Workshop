const fs = require('fs');
const getAllMovies = () => {
    const movies = fs.readFileSync('./movies.json');
    const moviesJson = JSON.parse(movies);
    return moviesJson;
}
const getMovieById = (id) => {
    const movies = getAllMovies();
    return movies.find(movie => movie.id === id);
}

const addMovie = (name, genre) => {
    const movies = getAllMovies();
    const newMovie = { id: movies.length + 1, name, genre };
    movies.push(newMovie);
    fs.writeFileSync('./movies.json', JSON.stringify(movies));
}
module.exports = { getAllMovies, getMovieById, addMovie };