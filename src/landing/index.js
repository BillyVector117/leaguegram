/* Archivo que contiene la plantilla para los formularios(signup & signin) */
const yo = require('yo-yo');/* Requerimos Yo-yo*/
/* Crea una función landing la cual retorna la columna de la imagen y del lado derecho ya no esta el formulario signup */
/* Exportamos la función la cual contiene la vista de la pagina, pero el formulario cambiara, si es signin o signup, para ellos se le pasara el parametro box dependiendo el formulario */
module.exports = function landing(box){ return yo`<div class="container landing"> 
    <div class="row"><!-- Fila que contendra columnas -->
        <div class="col s10 push-s1"><!-- Div con 10 columnas y empujar el div 1 col a la derecha.  -->
            <div class="row"><!-- Div/fila para tener dos columnas (1.Para la imagen, 2. Para el formulario)-->
                <div class="col m5 hide-on-small-only"><!-- Primer columna para imagen, solo a partir de m. se muestra, no en mobil. -->
                    <!-- Imagen, ya no tiene la ruta /public por que todo se encuentra en el mismo lugar -->
                    <img src="image.png" alt="League Mobile" class="mobile">
                </div>
                <!-- Aqui se agregara la caja del formulario (signin/signup) -->
                ${box}
            </div>
        </div>
    </div>
</div>`;
};
