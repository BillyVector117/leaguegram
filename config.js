'use strict'
const config = { //Contiene las variables de configuración para AWS
    aws: {//Creación de variables de entorno
        accessKey: process.env.AWS_ACCESS_KEY,
        secretKey: process.env.AWS_SECRET_KEY
    }
}
module.exports = config;
