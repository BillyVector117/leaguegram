/* Archivo que contiene la plantilla para los formularios(signup & signin) */
const yo = require('yo-yo');/* Requerimos Yo-yo*/
/* Crea una función landing la cual retorna la columna de la imagen y del lado derecho ya no esta el formulario signup */
/* Exportamos la función la cual contiene la vista de la pagina, pero el formulario cambiara, si es signin o signup, para ellos se le pasara el parametro box dependiendo el formulario */
let landingProfile = (avatar,avatarName,waveEffect)=>{ return yo`<div class="profileLanding"> 
    <div class="row"><!-- Fila que contendra columnas -->
        <div class="col s12 l3 push-l3">
        <!-- Aqui se agregara la caja/div del avatar o imagen -->

            ${avatar}

        </div>
        <!-- Aqui se agregara el nombre del usuario (username) -->
        <div class="col s12 l3 push-l4 center-align">

            ${avatarName}
            
        </div>
    </div>

    <!-- Wave effect Starts -->
    ${waveEffect}
    <!-- Wave effect Ends -->

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

</div>`;
};

module.exports = landingProfile;