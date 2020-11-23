/* Este documento es la plantilla para la ruta de /Home, /index o la principal, ademas del nav y content */
/* Definimos las rutas ( en este archivo solo el Home), asi como sus funciones y contenido (usando libreria yo-yo-jo), estas rutas tambien se definen en el archivo server.js*/
const page = require('page'); /* Requerir page (libreria para desarrollar las one-page-aplications) */
const empty = require('empty-element'); /* Requerir empty-element, una libreria para eliminar el contenido dentro de un elemento del DOM seleccionado */
const template = require('./template');/* Requerimos el contenido del archivo template (la plantilla de signin) que es un archivo exportado dentro de ese  mismo archivo(template) */
const main = document.getElementById('main-container');/* Guarda el elemento main-container del archivo HTML (pug) */
const request = require('superagent'); /* Libreria para usar Ajax de manera facil (Usa Callbacks)*/
const header = require('../header'); //Requerir el archivo de la carpeta headerp ara colocar el nav en cualquier ruta que queramos
const axios = require('axios');//Requerir la libreria axios para  usar Ajax de manera facil con Promises
/* En esta parte ( /, /Home) se mostrara la pagina del formulario para ver el timeline,estructura de la Home, nav y contenido, apoyandonos de la libreria yo-yo para colocar html como strings. */
//1.Ruta,2.header(midleware) que hara el append del header,3. Uso del loader (Spinner) 4.funcion loadpictures (cargar imagenes del servidor(simulacion de BD))
page('/',header,loading,asyncLoad, (ctx,next)=> {/* Ruta Home, la primera es una función(middleware) seguido de una funcion anonima */
    document.title = "LeagueGram";/* Para modificar el titulo/tag (del HTML) de la pagina web */
        /* A la vista Home, añadimos como parametro pictures, de esta amnera cada picture pasara por una función de crear su estructura card */
        //Se le coloca como parametro los datos ya recibidos en loadPictures, el ctx.pictures
        empty(main).appendChild(template(ctx.pictures)); /* agrega al elemento main (en pug esta vacio) el contenido del archivo template (estructura home, nav y contenido) pero pasandolo con empty para que quede vacio (empty es la libreria empy-element) */
    })
    //ctx. recibe elementos generales de page.js o del request, y next es un apuntador al siguiente middleare (termina llamando a asyncload)
    function loading(ctx,next){ //Función o middleare del loader (Spinner), en pagejs(libreria) se colocan dos parametros en todo middleware
        let el = document.createElement('div'); //Crear elemento div en memoria
        el.classList.add('loader'); //Agregar la clase loader al elemento div
        document.getElementById('main-container').appendChild(el);// Seleccionamos el contenedor main y le agregamos el elemento del loader (div)
        next(); //Llamar al siguiente middleware (asyncLoad), de lo contrario no funcionara (IMPORTANT)
    }
    async function asyncLoad (ctx, next) {//Funcion asincrona para obtener los datos, necesitamos instalar babel-plugin-syntax-async-function
    try {//Intenta...
        //Await detiene la ejecución hasta que la promesa (el fetch) se cumpla, en caso de error habra un catch, de lo contrario se mostrara las pictures
        ctx.pictures = await fetch('/api/pictures').then(res => res.json())//despues de resolver la promesa del fetch e un tiempo determinado por asyncawait, se cuarda en ctx.pictures
        next(); //llamamos a next una vez que las pictures esten seteadas al ctx para que llame al siguiente middleware (Es una función anonima la cual tiene como argumento el contexto (las pitures ya cargadas para usarse))
    } catch (err) {//Si hay un error
        return console.log(err);/* Muestra por consola el error */
    }
}
/* Usando la Libreria superagent (Callbacks)
//Cadena de funciones middlewares que se llaman consecutivamente con su next (si hay un error)
//Definir loadPictures:
function loadPictures(ctx, next) {
    request //Usamos la libreria superagent para hacer el request a nuestro servidor
        .get('/api/pictures')  //colocamos la url de la API
        //Esta funcion es un call back, recibe error en caso de que haya un error y res, donde estaran los datos respectivos del server (200,204,500, y la misma respuesta (pictures))
        .end(function (err, res) { //Como no enviaremos ningun parametro ni setear algun header del request solo recibimos lo que nos haya devuelto el server
            if (err) return console.log(err);//Primer parametro es el error 
            ctx.pictures = res.body; //Asignamos a ctx.pictures las pictures recibidas...Contiene las pictures o lo que envia el servidor
            next(); //llamamos a next una vez que las pictures esten seteadas al ctx
        })
    } */

