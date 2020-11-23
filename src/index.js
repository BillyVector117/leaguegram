/* Este documento es el archivo principal JS antes de ser compilado por gulp */
/* const moment = require('moment'); // Requerir libreria Moment para agregar fecha 
require('moment/locale/es'); //Requerir idioma en especifico (es,jp,cs,etc.)
require('moment/locale/en-gb'); // Requerir idioma en especifico (es,jp,cs,etc.)
moment.locale('en-gb'); // Seteamos el idioma (moment.js) */
require('babel-polyfill');
const page = require('page');/* Requerimos page (libreria para que la página funcione sin recargar (npm i--save page)) */
//Format.js (new version)
/* import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-relativetimeformat/locale-data/es' // locale-data for es */

/* Evento para que funcione el dropdown (Cambiar lenguaje) de Materialize */
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });
/* Finaliza el evento de Materialize */

require('./homepage');
require('./signup');
require('./signin');
require('./profile');
require('./footer');


/* require('./header'); //Solo estara incluido en la Homepage */
page()/* page.start(), Invoca el modulo de page */







//Referencia a la definición de rutas.
/* main.innerHTML = 'Home <a href="/signup">Signup</a'; // Dira en la ruta: /home, ademas sera un enlace hacia Signup 
 */
/* main.innerHTML = 'Signup <a href="/">Home</a'; // Dira en la ruta: /signup, ademas tendra el enlace hacia Home
 */

