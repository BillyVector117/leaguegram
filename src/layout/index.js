/* Template para dar la vista de la barra de navegación/Nav, unicamente es el código <<Html>> (PUG)  */
const yo = require('yo-yo')/* Requerimos Libreria Yo-yo*/
const translate = require('../translate');//Requerimos el index del modulo/carpeta translate para traducir cualquier texto de la pagina

module.exports = function layout(content){/* Función que exportaremos, contiene la estructura del nav, pero debajod e este (contenido) es lo que cambiara, el parametro de la función sera su*/
    return yo`
    <div class="content">
    ${content}
    </div>
   `;
}

