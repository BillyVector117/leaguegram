/* Template para dar la vista al perfil de un usuario, unicamente es el código <<Html>> que se exportara al index de profile  */
const yo = require('yo-yo')// Requerimos Libreria Yo-yo
const layout = require('../layout'); /* Requerir archivo layout (tiene la plantilla para la barra de navegación y con el parametro de su función agregamos contenido (en este caso el contenido sera una estructura html con literal string)) */
const translate = require('../translate')
// Exportamos esta parte de yo-yo para quelo pueda usar como platilla otro archivo (usamos literal strings) 
module.exports =  function userProfile (user) {//Este user es el objeto final de la función asincrona del index "loadUser".
//los template strings privienen de la funcion asincrona de index, que a su vez son obtenidos del fetch  al servidor
let el =  yo`
<div class="container user-page">
    <div class="row"><!-- Fila que contendra columnas -->
        <div class="col s12 l3 push-l3">
            <!-- Aqui se agregara la caja/div del avatar o imagen -->
            <div class="userAv">
                <div class="avatarUser">
                    <!-- Aqui se coloca la imagen-->
                    <img src="${user.avatar}" alt="${user.username}" class="responsive-img circle userAv" />
                </div>
            </div>
        </div>

        <!-- Aqui se agregara el nombre del usuario (username) -->
        <div class="col s12 l3 push-l4 center-align">
            <div class="section-name">
                <!-- Sección nombre de usuario -->  

                <h1 class="username">${user.username}</h1>
            </div>
        </div>
    </div>

    <div class="row"> <!-- WAVE EFFECT STARTS -->
        <div class="col s12">
            <div class="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320">
                <path fill="#0099ff" fill-opacity="1" d="M0,32L26.7,74.7C53.3,117,107,203,160,202.7C213.3,203,267,117,320,106.7C373.3,96,427,160,480,181.3C533.3,203,587,181,640,186.7C693.3,192,747,224,800,245.3C853.3,267,907,277,960,261.3C1013.3,245,1067,203,1120,208C1173.3,213,1227,267,1280,288C1333.3,309,1387,299,1413,293.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
            </div>
        </div>    
    </div> <!-- WAVE EFFECT ENDS -->
    
    <!--PICTURES GRID STARTS-->
    <div class="row"> <!-- Recorrer el array de pictures que esta en el servidor y asu vez pasamos por parametro aqui en "user" para que se muestre una en una-->
        <!-- Por cada imagen, mapeala con nombre picture y revuelve un template por cada una de ellas-->
        ${user.pictures.map(function (picture) { //map for each picture, then make them a structure.
            return yo` 
            <div class="col s12 m6 l4"> <!-- Make one column, S.1 full Image, M.Two images y L3. 3 Image by column-->
                <a href="/${user.username}/${picture.id}" class="waves-effect waves-light modal${picture.id} picture picture-container"> <!-- MODAL TRIGGER, The route is /username/id(each picture)-->
                    <img src="${picture.src}" class="picture" /> <!-- Set image, using literal string, picture.src is product from .map, .src provides from server, the same with pictures.likes-->
                    <div class="likes"><i class="fa fa-heart"></i> ${picture.likes}</div> <!-- Shows likes quantity-->
                </a>    
                        <!-- Modal Structure -->
                <div id="modal${picture.id}" class=" modal modal-fixed-footer "><!--id dinamico para cada foto, asi se creara una estructura para cada foto-->
                    <div class="modal-content center">
                        <img src="${picture.src}" />    <!--Picture(s) (Modal content)-->
                    </div>
                    <div class="modal-footer">
                        <div class="btn btn-flat likes">
                            <i class="fa fa-heart"></i> ${translate.message('likes', {likes: picture.likes})}
                        </div>  
                    </div>
                    <!--Modal Structure Ends-->
                </div>    
            </div>`;
        })}
    </div> <!--PICTURES GRID ENDS-->
</div>
`;
return layout(el);//Esta estructura se retornara al contenido de la plantilla de layout
}
/* module.exports = landingProfile(user); */ 
/* 
let getPictures = (ev) => {
    ev.preventDefault()
    const data = new FormData(this)
    request
    .get('/api/pictures')//Usamos con el metodo post para enviarle data a través de esa ruta
    .send(data) //Seleccionamos la data (la imagen del formulario a enviar) para enviar.
    .end((err,res) => {//Cuando tengamos la respuesta tendra el parametro de error y respuesta
        console.log(arguments); //hacer el console log de ambos parametros (argumentos), conseguiremos un array de err y res si escribimos arguments, o de otra forma (err,res)
    })
} */
/* Retorna la barra de navegación con el contenido (las cards) */
/* Dentro de la estructura de nav (layout) le pasamos como parametro la estructura del contenido (el, cards) para exportar todo.*/

/* 
    <div class="gallery">
        <div class="row">
            <div class="col s4">
                <div class="card">
                    <div class="card-image">
                    <img src="image.png">
                    </div>
                </div>
            </div>
            
            <div class="col s4">
                <div class="card">
                    <div class="card-image">
                    <img src="image.png">
                    </div>
                </div>
            </div>
            
            <div class="col s4">
                <div class="card">
                    <div class="card-image">
                    <img src="image.png">
                    </div>
                </div>
            </div>
        </div>
    </div>


    Estructura Modal de prueba
    <!-- Este modal es de prueba
    <!-- Modal Trigger -->
    <a class="waves-effect waves-light btn modal-trigger" href="#modal3">Modal</a>
  
    <!-- Modal Structure -->
    <div id="modal3" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Modal Header</h4>
        
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
-->
*/




















