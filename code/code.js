//OBJECTES
const btnPartida = document.getElementById("btn-Partida")
const btnBorrar = document.getElementById("btn-Borrar")
const nomJugadorObj = document.getElementById("nom-jugador")
const infoNavegadorObj = document.getElementById("info-navegador")
const inforURL = document.getElementById("info-url")


//EVENTS
//Afegir un event a un objecte, en aquest cas al boton de partida
btnPartida.addEventListener("click", comencarPartida);

//VARIABLES I CONSTANTS
let win;

//FUNCIONS
//Funció que comprova si ha posat un nom per poder iniciar partida
function comencarPartida(){
    if(nomJugadorObj.value.trim().length > 0){
        // Obrim el nou fitxer a una pestanya nova
        win = window.open("jocParelles.html");

        //Modificar el nom del jugador:
        document.cookie = "nomJugador="+nomJugadorObj.value

    }else{
        alert("Has d'introduïr el nom d'un jugador")
    }
}

// Funció que mostra el tipus de navegador.
function mostrarNavegador(){
    const nav = navigator.userAgent;
    infoNavegadorObj.textContent = nav;
}
mostrarNavegador();

function infoURL(){
    const url = location.origin;
    console.log("fPath absolut: {url}")
    inforURL.textContent = url;
}
infoURL();

// Per acabar partida farem
// window.location.assign("partidaFinalitzada.html")