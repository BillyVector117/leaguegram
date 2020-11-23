// Este modulo genera mediante una función la estructura base de la card (debe estar agumentada por pic) 
const yo = require('yo-yo')/* Requerimos Libreria Yo-yo*/
const moment = require('moment'); // Requerimos libreria moment para agregar fecha a las cards 
const translate = require('../translate');// Requerimos lo que haya en la carpeta/archivo JS de translate
const IntlRelativeFormat = require('intl-relativeformat');//Requerimos la libreria intl-relativetime para colocar el tiempo relativo
new IntlRelativeFormat('en', { style: 'best fit' }).format(Date.now() - 1000);// Agregamos el idioma a usar
const IntlMessageFormat = require('intl-messageformat').default

// función que contiene la estructura de las cards/imagenes de la aplicación,  sera exportada cada que se le pase por parametro una imagen *
module.exports = function pictureCard(pic) {/*Recibe cada objeto del archivo template de homepage */
    let el;/* Declaración de el (elemento o estructura vieja) */
    function render(picture) {/* El parametro picture es pisado por el parametro pic de la función antecesora */
    /* Si picture.liked es true, agrega/imprime la clase 'liked' a esta tarjeta */
    const rf = new IntlRelativeFormat('en-US');//Formatear el tiempo a ingles
    const output = rf.format(picture.createdAt);//Asi la llamaremos al colocarlo detras de una fecha
    return yo`<div class="card ${picture.liked ? 'liked' : ''}">
    <div class="card-image">
      <img class="activator" src="${picture.url}" ondblclick=${like.bind(null,null,true)}><!--Referencia a la función like-->
      <i class="fa fa-heart like-heart ${ picture.likedheart ? 'liked' : ''}"></i> <!-- Si picture.likedheart es TRUE, entonces imprime el string liked de lo contrario no agregues ninguna clase ''+Icono de corazón (al dar doble tap)-->
    </div>
    <div class="card-content">
        <a href="/${picture.user.username}" class="card-title">
            <img src="${picture.user.avatar}" class="avatar"/>
            <span class="username">${picture.user.username}</span>
        </a> 
        <small class="right time"> ${translate.date.format(picture.createdAt)} </small>
        <p>
            <a class="left" href="#" onclick=${like.bind(null,true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
            <a class="left" href="#" onclick=${like.bind(null,false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
            <span class="left likes">${translate.message('likes', {likes: picture.likes})}</span>
        </p>
    </div>
</div>`;
    }/* Cada que demos click en el corazón se ejecutara una funcion (like) el cual tiene como metodo bind, para cambiar su "this" */
    /* En la fecha de la card sera una función (moment) la cual picture tiene un atribute (createdAt) y le agregamos el metodo fromNow de la libreria moment para hacer la conversion a "Hace tanto tiempo..." */
    function like(liked, dblclick) {//Función que ejecutara los likes (single & double tap)
        if(dblclick) { //Si se llama a dblclick ejecuta...
          pic.likedHeart = pic.liked = !pic.liked; // Asignación doble, Si la pic tiene me gusta y damos dbclick se reasignara a no me gusta
          liked = pic.liked; // liked pasa a tener el valor del double tap
        } else {
          pic.liked = liked; //Si no, pic.liked tendra el valor que tenia (ese valor es el que le pasamos por la funcion como true o false)
        }
        pic.likes += liked ? 1 : -1;// el número de likes (pic.likes) se le hara una suma, si liked es verdadero, suma 1, y si es falso -1
        function doRender () {
        let newEl = render(pic); // El nuevo elemento o lo que se genera aqui seria otro literal string pero actualizado 
        yo.update(el, newEl);// Actualize la vista, le pasamos el elemento viejo y el nuevo elemento 
        }
        doRender(); //Volver a llamar a la función para que la ejecute
        setTimeout(()=> {
          pic.likedHeart = false; //No es el like del corazón, solo es la animación del doble tap, lo cual es setTimeOut lo quitara 
          doRender()//Ejecuta la función doRender
        },1500) //1 seg y medio
        return false;// Retorna false para que no redireccione el vinculo de corazon o la ruta 
    }
/*      Otra manera de agregar like/dislike sin usar el metodo .bind
        function dislike() {Al darle click en el icono de corazón dispara la función like
        pic.liked = false; Si a la función le pasamos por parametro true, aqui quedara en true y viceversa
        pic.likes --;el número de likes (pic.likes) se le hara una suma, si liked es verdadero, suma 1, y si es falso -1
        const newEl = render(pic); El nuevo elemento o lo que se genera aqui seria otro literal string pero actualizado
        yo.update(el, newEl);Actualize la vista, le pasamos el elemento viejo y el nuevo elemento
        return false;Retorna false para que no redireccione el vinculo de corazon o la ruta 
    }*/
el = render(pic);/* Le pasamos por parametro un objeto (imagen), nos devolvera una vista de la card */
return el; /* Y retornara la misma imagén, card. */
}// Los atributos de pic. vienen del archivo template (parametros de su función), que a su vez cada pic(parametro) es un objeto del archivo index.js de homepage. 

/* //Using format.js (New version)
import '@formatjs/intl-relativetimeformat/polyfilsl'
import '@formatjs/intl-relativetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-relativetimeformat/locale-data/es' // locale-data for es
require('@formatjs/intl-relativetimeformat/dist/locale-data/en.js');
import {shouldPolyfill} from '@formatjs/intl-relativetimeformat/should-polyfill'
async function polyfill(es) {
  if (shouldPolyfill()) {
    // Load the polyfill 1st BEFORE loading data
    await import('@formatjs/intl-relativetimeformat/polyfill')
  }
  if (Intl.RelativeTimeFormat.polyfilled) {
    switch (es) {
      default:
        await import('@formatjs/intl-relativetimeformat/locale-data/en')
        break
      case 'es':
        await import('@formatjs/intl-relativetimeformat/locale-data/es')
        break
    }
  }
}  */
// ${moment(picture.createdAt).fromNow()} (moment.js)