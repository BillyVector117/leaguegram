const IntlRelativeFormat = require('intl-relativeformat');//Requerimos la libreria intl-relativetime para colocar el tiempo relativo
new IntlRelativeFormat('en', { style: 'best fit' }).format(Date.now() - 1000);// Agregamos el idioma a usar
const rf = new IntlRelativeFormat('en-US'); //Modificar fechas 
const IntlMessageFormat = require('intl-messageformat').default

const es = require('./es');// Requerir archivo con configuración traduccion es
const en = require('./en-US');// Requerir archivo con configuración traduccion en-US
let MESSAGES = {};//Objeto para guardar los mensajes

MESSAGES.es = es; //La propiedad es tendra el objeto que esta siendo importado como es.
MESSAGES['en-US'] = en;//La propiedad es tendra el objeto que esta siendo importado como en, tambien se puede escribir message.es-EU=....
const locale = localStorage.locale || 'en-US'; //Si hay un valor definido en el localStorage, usalo, en cambio si no hay un valor predefiido usa idioma en.

//Exportar el objeto que contendra la traduccion (dos propiedades, message y)
module.exports =  {
    message: (text, opts) => { //La funcion se le pasara el mensaje y opciones recibe un valor por defecto que sera un objeto vacio
        opts = opts || {};
        const msg = new IntlMessageFormat(MESSAGES[locale][text], locale,); //Crear message format para traducir cada uno de los textos, 1er parametro es el mensaje, 2do el locale (es,us,etc), 3ro el formato(aqui sera null)
        return msg.format(opts);
    },
    //date ayuda a traducir las relativeFormat
    date: new IntlRelativeFormat(locale)
}














