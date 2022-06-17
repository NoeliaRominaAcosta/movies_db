

module.exports = (sequelize, DataTypes)=>{
    const alias ="Genre";
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
        name : {
            type : DataTypes.STRING(100), //el valor debe ser el mismo que en la tabla
            allowNull : false
        },
        ranking :{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true
        },
        active : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            default : 1 //si no mandas info desde afuera manda 1
        },

    };
    const config ={
        tableName : "genres", //le digo que no empieza con mayusucula, sino con minuscula. es porque al deployar genera error
        /* timesTamps : true    si la tabka tiene marcas de tiempo no es necesario esta configuracion. si no tiene, pongo false */ 
        timesTamps : true,
        underscored : true    
    };
    /* deficion del modelo */
    const Genre = sequelize.define(alias,cols,config); 
    return Genre;
}