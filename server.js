// Modulo principal (Configuración de rutas y server)
const express = require('express'); // Importar modulo express (Para crear servidor)
const ext = require('file-extension'); // Requerimos la libreria file-extensión para visualizar la extension del archivo (fotos)

// Requerir modulos para Multer (Se remplazara por MulterS3 en AWS)
const multer  = require('multer')// Requerir multer para hacer el upload de fotos
// const aws = require('aws-sdk')//  Requerir aws-sdk para trabajar con aws y multer
// const multerS3 = require('multer-s3') // Modulo/Storage de Multer para almacenar en S3

// Configuración de multer para almacenar las imágenes en el disco duro (Sin Aws)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // El destino a guardar las fotos sera en la carpeta uploads de nuestro proyecto
  },
  filename: function (req, file, cb) { // Configuración de nombre con el que se guardara cada foto
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext(file.originalname)) // Nombre del archivo y la fecha, usamos la libreria file-extension para agregarle su ext.
  }
})
/* 
// Configuración de multer para almacenar imágenes en S3 (Usando AWS)
const s3 = new aws.S3({ // Instanciamos un nuevo objeto de aws.s3 (Cremos modulo en S3)
  accessKeyId: config.ws.accessKey, // Obtenemos el accessKeyId del archivo de config.js (contiene ambas Keys)
  secretAccessKey: config.ws.secretKey
})
// Creación de Storage del upload al bucket de Aws
storage: multerS3({ // Elegimos la libreria multerS3 como almacenamiento
  s3: s3,
  bucket: 'some-bucket', // Nombre del bucket de AWS
  acl: 'public-read', // Access contro list, en S3 los archivos podran ser leidos por cualquiera, pero no sobreescritos.
  metadata: function (req, file, cb) { // Recibe un request, el archivo y el call back donde se pasa esa metadata
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null, f ile.fieldname + '-' + Date.now() + '.' + ext(file.originalname)) // Nombre del archivo y la fecha, la extensión la completamos con la libreria file-extensión 
  }
})
*/

 // Se usa como middleware de la libreria multer
const upload = multer({ storage: storage }).single('picture')// Recibe el id del elemento HTML dónde se realizara la carga de archivo (Input con id 'picture')
// Finaliza la configuración de Multer

// INICIALIZAR EXPRESS
const app = express(); 



// TEMPLATE ENGINE 
app.set('view engine', 'pug');// Indica el motor de plantilla a usar (.pug)

// ARCHIVOS ESTATICOS
// La carpeta 'public' contiene los archivos finales
app.use(express.static('public')); // app.use define un middleware a usar, se refiere al uso disponible publico de la carpeta public

