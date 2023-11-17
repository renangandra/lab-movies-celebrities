const express = require('express');
const router = express.Router();
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get('/', (req, res) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err));
});

router.get('/movies/create', (req, res) => {
    // res.render('movies/new-movie');
    res.send("Route is working!")
});

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie
        .create({ title, genre, plot, cast })
        .then(movie => res.redirect(`/movies`))
        .catch(err => console.log(err));
});

router.get('/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params;
    Movie
        .findById(movie_id)
        .then(movie => res.render('movies/edit-movie', { movie }))
        .catch(err => console.log(err));
});

router.post('/:movie_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    const { movie_id } = req.params;
    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
        .then(movie => res.redirect(`/movies`))
        .catch(err => console.log(err));
});

router.post('/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params;
    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err));
});

module.exports = router;
