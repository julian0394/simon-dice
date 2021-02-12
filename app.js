
// Identificacion de elementos.
const titulo = $('#titulo');
const botones = $('.btn');
const body = $('body');
const puntaje = $('#puntaje');

// Array de colores.
const arrayColores = ['rojo', 'azul', 'verde', 'amarillo'];

// Patron del juego.
let patronDeJuego = [];
let patronUsuario = [];

// Contador de nivel y flag de partida iniciada.
let nroNivel = 0;
let partidaIniciada = false;

// Event listener  
titulo.click( ()=> {
    if(!partidaIniciada) {
        puntaje.addClass('oculto');
        botones.removeClass('anulado');
        manejoDeTitulo();
        setTimeout( sigSecuencia, 700);
    }
}); 
botones.click(manejoDeClick);
   

/****** A partir de acá queda a la espera del input de usuario ******/


// Siguiente numero en secuencia.
function sigSecuencia() {
    patronUsuario = [];

    if(!partidaIniciada) 
        partidaIniciada = true;
    else
        manejoDeTitulo();

    const randomNum = Math.floor( Math.random() * 4);   // Numero random 0-3 para que concuerde con un indice de array.
    const randomColor = arrayColores[randomNum];    // Saco el nombre del color segun el nro para comparar con el id.
    const botonMarcado = $(`#${arrayColores[randomNum]}`);  // ID solo para el manejo porlijo del fade. 
    
    acumularPatronDeJuego(randomColor);
    
    // Parpadeo del boton que toca presionar. - No lo hago funcion porque se rompe por los timeouts
    botonMarcado.fadeToggle(100); 
    setTimeout(() => {
        reproducirSonido(randomColor);
        botonMarcado.fadeToggle(100);
    }, 11); 
    /** Termina y queda a la espera del patron del usuario **/   
}

// se activa con el event listener de los botones cuando éstos se tocan.
function manejoDeClick() {
    if(partidaIniciada) {
        // botones.
        
        const colorEleccionUsuario = $(this).attr('id');    // Instancio el color (id) presionado por el usuario.
        
        acumularPatronUsuario(colorEleccionUsuario);    
        
        reproducirSonido(colorEleccionUsuario);
        animarPresion(colorEleccionUsuario);

        checkearInput();
    }
}

// Chequea que lo que ingresa el usuario councida con el patron del juego.
    // No se muy bien como funciona ese chequeo ni por que lo hace dos veces.
function checkearInput() {
    let nivelActual = patronUsuario.length - 1;
    
    if( patronUsuario[nivelActual] === patronDeJuego[nivelActual]) {
        if(patronUsuario.length === patronDeJuego.length) {
            setTimeout( sigSecuencia, 1000);
        }
    }
    else
        gameOver();
}

// Se activa y realiza los cambios cuando se pierde.
function gameOver() {
    botones.addClass('anulado');
    puntaje.removeClass('oculto');
    puntaje.text('Llegaste al nivel ' + nroNivel);

    body.addClass('game-over');
    setTimeout(() => body.removeClass('game-over'), 200);
    titulo.text('Perdiste. Click aquí para jugar.');

    const color = 'mal';
    reproducirSonido(color);


    reintentar();
}

// Se activa desde gameOver, se encarga de reiniciar las variables.
function reintentar() {
    nroNivel = 0;
    partidaIniciada = false;
    patronDeJuego = [];
    patronUsuario = [];
}

// Agrega a un array el color generado al azar por el juego.
function acumularPatronDeJuego(color) {
    patronDeJuego.push(color);
}

// Agrega a un array la secuencia de colores ingresados por el usuario (uno a la vez).
function acumularPatronUsuario(colorEleccionUsuario) {
    patronUsuario.push(colorEleccionUsuario);
}

// Manipula el titulo cambiando por nivel y estado.
function manejoDeTitulo() {
    nroNivel++;
    titulo.text('Nivel ' + nroNivel);
}

// Realiza la animación del boton presionado por el usuario.
function animarPresion(colorElegido) {
    const botonElegido = $(`#${colorElegido}`);
    
    botonElegido.addClass('presionado');
    setTimeout(() => botonElegido.removeClass('presionado'), 80);
}

// Reproduce el sonido del boton presionado por el usuario.
function reproducirSonido(color) {
    var audio = new Audio(`sonidos/${color}.mp3`);
    audio.play();
}







