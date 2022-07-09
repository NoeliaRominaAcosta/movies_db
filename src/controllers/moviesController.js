const { Op } = require('sequelize');
const db = require('../database/models');
const moment = require('moment');
//lee el archivo index que tiene un module.exports

module.exports = {
    list : (req,res) => {
        //hago la consulta, lo que seria select * from movies
        //movie lo saco de Movie.js
        db.Movie.findAll() //no lo destructuro porque son solo dos letras de constante
            .then(movies => {
                return res.render('moviesList', {movies}) //es una promesa, luego que se cumple recibo las peliculas y las manda
                
            })
            .catch(error => console.log(error)) //en caso de que no funcione
    },
    detail : (req,res) => {
        db.Movie.findByPk(req.params.id)/* Finding a user by their primary key. */
            .then(movie => {
                return res.render('moviesDetail',{
                    movie
                }) //es una promesa, luego que se cumple recibo las peliculas y las manda
                
            })
            .catch(error => console.log(error))
    },
    new :(req,res) => {
        db.Movie.findAll({
            order : [//esto viene de playground
               // ['nombre', 'ASC'] //nombre de la columna que esta en el modelo y criterio
                ['release_date', 'DESC'] //
            ],
            limit : 5  //cantidad de resultados que quiero
        })
        .then(movies => res.render('newestMovies',{movies}))
        .catch(error => console.log(error))
    },
    recomended : (req,res) => {
        db.Movie.findAll({
            where : {
               /* A way to do a query in sequelize. */
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order : [
                ['rating', 'DESC']
                ['awards', 'DESC']
            ]
            .then(movies => res.render('recommendedMovies',{movies}))
            .catch(error => console.log(error))
        })
    },
      add: function (req, res) {
        //acceder a genre qye esta en modelos
        db.Genre.findAll({
            order : [
                ['name','ASC']
            ]//las ordena en orden alfabetico
        })
            .then(genres => {
               /*  return res.send(genres) */ //lo hacemos para ver lo que llega para ver como te esta mandando
                return res.render('moviesAdd', {
                    genres
                }) 
            }) //cuando lo encuentra renderiza la vsta
        .catch(error => console.log(error));
    },
    create: function (req, res) {
        const {title,awards, release_date,genre_id,rating,length} = req.body
       db.Movie.create({
        title : title.trim(),
        awards : +awards,
        release_date,
        genre_id : +genre_id,
        rating : +rating,
        length: +length
       })//el create me da el elemento recien creado 
       .then(movie => {
        console.log(movie);
        return res.redirect('/movies/detail/' + movie.id)
       })
       .catch(error => console.log(error))
    },
    edit: function(req, res) {
       const movie = db.Movie.findByPk(req.params.id)
       const genres = db.Genre.findAll({
        order : ['name']
       })
       Promise.all([movie,genres]) //le paso todas las promesas
        //necesito mandar tambien el genero por eso uso promise all
        .then(([movie,genres]) => {//al then le paso la promise all
            return res.render('moviesEdit',{
                Movie : movie,
                release_date : moment(movie.release_date).format('YYY-MM-DD'),//hay que cambiar el formato porque en sql es diferente
                genres
            })
        })
        .catch(error => console.log(error))
    },
    update: function (req,res) {
        // dos objetos : que queres editar, donde queres editarlo
        const {title,awards, release_date,genre_id,rating,length} = req.body

        db.Movie.update(
            { 
                title : title.trim(),
                awards : +awards,
                release_date,
                genre_id : +genre_id,
                rating : +rating,
                length: +length

            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then(() => res.redirect('/movies'))
        .catch(error => console.log(error))

    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then(movie => res.render('moviesDelete',{
            movie
        })).catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.movie.destroy({
            where : {
                id : req.params.id
            }
        }).then(() => res.redirect('/movies'))
        .catch(error => console.log(error))
    }
}