// ROUTES
// Definimos las rutas /Home, /index, /signup, /signin, etc , otra opción es colocar en app.get('*') y asi cualquier link te direccionaria a home, pero no es recomendable.
// RUTAS PARTICULARES
app.get('/', (req,res) => {/*Crear ruta para representar el archivo index.pug ('/') tambien ejecute la función */
  res.render('index', {title: 'LeagueGram' });/*Primer parametro: nombre del archivo, seguno objeto con clave valor de todas las variables */
})
/* Definimos ruta para /signup */
app.get('/signup', (req,res) => {/*Crear ruta para representar el archivo index.pug ('/signup') tambien ejecute la función */
  res.render('index', {title:'LeagueGram - Signup' });/*Primer parametro: nombre del archivo, seguno objeto con clave valor de todas las variables */
})
/* Definimos ruta para /signin */
app.get('/signin', (req,res) => {/*Crear ruta para representar el archivo index.pug ('/signin') tambien ejecute la función */
  res.render('index', {title: 'LeagueGram - Signin'});/*Primer parametro: nombre del archivo, seguno objeto con clave valor de todas las variables */
})
/* Agregar ruta para nuestra API (interfaz, que consumira nuestra propia API) */
app.get('/api/pictures', (req,res, next) => {/*Crear ruta para representar la API, estas fuciones seran middlewares*/
  /* Simulación de datos extraidos de una BD */
  const pictures = [/* Objeto que se le pasara como parametro a la función del archivo template(contiene la estructura de la pagina principal, pero el parametro se le pasara a cada picture) */
    {
        user: {
            username: 'billyvector',
            avatar: 'office.jpg'
        },
        url: 'office.jpg',
        likes: 0,
        liked:false,
        createdAt: new Date().setDate(new Date().getDate() - 20)
    },
    {
        user: {
            username: 'billyvector1',
            avatar: 'office.jpg'
        },
        url: 'office.jpg',
        likes: 1,
        liked: true,
        createdAt: new Date().setDate(new Date().getDate())
    },
    {
        user: {
            username: 'billyvector2',
            avatar: 'office.jpg'
        },
        url: 'office.jpg',
        likes: 1024,
        liked: true,
        createdAt: new Date().setDate(new Date().getDate() - 10)/* Fecha 10 dias antes a la actual */
        /*Creamos fecha, le agregamos la hora actual, y le pasamos en función la misma hora actual menos 10  */
    },
];
/* Definir una simulacion de la extracción de los datos en una BD a través de setTimeOut, aqui nos devolvera cada una delas pictures */
  setTimeout(() => {/* Recibe un call back y la cantidad de tiempo para ejecutar la función a pasarle */
    res.send(pictures);/* Esperara dos segundos para ejecutar la función de devolvernos esas pictures */
  }, 2000); /* Dos segundos para esa tarea, detras de esto se llamara el middleare de loading para imitar la pantalla de carga de un request */
});
app.post('/api/pictures', (req, res) =>{//Agregar el middleware de Multer, en la función definimos nuestro propio middleware
upload(req, res, (err) => { //tendra el request, la respuesta y una función en caso de que haya un error (callback)
  if(err){ //Si hubo un error ...
    return res.status(500).send("Error uploading file"); //Muestra el error 500
  }
  res.status(200).send("file uploaded"); //En caso de que no haya un error solo muestra mensaje exitoso
  })
})
/* Definimos ruta para obtener los datos de  /username o cierto usuario. */
app.get('/api/user/:username', (req,res) => {//Cuando entremos a esta ruta, nos devolvera los datos del usuario, si no hay, un E404.
  const user = {/* Nos devolvera los datos de cierto usuario, las pictures seran un array. */
    username: 'billyvector',
    avatar:'https://scontent-qro1-1.cdninstagram.com/v/t51.2885-19/s150x150/104416113_258451298935788_3458565576689695117_n.jpg?_nc_ht=scontent-qro1-1.cdninstagram.com&_nc_ohc=7mJ0zp2_0GMAX9RHkm-&oh=ee5a61e78c58d504c73b89c132826ec4&oe=5F727394',
    pictures: [
      {
        id: 1,
        src: 'https://www.gettyimages.es/gi-resources/images/500px/983794168.jpg',
        likes: 0
      },
      {
        id: 2,
        src: 'https://images.freeimages.com/images/small-previews/adf/sun-burst-1478549.jpg',
        likes: 10
      },
      {
        id: 3,
        src: 'https://www.gettyimages.es/gi-resources/images/frontdoor/editorial/Velo/GettyImages-Velo-1088643550.jpg',
        likes: 74
      },
      {
        id: 4,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3Wjd-Cak78mooEfHTx64D7xhFtgBMZRFiiQ&usqp=CAU',
        likes: 100
      },
      {
        id: 5,
        src: 'https://photorator.com/photos/images/milky-way-over-australia--17660.jpg',
        likes: 88
      },
      {
        id: 6,
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        likes: 90
      }
    ]
  };
  res.send(user); //Nos devolvera el objeto user (objetos), ademas agregaremos un middleware en la ruta (carpeta profile) para que cargue sus datos.
})
/* Definimos rutas generales (Estas van debajo de las rutas particulares o que acepten parametros) */
/* Definimos ruta para /username o cada usuario  */
app.get('/:username', (req,res) => {/*Crear ruta para representar el archivo dentro del archivo pug */
  res.render('index', {title:`LeagueGram - ${req.params.username}` });/*Nos devuelve el index que en este caso es .pug, le cambiamos el titulo, el nombre del usuario lo obtenemos de ese literal string.  */
})
/* Definimos ruta para /numero de foto de usuario   */
app.get('/:username/:id', (req,res) => {/*Crear ruta para representar el archivo dentro del archivo pug */
  res.render('index', {title:`LeagueGram - ${req.params.username}` });/*Nos devuelve el index que en este caos es .pug, le cambiamos el titulo, el nombre del usuario lo obtenemos de ese literal string.  */
})

// CONFIGURACIÓN Y ARRANQUE DE EXPRESS
app.listen(3000, (err) => { // el método listen recibe el puerto y una función con un error si es que existe
  if(err) return console.log('Ocurrio un error'), process.exit(1);/* Si err es distinto de null escribimos en terminal el error, el process.exit para indicar que fue un error */
  console.log('leagueGram listening on port 3000');
})


































/* Gestor de paquetes:
Bower: front-end (lado del cliente), usa bower.js como manifiesto
Duo: Busca los paquetes en GitHub
----------------------------------
Ensamblador de paquetes:
(Package bundler)
Browserify: Incluye todo el contenido de todos los archivos incluyendo dependencias.
Webpack: Todo el contenido lo guarda en un archivo como output, y se usa para mandar a producción
----------------------------------
Automatizadores:
Grunt:Requiere archivo gruntFile, y solo se realiza configuraciones 
Gulp: Le indicamos paso a paso como armar el bundle file(se usa en css, assets y js)
-----------------------------------
Preprocesadores de estilos:
Sass
Less
Stylus

Bundler: Archivo final
-----------------------------------
Page.js: Libreria que permite navegar entre página y página de la aplicación sin tener que recargar.
---------------------------
superagent: Libreria para usar ajax, permite hacer request http usando call backs.
Axios: Libreria para usar ajax,Request Http basados en promesas
fetch: Libreria estandar y moderna soportada por los browsers nativa. (No se instala)
Async-await: Estandar de Ecsmascript para usar Ajax aun mas facil
-------------------
multer: Middleware para poder hacer el upload de multipartes (en este caso de la picture al subir una foto y guardarla en el disco duro.)
*/