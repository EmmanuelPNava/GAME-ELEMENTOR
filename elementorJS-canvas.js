//CONSTANTES DEL JUEGO: INICIO
let opciondeElementors
let jugadorId = null
const sectionAtaqueJugador = document.getElementById("seleccionar-ataque")
const sectionReset = document.getElementById("reset")
const botonElementor = document.getElementById("boton-elementor")
const spanelementorjugador = document.getElementById("elementor-jugador")
const spanelementorrival = document.getElementById("elementor-rival")
const sectionSelectElementor = document.getElementById("seleccionar-mascota")

const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-rival")
//const newparrafo = document.getElementById("result")

const sectionResultadoFinal = document.getElementById("contenedor-resultado-final")
const resultadofinal = document.getElementById("resultado-final")
const resetbuttom = document.getElementById("boton-reiniciar")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

//VARIABLES CANVAS
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let intervalo 
const up = document.getElementById("up")
const down = document.getElementById("down")
const right = document.getElementById("right")
const left = document.getElementById("left")
let mapaBackground = new Image()
mapaBackground.src = "./FOTOS/mapa1.jpg"
let elementorJugadorObjeto

let alturaDeseada
let anchoMapa = window.innerWidth - 20
const anchoMaximoMapa = 600

if(anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa -20 
}
alturaDeseada = anchoMapa * 400 / 600

mapa.width = anchoMapa
mapa.height = alturaDeseada

//CLASES Y OBJETOS, ARRAYS O ARREGLOS
let inputwater 
let inputfire 
let inputair
let inputearth 
let inputmetal

let botonAgua 
let botonFuego 
let botonAire 
let botonTierra 
let botonMetal 
let botones = []
let ataqueJugador = []
let ataqueElemetorRival = []

let elementors = []
let elementorJugador

class Elementor {
    constructor(name, picture, lives, x = 10, y = 10) {
        this.name = name
        this.picture = picture
        this.lives = lives
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = picture
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarElementor() {
        lienzo.drawImage (
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let waterelementor = new Elementor("WaterElementor", "./FOTOS/Elementor_de_Agua.jpg", 6)
let fireelementor = new Elementor("FireElementor", "./FOTOS/Elementor_de_Fuego.jpg", 6)
let airelementor = new Elementor("AirElementor", "./FOTOS/Elementor_de_Aire.jpg", 6)
let earthelementor = new Elementor("EarthElementor", "./FOTOS/Elementor_de_Tierra.jpg", 6)
let metalelementor = new Elementor("MetalElementor", "./FOTOS/Elementor_de_Metal.jpg", 6)

let waterelementorEnemy = new Elementor("WaterElementor", "./FOTOS/Elementor_de_Agua.jpg", 6, 495, 270)
let fireelementorEnemy = new Elementor("FireElementor", "./FOTOS/Elementor_de_Fuego.jpg", 6, 490, 110)
let airelementorEnemy = new Elementor("AirElementor", "./FOTOS/Elementor_de_Aire.jpg", 6, 480, 5)
let earthelementorEnemy = new Elementor("EarthElementor", "./FOTOS/Elementor_de_Tierra.jpg", 6, 80, 250)
let metalelementorEnemy = new Elementor("MetalElementor", "./FOTOS/Elementor_de_Metal.jpg", 6, 290, 150)

waterelementor.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)
waterelementorEnemy.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)

fireelementor.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)
fireelementorEnemy.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)

airelementor.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)
airelementorEnemy.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)

earthelementor.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)
earthelementorEnemy.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"}
)

metalelementor.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"},
    {nombre: "💎", id: "boton-metal"}
)
metalelementorEnemy.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌪", id: "boton-aire"},
    {nombre: "⌛", id: "boton-tierra"},
    {nombre: "💎", id: "boton-metal"},
    {nombre: "💎", id: "boton-metal"}
)

elementors.push(waterelementor,fireelementor,airelementor,earthelementor,metalelementor)

//INICIO JUEGO
alert("Welcome to Elementor!")

