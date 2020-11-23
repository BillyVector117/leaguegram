/* Template para dar la vista de la caja del signup, unicamente es el código <<Html>>, antes de ser exportado al index de signup  */
const yo = require('yo-yo')/* Requerimos Libreria Yo-yo*/
const landing = require('../landing');/* Requerimos el index.js de la carpeta landing la cual contiene una función (landing) para poderle pasar el parametro box el formulario (no ahce falta icnluir el nombre del archivo si es un index.js) */
const translate = require('../translate');//Requerimos el index del modulo/carpeta translate para traducir cualquier texto de la pagina
/* Exportamos esta parte de yo-yo para que lo pueda usar como platilla otro archivo () */
//En todos los textos del Html sustituimos por el objeto a traducir del archivo translate.
const signupForm = yo`<div class="col s12 m7"><!-- Segunda columna para formulario, en mobil ocupara 12 columnas, mientras que en mayores lo restante (7 columnas) -->
<div class="row"><!-- Formulario, Fila 1 (Inputs) -->
    <div class="signup-box"> <!-- Formulario, caja de inputs -->
        <!-- Formulario Login -->
        <h1 class="leagueGram">LeagueGram</h1><!-- Titulo del formulario -->
        <form action="" class="signup-form"><!-- Formulario completo -->
        <h2>${translate.message('signup.subheading')}</h2><!-- Consigna (Joing LeagueGram community) -->
        <div class="section"><!-- Secciones/inputs del formulario -->
            <a href="" class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a><!-- Boton para iniciar sesión, se ocultara en mobil. (Sign up with Facebook) -->
            <a href="" class="btn btn-fb hide-on-med-and-up"><i class="fa fa-facebook-official"></i>${translate.message('signup.text')} </a><!-- Boton para iniciar sesión, se ocultara en m & up.(Sign up (Facebook en movil)) -->
        </div>
        <div class="diviver"></div> <!-- Linea para divivir -->
        <div class="section"><!-- Sección para todos los inputs del formulario -->
            <input type="email" name="email" placeholder="${translate.message('email')}" class="input__name"><!-- Input correo (billy117@test.com)-->
            <input type="text" name="name" placeholder="${translate.message('fullname')}" class="input__name"><!-- input nombre (Jhon Doh)-->
            <input type="text" name="username" placeholder="${translate.message('username')}" class="input__name"><!-- input nick (Jhon123)-->
            <input type="password" name="password" placeholder="${translate.message('password')}" class="input__name"><!-- input password (********)-->
            <button class="btn waves-effect waves-light btn-signup" type="submit" name="action">${translate.message('signup.call-to-action')}<i class="material-icons right">send</i></button> <!-- Botón registrarse (Signup)-->
        </div>
        </form>
    </div>
</div><!-- Aqui finaliza el primer row del formulario (inputs) -->
<div class="row"><!-- Formulario, Fila 2 (Login/Cuenta existente) -->
    <div class="login-box"><!-- Formulario, caja para cuenta existente -->
    ${translate.message('signup.have-account')}<a href="/signin"><b>${translate.message('signin')}</b></a><!-- Enlace para cuenta existente (Already have an account? and Click here) -->
    </div>
</div>
</div>`;
/* El resultado de esta exportación sera la estructura de la pagina completa, la imagen y formulario signup */
module.exports = landing(signupForm);/* Exportamos landing (la función que requerimos, pero esta vez pasandole como parametro el template String de SignupForm, para que la estrucutra html se complete dinamicamente) */