/* function loadPictures(ctx, next) { //Usando la Libreria Axios (Promises)
    axios //Usamos la libreria axios para hacer el request a nuestro servidor
        .get('/api/pictures')  //colocamos la url, ruta de la API
        .then(function (res) { //El then representa el exito con parametro res de response
            //Lógica para extraer las pictures y añadirlas, en vez de body como en los callback tiene un res.data
            ctx.pictures = res.data; //Asignamos a ctx.pictures las pictures recibidas...Contiene las pictures o lo que envia el servidor
            next(); //llamamos a next una vez que las pictures esten seteadas al ctx
        }) //Sin ; ya que perderiamos la cadena
        .catch(function(err){ //Catch en caso de que haya un error
            console.log(err)
        })
 } */

/*  function loadPictures(ctx, next) { //Usando la Libreria fetch (Nativa para browsers)
    fetch ('/api/pictures') //colocamos la url, ruta de la API, devuelve una promise
        .then(function (res) { //El then representa el exito con parametro res de response, nos devuelve una promesa mas.
            //Lógica para extraer las pictures y añadirlas, en vez de body como en los callback tiene un res.data
            return res.json(); //Tiene los datos que nos devuelve el servidor pero en formato json, al convertirlos a json devuelve una promise   
        }) 
        .then(function(pictures){ //Aqui se obtienen los datos (En este caso las pictures)
            ctx.pictures = pictures; //Asignamos a ctx.pictures las pictures recibidas...Contiene las pictures o lo que envia el servidor, es el resultado de lo que nos envia el fetch de json.
            next(); //llamamos a next una vez que las pictures esten seteadas al ctx
        })
        .catch(function(err){//catch en caso de error
            console.log(err);//muestra por consola el error
        })
 } */

/*  function loadPictures(ctx, next) { //Usando la Libreria fetch (Nativa para browsers)
    fetch ('/api/pictures') //colocamos la url, ruta de la API, devuelve una promise
        .then(function (res) { //El then representa el exito con parametro res de response, nos devuelve una promesa mas.
            //Lógica para extraer las pictures y añadirlas, en vez de body como en los callback tiene un res.data
            return res.json(); //Tiene los datos que nos devuelve el servidor pero en formato json, al convertirlos a json devuelve una promise   
        }) 
        .then(function(pictures){ //Aqui se obtienen los datos (En este caso las pictures)
            ctx.pictures = pictures; //Asignamos a ctx.pictures las pictures recibidas...Contiene las pictures o lo que envia el servidor, es el resultado de lo que nos envia el fetch de json.
            next(); //llamamos a next una vez que las pictures esten seteadas al ctx
        })
        .catch(function(err){//catch en caso de error
            console.log(err);//muestra por consola el error
        })
 } */


































/*  Ejemplo de un enlace para signup.
const main = document.getElementById('main-container')Guarda el elemento main-container del archivo HTML

  lA RUTA /home tendra: el enlace para dirigir a la pagina signup
  page('/', (ctx, next)=> {Ruta index, home
    main.innerHTML = '<a href="/signup">Signup</a>'Coloca el directorio de la ruta en la que estas de la pagina web a lado superior izquierdo
}) */

