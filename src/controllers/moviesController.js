const { Op } = require('sequelize');
const db = require('../database/models');

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
                ['rating', DESC]
                ['awards', DESC]
            ]
            .then(movies => res.render('recommendedMovies',{movies}))
            .catch(error => console.log(error))
        })
    }
}