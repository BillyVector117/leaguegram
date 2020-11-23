
const yo = require('yo-yo');/* Requerimos Libreria Yo-yo*/
const translate = require('../translate');//Requerimos el index del modulo/carpeta translate para traducir cualquier texto de la pagina
//Definir elemento HTML con Yo
const el = yo`
<footer class="site-footer">
  <div class="container">
    <div class="row">
      <div class="col s12 l3 center-align">
        <a class="dropdown-trigger btn btn-flat" href="#" data-target="dropdown1"><i class="tiny material-icons">language</i>${translate.message('language')}</a>
        <ul class="dropdown-content" id="dropdown1">
          <li><a href="#" onclick =${lang.bind(null, 'es')}>${translate.message('spanish')}</a></li>
          <li><a href="#" onclick =${lang.bind(null, 'en-US')}>${translate.message('english')}</a></li>
        </ul>
      </div>
      <div class="col s12 l3 push-l6 center-align">® 2020 leagueGram</div>
    </div>
  </div>
</footer>`;
//en el evento okclick se coloca bind de no ser asi se ejecutarian ambas funciones, refrescarian la pagina, por ello con .bind no estaria llamando esa función solo hace referencia para cuando demos click.
function lang(locale) {//Función para guardar el local en el localStorage (se pasa por parametro)
  localStorage.locale = locale;  //Cuando se de click en tal idioma el localStorage lo almacena
  location.reload();//Recargar la pagina para que tome esos cambios, dependiendo en la ruta que estemos
  return false;
}
document.body.appendChild(el); //Agregar esta estructura HTML (Footer)