function iniciarJuego() {
    //SECCIONES ESCONDIDAS
    sectionVerMapa.style.display = "none"
    sectionAtaqueJugador.style.display = "none"
    sectionReset.style.display = "none"
    
    elementors.forEach((Elementor) => {
        opciondeElementors = `
        <input type="radio" name="elementor" id=${Elementor.name} />
        <label class="item E" for=${Elementor.name}></label>
        `
    contenedorTarjetas.innerHTML += opciondeElementors
        inputwater = document.getElementById("WaterElementor")
        inputfire = document.getElementById("FireElementor")
        inputair = document.getElementById("AirElementor")
        inputearth = document.getElementById("EarthElementor")
        inputmetal = document.getElementById("MetalElementor")
    }) 

    botonElementor.addEventListener("click", seleccionarElementorJugador)
    
    //unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarElementorJugador() {
    sectionSelectElementor.style.display = "none"
    
    if(inputwater.checked) {
        alert("You chose Water Elementor")
        spanelementorjugador.innerHTML = inputwater.id
        elementorJugador = inputwater.id

    } else if(inputfire.checked) {
        alert("You chose Fire Elementor")
        spanelementorjugador.innerHTML = inputfire.id
        elementorJugador = inputfire.id

    } else if(inputair.checked) {
        alert("You chose Air Elementor")
        spanelementorjugador.innerHTML = inputair.id
        elementorJugador = inputair.id

    } else if(inputearth.checked) {
        alert("You chose Earth Elementor")
        spanelementorjugador.innerHTML = inputearth.id
        elementorJugador = inputearth.id

    } else if(inputmetal.checked) {
        alert("You chose Metal Elementor")
        spanelementorjugador.innerHTML = inputmetal.id
        elementorJugador = inputmetal.id

    } else {
        alert("FUCK YOU!!!")
        gameover()
    }
    seleccionarElementor(elementorJugador)
    
    extraerAtaques(elementorJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarElementor(elementorJugador) {
    fetch(`http://localhost:8080/elementor/${jugadorId}`, {
        method:"post",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            elementor: elementorJugador
        })
    })
}

//FUNCTION PARA LLAMAR A LOS ATAQUES
function extraerAtaques(elementorJugador) {
    let ataques
    for (let i = 0; i < elementors.length; i++) {
        if (elementorJugador === elementors[i].name) {
            ataques = elementors[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

//FUNCTION PARA MOSTRAR LOS ATAQUES
let opciondeAtaques

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opciondeAtaques = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`
        
    contenedorAtaques.innerHTML += opciondeAtaques     
    })
    botonAgua = document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonAire = document.getElementById("boton-aire")
    botonTierra = document.getElementById("boton-tierra")
    botonMetal = document.getElementById("boton-metal")

    botones = document.querySelectorAll(".BAtaque")
}


//ELEMENTOR RIVAL 
function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarElementorEnemigo(enemigo) {
    //let elementorrival = aleatorio(0,elementors.length-1)
    
    spanelementorrival.innerHTML = enemigo.name
    ataqueElemetorRival = enemigo.ataques
    secuenciaAtaque()
}

//FUNCIONES CANVAS
function iniciarMapa() {
    intervalo = setInterval(mostarCanvas, 50)
    //mapa.width = 600
    //mapa.height = 400
    elementorJugadorObjeto = extraerElementor(elementorJugador)
    window.addEventListener("keydown", presionarTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function extraerElementor() {
    for (let i = 0; i < elementors.length; i++) {
        if (elementorJugador === elementors[i].name) {
            return elementors[i]
        }
    }
}

function mostarCanvas() {
    elementorJugadorObjeto.x = elementorJugadorObjeto.x + elementorJugadorObjeto.velocidadX
    elementorJugadorObjeto.y = elementorJugadorObjeto.y + elementorJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    elementorJugadorObjeto.pintarElementor()

    enviarPosicion(elementorJugadorObjeto.x, elementorJugadorObjeto.y)

    waterelementorEnemy.pintarElementor()
    fireelementorEnemy.pintarElementor()
    earthelementorEnemy.pintarElementor()
    airelementorEnemy.pintarElementor()
    metalelementorEnemy.pintarElementor()

    if(elementorJugadorObjeto.velocidadX !== 0 || elementorJugadorObjeto.velocidadY !== 0) {
        revisarColision(waterelementorEnemy)
        revisarColision(fireelementorEnemy)
        revisarColision(earthelementorEnemy)
        revisarColision(airelementorEnemy)
        revisarColision(metalelementorEnemy)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/elementor/${jugadorId}/posicion`, {
        method: "post",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function moverRight() {
    elementorJugadorObjeto.velocidadX = 5
    right.style.backgroundColor = "black"
}

function moverUp() {
    elementorJugadorObjeto.velocidadY = -5
    up.style.backgroundColor = "black"
}

function moverDown() {
    elementorJugadorObjeto.velocidadY = 5
    down.style.backgroundColor = "black"
}

function moverLeft() {
    elementorJugadorObjeto.velocidadX = -5
    left.style.backgroundColor = "black"
}

function presionarTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverUp()
            break
        case "ArrowDown":
            moverDown()
            break
        case "ArrowLeft":
            moverLeft()
            break
        case "ArrowRight":
            moverRight()
            break
        default:
            break
    }
}

function detenerMovimiento() {
    elementorJugadorObjeto.velocidadX = 0
    elementorJugadorObjeto.velocidadY = 0

    left.style.backgroundColor = "white"
    right.style.backgroundColor = "white"
    up.style.backgroundColor = "white"
    down.style.backgroundColor = "white"
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaJugador = elementorJugadorObjeto.y + 25
    const abajoJugador = elementorJugadorObjeto.y + elementorJugadorObjeto.alto - 25
    const izquierdaJugador = elementorJugadorObjeto.x + 25
    const derechaJugador = elementorJugadorObjeto.x + elementorJugadorObjeto.ancho - 25

    if(
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    alert (enemigo.name + " wanna fight with you!")
    seleccionarElementorEnemigo(enemigo)
    sectionVerMapa.style.display = "none"
    sectionAtaqueJugador.style.display = "flex"
}

//SECUENCIA DE ATAQUES JUGADOR
let ataqueJugadorSeleccionado

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#000"
                boton.disabled = true
                

            } else if(e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#000"
                boton.disabled = true


            } else if(e.target.textContent === "🌪") {
                ataqueJugador.push("AIRE")
                console.log(ataqueJugador)
                boton.style.background = "#000"
                boton.disabled = true


            } else if(e.target.textContent === "⌛") {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#000"
                boton.disabled = true

                
            
            } else {
                ataqueJugador.push("METAL")
                console.log(ataqueJugador)
                boton.style.background = "#000"
                boton.disabled = true

            } 
            ataqueAleatorioEnemigo()
        })
    })
}

