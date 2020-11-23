/* Definimos las rutas ( en este archivo solo el signup), asi como sus funciones y contenido (usando libreria yo-yo-jo), estas rutas tambien se definen en el archivo server.js*/
const page = require('page'); /* Requerir page (libreria para desarrollar las one-page-aplications) */
const empty = require('empty-element'); /* Requerir empty-element, una libreria para eliminar el contenido dentro de un elemento del DOM seleccionado */
const template = require('./template');/* Requerimos el contenido del archivo template (la plantilla de signup) que es un archivo exportado dentro de ese  mismo archivo(template*/
const main = document.getElementById('main-container');/* Guarda el elemento main-container del archivo HTML */
/* En esta parte ( /signup) se mostrara la pagina del formulario para hacer signup, apoyandonos de la libreria yo-yo para colocar html como strings. */
page('/signup', (ctx,next)=> {/* Ruta signup,  */
    /* Cada vez que entremos a signup, el titulo del html sera este */
    document.title = "LeagueGram-Signup";/* Para modificar el titulo/tag (del HTML) de la pagina web */
        /* Borra de la esquina superior izquierda los enlaces hacia el mismo signup, estando en la pagina signup, usamos empty para ello. */
        empty(main).appendChild(template); /* agrega al elemento main (en pug esta vacio) el contenido del archivo template (el formulario e imagen) pero pasandolo con empty para que quede vacio (empty es la libreria empy-element) */
    })              