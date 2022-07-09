const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router
    .get('/movies', moviesController.list)
    .get('/movies/new', moviesController.new)
    .get('/movies/recommended', moviesController.recomended)
    .get('/movies/detail/:id', moviesController.detail)
//crud
    .get('/movies/add', moviesController.add)
    .post('/movies/create', moviesController.create)
    .get('/movies/edit/:id', moviesController.edit)
    .put('/movies/update/:id', moviesController.update)

module.exports = router;