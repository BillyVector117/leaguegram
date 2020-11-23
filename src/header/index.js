/* Insertara el Header en el contenido, para que se visualize justo antes delos 2 segundos de carga del contenido */
const yo = require('yo-yo')/* Requerimos Libreria Yo-yo*/
const translate = require('../translate');//Requerimos el index del modulo/carpeta translate para traducir cualquier texto de la pagina
const empty = require('empty-element'); /* Requerir empty-element, una libreria para eliminar el contenido dentro de un elemento del DOM seleccionado */
const el = yo`    <nav class="header">
<div class="nav-wrapper">
    <div class="container">
        <div class="row">
            <div class="col s12 m6 offset-m1">
                <a href="/" class="brand-logo leagueGram">LeagueGram</a>
            </div>
            <div class="col s2 m6 push-s10 push-m10">
            <a href="#!" class="dropdown-trigger btn btn-large btn-flat dropdown-button" data-target="drop-user">
                <i class="fa fa-user"></i>
            </a>
            <ul id="drop-user" class="dropdown-content">
                <li><a href="#!"> ${translate.message('logout')} </a></li> <!-- Sección del dropdown salir (Log out)-->
            </ul>
            </div>
        </div>
    </div>
</div>
</nav>`;
//Exportar un middleware para que el nav solo sea visible en la Home y no en signup/signin
module.exports = function header(ctx, next) {
    //Agregar al Html (pug) esta vista, (nav)
    const container = document.getElementById('header-container')//Seleccionamos el elemento del header el Html (pug)
    empty(container).appendChild(el); //Eliminar el contenido del elemento container, de lo contrario al recargar la pagina tendriamos navs duplicados
    next();

}//Se debe hacer el require de este modulo o ruta en el archivo raiz.















