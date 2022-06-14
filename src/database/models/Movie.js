/* el modelo es la representacion a nivel de codigo de la tabla
si quiero crear una pelicula la guardo en la tabla peliculas y esa pelicula
a nivel de codigo es un objeto literal por eso es en singular */
/* 
const Movie = sequelize.define(alias,tols,config); 
return Movie; */
module.exports = (sequelize, DataTypes)=>{
    const alias ="Movie";
    const cols = {
        /* tantas propiedades como columnas existan en la tabla 
        necesitamos el diagrama de entidad relacoin de la base de datos
        vamos a database en mysql y buscamos el diagrama invertido*/
       //las restricciones las vemos abriendo las cajas de cada tabla en mysql , pk, nn, uq, etc
       
        id : {
            type : DataTypes.INTEGER.UNSIGNED,//unsigned comprueba que nunca sea negativo el id
            autoIncrement : true,
            allowNull : false, //not null en la tabla
            primaryKey: true
        },
        title : {
            type : DataTypes.STRING(500), //el valor debe ser el mismo que en la tabla
            allowNull : false
        },
        rating :{
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            default : 0 //si no mandas info desde afuera manda 0
        },
        release_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        length : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        genre_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },

    };
    const config ={
        tableName : "movies", //le digo que no empieza con mayusucula, sino con minuscula. es porque al deployar genera error
        /* timesTamps : true    si la tabka tiene marcas de tiempo no es necesario esta configuracion. si no tiene, pongo false */ 
        timesTamps : true,
        underscored : true    
    };
    /* deficion del modelo */
    const Movie = sequelize.define(alias,cols,config); 
    return Movie;
}