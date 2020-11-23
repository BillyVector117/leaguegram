const gulp = require('gulp');/* Requerir gulp */
const sass = require('gulp-sass');/* Requerir sass, gulp ptrabajara sobre Sass */
const autoprefixer = require('gulp-autoprefixer');/* Requiere autoprefijo, para mostrar los prefijos en el código */
const rename = require('gulp-rename');/* Requerir rename para renombrar archivos */
const babelify = require('babelify');/* Requerir babelify para manejar Babel usando Browserify */
const browserify = require('browserify');/* Requerir Browserify, como package handler (Como Webpack) */
const source = require('vinyl-source-stream')/* Requerir vynil, permite pasar de Browserify a Gulp, para que pueda procesar los archivos.  */
const watchify = require ('watchify');/* Requerir watchify, permite automatizar el build del proyecto para observar cambios en todo momento */
/* Crear una tarea gulp para compilar sass*/
gulp.task('sass', async () => {/* Tarea, primer parametro nombre (cualquiera) y segundo una función, ruta */
    gulp.src('./index.scss')/* Selecciona el archivo de entrada que sera al que compilara */
    .pipe(sass({/* Configuración del archivo a compilar con dos opciones: */
        outputStyle: "compressed", /* Tipo de output, nested, expanded, compact, expanded, compressed */
        sourceComments: true /* Coloca comentario en cada linea para moestrar que hizo al compilar */
    }))
    .pipe(autoprefixer({/* Autoprefijos para navegadores */
        versions: ['last 2 browsers']/* Solo muestra los dos ultimos navegadores */
    }))
    .pipe(rename('app.css'))/* El archivo a compilar se RENOMBRARA a app.css en vez de index.css que viene por defecto */
    .pipe(gulp.dest('public'));/* Carpeta y nombre del archivo de salida cuando compile scss */
});

/* Copiar archivos dentro de assets a Public (carpeta generada), aqui se movera las imagenes de la carpeta assets a la carpeta generada anteriormente (Public)*/
gulp.task('assets', async ()=> {/* Responsable de copiar los archivos dentro de assets a Public (carpeta generada por Gulp) */
    gulp
    .src('assets/*')/* glob, similar a expresion regular para seleccionar/apuntar archivos, Copiar todo lo que este dentro de assets */
    .pipe(gulp.dest('public'));/* Procesar y mandarlo a la carpeta public */
})
    let compile = (watch) => {/* Función para validar si se hara o no un watch, en caso de que no, solo se ejecutaria el build */
    let bundle = (browserify('./src/index.js', {debug: true}));/* Lo que watchify recibe es: Llamar a Browserify, pasarle como parametro la ruta del archivo a procesar, bundle recibe un objeto de los cambios que se hagan en el archivo */
    if(watch){/* Si el objeto recibido da true se hara un watch de los archivos(Si el ) */
        bundle = watchify(bundle);//Bundle tendra watchify en caso de que sea watch true de lo contrario solo hara la tarea de browserify
        bundle.on('update', () => {/* bundle tiene un metodo on, recibe un string (nombre de evento) mas una función, cada vez que se haga una actualización ejecuta....(Es como un escuchador de eventos), o deotra manera, si el archivo index.js es actualizado, exte evento de update realizara una función*/
            console.log('--> Bundling...'); /* Señal de que hubo un cambio en el archivo index.js de watchify y se transformara invocando la función rebundle, que hace la tarea de browserify, la cual es transformar el archivo JS en el archivo final.*/
            rebundle(); /* Llama a la función rebundle la cual realiza el build del JavaScript (Lo que hacia browserify hacia Gulp) */
        });
    }
    let rebundle = ()=>{/*rebundle se encargara de hacer la tarea que browserify hacia solo (procesar el archivo JavaScript) */
        bundle/* Operar sobre la variable bundle el scope de la variable bundle no lo permite, pero si escribimos el nombre dentro de la función si., es la que contiene el objeto del archivo index a procesar, dentro de ella se ejecutara todo el proceso */
        .transform(babelify, {"presets": [ '@babel/preset-env'], "plugins": ['syntax-async-functions','@babel/plugin-transform-regenerator']})/* Transformar el archivo usando la libreria de Babel, para poder usar las caracteristicas de ES6 */
        .bundle() /* Procesar y definir ese archivo */
        .on('error', (err) => {console.log(err); this.emit('end')})/* Función(callback) para mostrar errores en caso de que existan y los muestre por consola */
        .pipe(source('index.js'))/* Source transforma lo que devuelva bundle a algo que entienda Gulp y continuar con los procesos */
        .pipe(rename('app.js'))/* Renombrar el archivo JavaScript */
        .pipe(gulp.dest('public')); /* Incluir la ruta final (output del archivo) */       
    };

    rebundle();/* Al menos se ejecutara una vez esta función (transformación del archivo), luego de eso se validara con el watch, para que se quede observando si es true. */
}

gulp.task('build', async () => {/* No ejecuta el watch, solo el build, solo ejecutara una vez la compilación o transformación */
     return compile();
    
});
gulp.task('watch',  ()=>{/* Ejecutara la función compile pasandole true para que se quede haciendo watch, se quedara observando por cualquier cambio ya que es true.*/
    gulp.watch('./index.scss', gulp.series('sass'));/*Crea una tarea observadora, la cual se fijara en el archivo a compilar (ruta), seguido del nobre de la tarea a ejecutar (sass) */
    return compile(true);/* True para que se quede observando a cambios los archivos */
});

gulp.task('default', gulp.parallel('sass', 'assets', 'build'));/* Crea una tarea default, la cual ejecuta como paralelo las demas tareas (sass, watch, assets y scripts) */