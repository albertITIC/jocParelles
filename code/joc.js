//OBJECTES
const body = document.body;
const btn_mostrarInstruccions = document.getElementById("btn-mostrar")
const nomJug = document.getElementById("nom-jugador")
const cartes_btn = document.getElementById("cartes") // cartes dinàmiques
const lletra_Carta = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'];

//EVENTS
// Per mostrar les instruccions
btn_mostrarInstruccions.addEventListener("click", mostrar);

//VARIABLES
let win; // variable per obrir una pestanya nova
let nomJugador = document.cookie; // cookie emmagatzemada per guardar el nom del jugador
let cartesIguals = []; // Guardaré les cartes ja emparellades
let primeraCarta = null;
let segundaCarta = null;
let punts = 0;

//FUNCIONS
//Canviar de color de pantalla segons el seu navegador
function cambiarColorFons(){
    if (navigator.userAgent.includes("Firefox")) {
        body.style.backgroundColor = "orange";
        sessionStorage.setItem("colorFons", "#f2a93b");
    } else if (navigator.userAgent.includes("Chrome")) {
        body.style.backgroundColor = "green";
        sessionStorage.setItem("colorFons", "#b4ebab");
    }
    if (sessionStorage.getItem("colorFons")) {
        body.style.backgroundColor = sessionStorage.getItem("colorFons");
    }
}
cambiarColorFons()

function mostrar(){
    win = window.open("instruccions.html","Instruccions","width=500,height=300");
}

//Mostra el nom del jugador per pantalla
nomJug.innerText=document.cookie

// Funció para crear las cartas
function crearCartes() {
    // BArreja les
    const cartesBarrejades = shuffleArray(lletra_Carta);
    cartesBarrejades.forEach((valor, index) => {
        const carta = document.createElement("div");
        carta.classList.add("carta"); // Classe per a l'estil de la carta
        carta.dataset.value = valor; // Emmagatzemem el valor de la carta
        carta.dataset.id = index; // Assignem un identificador únic a la carta
        carta.addEventListener("click", girar); // Afegim l'esdeveniment per girar la carta
        cartes_btn.appendChild(carta); // Afegim la carta al contenidor
    });
}
// Funció per barajar l'array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercanviar els elements
    }
    return array;
}

// Funció per girar les cartes
function girar(e) {
    const cartaSeleccionada = e.target;

    // Evitar que es facin clics en cartes ja emparellades
    if (cartaSeleccionada.classList.contains('emparellada') || cartaSeleccionada === primeraCarta) return;

    // Mostrar valor de la carta
    cartaSeleccionada.textContent = cartaSeleccionada.dataset.value;
    cartaSeleccionada.classList.add('girada'); // Afegir la classe per girar la carta

    if (!primeraCarta) {
        primeraCarta = cartaSeleccionada; // Guardem la primera carta seleccionada
        return;
    }

    segundaCarta = cartaSeleccionada; // Guardem la segona carta seleccionada
    comprovarEmparellament();
}

// Funció per comprovar si les dues cartes són iguals
function comprovarEmparellament() {
    if (primeraCarta.dataset.value === segundaCarta.dataset.value) {
        // Si les cartes coincideixen
        primeraCarta.classList.add('emparellada');
        segundaCarta.classList.add('emparellada');
        punts += 10; // Sumar punts per emparellament correcte
        document.getElementById("punts").textContent = punts; // Actualitzar punts

        // Reiniciar cartes seleccionades
        primeraCarta = null;
        segundaCarta = null;

    } else {
        // Si les cartes no coincideixen, esperar i girar-les de nou
        setTimeout(() => {
            primeraCarta.textContent = '';
            segundaCarta.textContent = '';
            primeraCarta.classList.remove('girada');
            segundaCarta.classList.remove('girada');

            // Restar 2 punts si falla
            if (punts > 2) {
                punts -= 2; 
            } else {
                punts = 0; // Si te 0, controlar que no siguin negatius
            }

            // Reiniciar cartes seleccionades
            primeraCarta = null;
            segundaCarta = null;
        }, 1000);
    }
}
// Iniciar el joc creant les cartes
crearCartes()

// Funció per actualitzar la puntuació a la pantalla
function actualitzarPuntuacio() {
    const punts = document.getElementById('punts');
    punts.innerText = puntuacio; // Actualitzar el valor de punts al HTML
}