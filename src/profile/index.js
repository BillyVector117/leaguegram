/* Definimos las rutas ( en este archivo solo el username), asi como sus funciones y contenido (usando libreria yo-yo-jo), estas rutas tambien se definen en el archivo server.js*/
const page = require('page'); /* Requerir page (libreria para desarrollar las one-page-aplications) */
const empty = require('empty-element'); /* Requerir empty-element, una libreria para eliminar el contenido dentro de un elemento del DOM seleccionado */
let main = document.getElementById('main-container');/* Guarda el elemento main-container del archivo HTML */
let template = require('./template');/* Requerimos el contenido del archivo template (la plantilla de username) que es un archivo exportado dentro de ese  mismo archivo(template) */
const header = require('../header'); //Requerir el archivo de la carpeta headerp ara colocar el nav en cualquier ruta que queramos
/* Usando ES6 para importar:
import page from 'page'
import empty from 'empty-element' 
import template from './template' //... etc.
*/
//En esta ruta ( /username) se mostrara la pagina del perfil de usuario, apoyandonos de la libreria yo-yo para colocar html como literal strings 

//Obtener del contexto el username (sera la ruta),obtener los datos de manera asincrona con loadUser, cargar el header, llamar al siguiente middleware
page('/:username', loadUser, header, (ctx, next) => { //Serie de middlewares
    document.title = `LeagueGram- ${ctx.params.username}`;//Modificar titulo del HTML, del contexto (/username) obtener el nombre del usuario 
    //Le pasamos a la función template (objeto de la estructura HTML) el ctx, el template lo usara para mostrarnos o renderizarnos el perfil de user 
    empty(main).appendChild(template(ctx.user)); //Limpiar contenido de main y agregar un elemento (template) para que no se repita cada que se recargue la pagina, le pasamos por parametro el objeto con su contexto ya cargado. 
    $('.modal-trigger').on();
}) 
page('/:username/:id', loadUser, header, (ctx, next) => {
    /* Cada vez que entremos a username, el titulo del html sera este */
    document.title = `LeagueGram- ${ctx.params.username}`;//Titulo,  Ruta username, del contexto (/username) obtener el nombre del usuario 
    //Le pasamos a la función template (objeto de la estructura HTML) el ctx, el template lo usara para mostrarnos o renderizarnos el perfil de user 
    empty(main).appendChild(template(ctx.user)); //Limpiar contenido de main y agregar un elemento (template) para que no se repita cada que se recargue la pagina, le pasamos por parametro el objeto con su contexto ya cargado. 
      $(document).ready(function(){
        $(`#modal${ctx.params.id}`).modal();
      });
      

});


async function loadUser (ctx, next) {//Funcion asincrona para obtener los datos, necesitamos instalar babel-plugin-syntax-async-function
    try {//Intenta...
        //Await para hacer un llamado asincronico dentro de una función asincrona
        ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())//fetch devuelve una promesa, dentro de then tenemos la respuesta y devolvemos esa respuesta en .json, eso devuelve otra promesa.
        next(); //Una vez tenemos al user en el contexto llamamos a next, donde se llama el siguiente middleware (esta función)
    } catch (err) {//Obtenemos un error si es que hay
        console.log(err);// Muestra por consola el error 
    }
}           