//ATAQUE RIVAL
let ataqueRival = []

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataqueElemetorRival.length -1)

    if(ataqueAleatorio == "0") {
        ataqueRival.push("AGUA")
        

    } else if(ataqueAleatorio == "1") {
        ataqueRival.push("FUEGO")
         
        
    } else if(ataqueAleatorio == "2") {
        ataqueRival.push("AIRE")
        
        
    } else if(ataqueAleatorio == "3") {
        ataqueRival.push("TIERRA")
        
        
    } else {
        ataqueRival.push("METAL")
         
    }
    console.log(ataqueRival)
    previaCombate()
}

//FUNCIÓN ANTES DE COMBATE

function previaCombate() {
    if (ataqueJugador.length === 6) {
        Combate()
    }
}

//COMBATE
let indexAtaqueJugador
let indexAtaqueEnemigo

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueRival[enemigo]
}

let resultado
let victoriasJugador = 0
let victoriasEnemigo = 0

function Combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueRival[index]) {
            indexOponentes(index, index)
            resultado = "Almost, it's a DRAW!"

        }else if (ataqueJugador[index] == "AGUA" && (ataqueRival[index] == "FUEGO" || ataqueRival[index] == "METAL") ||
            ataqueJugador[index] == "FUEGO" && (ataqueRival[index] == "AIRE" || ataqueRival[index] == "METAL") || 
            ataqueJugador[index] == "AIRE" && (ataqueRival[index] == "AGUA" || ataqueRival[index] == "TIERRA") || 
            ataqueJugador[index] == "TIERRA" && (ataqueRival[index] == "AGUA" || ataqueRival[index] == "FUEGO") || 
            ataqueJugador[index] == "METAL" && (ataqueRival[index] == "AIRE" || ataqueRival[index] == "TIERRA")) {
                indexOponentes(index, index)
                resultado = "You WON!🍻🍻🍻"
            
                victoriasJugador++
                spanVictoriasJugador.innerHTML = victoriasJugador
        }else { 
            indexOponentes(index, index)
            resultado = "You LOST!🤣🤣🤣"
            
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }    
    } 
    
    resuladofinal()
}

//MENSAJE
const newplayerattack = document.getElementById("player-attack")
const newenemyattack = document.getElementById("enemy-attack")

function crearMensaje() {
    //RESULTADO
    //newparrafo.innerHTML = resultado

    //ATAQUE JUGADOR
    
    //ATAQUE ENEMIGO
    let enemyattack = document.createElement("p")
    enemyattack.innerHTML = indexAtaqueEnemigo
    newenemyattack.appendChild(enemyattack)
}

//VIDAS
sectionResultadoFinal.style.display = "none"
function resuladofinal() {
    sectionResultadoFinal.style.display = "flex"

    let parrafodos = document.createElement("p")

    if(victoriasEnemigo > victoriasJugador) {
        
        parrafodos.innerHTML = "YOU LOST THE WAR!!!"
        resultadofinal.appendChild(parrafodos)
        sectionReset.style.display = "flex"
    }
    else if(victoriasJugador > victoriasEnemigo) {
        
        parrafodos.innerHTML = "YOU WON THE WAR!!!"
        resultadofinal.appendChild(parrafodos)
        sectionReset.style.display = "flex"
    } else {
        parrafodos.innerHTML = "ALMOST, IT WAS A DRAW!!!"
        resultadofinal.appendChild(parrafodos)
        sectionReset.style.display = "flex"
    }
}

//REINICIAR
resetbuttom.addEventListener("click", gameover)

function gameover() {
    location.reload()
}

window.addEventListener('load', iniciarJuego)