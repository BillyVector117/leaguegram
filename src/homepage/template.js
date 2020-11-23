/* Template para dar la vista de la estructura Home, y las cards, unicamente es el código <<Html>>  */
const yo = require('yo-yo')/* Requerimos Libreria Yo-yo*/
const layout = require('../layout'); /* Requerir archivo layout (tiene la plantilla para la barra de navegación y con el parametro de su función agregamos contenido (en este caso el contenido sera una estructura html con literal string)) */
const picture = require('../picture-card');/* Requerir el archivo (index) que contiene las cards/imágenes, estan dentro de la carpeta picture-card */
const translate = require('../translate');//Requerimos el index del modulo/carpeta translate para traducir cualquier texto de la pagina
const request = require('superagent'); /* Libreria para usar Ajax de manera facil (Usa Callbacks)*/
/* Por cada objeto pasado en la función (pictures) mapeara cada objeto y retornada para cada objeto una estructura de tipo card, y al ser esto una función su retorno sera al layout (estructura de la card) el contenido y la imagen*/
/* Función que retorna  la estructura de las imagenes tipo carta, se le pasa por parametro cada imagen*/
//pictures son los objetos recibidos en index (el servidor)
module.exports = (pictures) =>  {/* El modulo exportara esta función la cual lleva por parametro pictures(objetos del index.js), y a su vez esta es  */
const el = yo`<div class="container timeline"> 
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
                <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit="${onsubmit}">
                    <div id="fileName" class="fileUpload btn btn-flat cyan">
                        <span><i class="fa fa-camera" aria-hidden="true"></i>${translate.message('upload-picture')}</span>
                        <input name="picture" id="file" type="file" class="upload" onchange=${onchange}/>
                    </div>
                    <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
                    <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-times" aria-hidden="true"></i></button>
                </form>
            </div>
        </div>
    <div class="row">
        <div class="col s12 m10 offset-1 l6 offset-l3">
        ${pictures.map(function(pic) { /* Por cada picture ejecuta una función (Sera un array) */
            return picture(pic);/* picture es el modulo (card), en su archivo hace referencia a su función pictureCard(pic), donde pic es el resultado de este .map retorna una estructura de picture y la pic imagen*/
        })}
        </div>
    </div>
</div>
`;
//Por defecto el input esta visible, pero el boton de subir y cancelar (al seleccionar la foto) estan ocultos, al dar click en subir foto y seleccionar archivo se ejecuta la funcion onchange del input, entonces el div cons us elementos de "subir foto" se ocultan y se muestran los dos botones de subir o cancelar, si se cancela se ocultan esos dos botones y se muestra el de "subir foto"
//Funcion para agregar/quitar la clase hide de los elementos: 1.div que contiene el icono y texto subir foto(defecto esta hide), 2. botón "Subir" una vez seleccionada la foto, 3.Botón Cancelar una vez seleccionada la foto
function toggleButtons()  {
    document.getElementById('fileName').classList.toggle('hide');//Div que contiene el texto de subir foto y el icono, si tiene la clase hide la quita, de lo contrario la agrega
    document.getElementById('btnUpload').classList.toggle('hide');//Botón que dice "Subir" foto una vez seleccionada, si tiene la clase hide la quita, de lo contrario la agrega
    document.getElementById('btnCancel').classList.toggle('hide');//Botón con el icono de cancelar, una vez seleccionada la foto, si tiene la clase hide la quita, de lo contrario la agrega
}
//Función para mostrar/quitar el hide de los botones anteriores una vez que le demos click a cancelar  y resetear el contenido del div para subir foto
function cancel()  {//Al clickear cancelar 
    toggleButtons();
    document.getElementById('formUpload').reset();//Resetea el nombre del archivo
}
//Función para cambiar la visibilidad (hide) de los botones (el span y el input)
function onchange()  {
    toggleButtons();
}
function onsubmit(ev) {//Función al dar submit del formulario cargar foto
    ev.preventDefault() //Se cancelara el request que por defecto hacen los formularios al dar submit.
    const data = new FormData(this)//Tomar la data del formulario de la clase FormData que viene dado dentro de window, le pasamos el formulario con todos los datos, el archivo seleccionado (this)
    //Ahora es necesario hacerle llegar la data al servidor con axios,fetch,etc. (Se usara superagent)
    request
    .post('/api/pictures')//Usamos con el metodo post para enviarle data a través de esa ruta
    .send(data) //Seleccionamos la data (la imagen del formulario a enviar) para enviar.
    .end((err,res) => {//Cuando tengamos la respuesta tendra el parametro de error y respuesta
        console.log(arguments); //hacer el console log de ambos parametros (argumentos), conseguiremos un array de err y res si escribimos arguments, o de otra forma (err,res)
    })
}
/* Retorna la barra de navegación con el contenido (las cards) */
return layout(el);/* Dentro de la estructura de nav (layout) le pasamos como parametro la estructura del contenido (el, cards) para exportar todo.*/
}/* El map retorna la función picture (del modulo) pasandole por parametro pic (cada uno de los objetos de pictures(vienen del index)) */
