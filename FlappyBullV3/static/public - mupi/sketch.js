const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, {
  path: '/real-time'
});
console.log('192.168.1.28', NGROK);

let cnvWidth = 431
let cnvHeigth = 768
let currentMupiscreen = 0
let flapMupi

let intState = false
console.log(intState);

const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const fechaActual = new Date();
const diaSemana = fechaActual.getDay();

const nombreDia = diasSemana[diaSemana];

console.log(nombreDia);

// declaro las variables del juego
var toro
var score
let imageMupi = []
let font
let scoreSE
let videoIntro
let preScore = 0
let contador = 3
let tubos = []; // Array para almacenar los tubos
let gapSize; // Tamaño del hueco entre los tubos
let tuboWidth = 80; // Ancho de los tubos
let tuboSpeed = 2; // Velocidad de movimiento de los tubos

var source = "assets/scoreSE.mp3"
var audio = document.createElement("audio");
audio.autoplay = true

audio.load()
audio.src = source

var goSound = "assets/gameover.mp3"
var gameOversound = document.createElement('audio')
audio.autoplay = true

gameOversound.load()
gameOversound.src = goSound


var sourcevideo = "assets/video.mp4"
var video = document.createElement('video')

var contonedor = document.getElementById('videoredbull')
contonedor.append(video)
console.log(video);
video.load()
video.src = sourcevideo

video.addEventListener('click', () => {
  video.autoplay = true
  video.play()
})

function loadImageMupi() {
  imageMupi[0] = loadImage('assets/0.jpg')
  imageMupi[1] = loadImage('assets/1.jpg')
  imageMupi[2] = loadImage('assets/BGame.jpg')
  imageMupi[3] = loadImage('assets/bull.png')
  imageMupi[4] = loadImage('assets/score.png')
  imageMupi[5] = loadImage('assets/GameOver.jpg')
  imageMupi[6] = loadImage('assets/tubo1.png')
  imageMupi[7] = loadImage('assets/tubo2.png')
  imageMupi[8] = loadImage('assets/BgameCountDown.jpg')
  imageMupi[9] = loadImage('assets/thx4playing.jpg')
}

function preload() {
  loadImageMupi()
  font = loadFont('assets/SansSerifBldFLF.otf')
}


// creo al toro
function Toro() {
  this.y = 250
  this.x = 50

  // fisicas
  this.gravedad = 0.25
  this.salto = 4.6
  this.velocidad = 0

  this.show = function () {
    // fill(255)
    // ellipse(this.x,this.y,40,40)
    image(imageMupi[3], this.x - 30, this.y - 30, 60, 60)
  }

  this.flap = function () {
    this.velocidad = - this.salto

  }

  this.update = function () {
    this.velocidad += this.gravedad
    this.y += this.velocidad

    if (this.y > cnvHeigth) {
      this.y = cnvHeigth
      this.velocidad = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.velocidad = 0
    }

  }


}

function Puntaje() {
  this.value = 0

  this.show = function () {
    textFont(font)
    textSize(20)
    fill(255)
    text(this.value, 130, 76)

  }
}

function setup() {
  createCanvas(cnvWidth, cnvHeigth)
  toro = new Toro()
  score = new Puntaje()
  gapSize = 200; // Tamaño del hueco en la mitad de la pantalla
  crearTubo(); // Crear los primeros tubos

}

function crearTubo() {
  let tuboHeight = random(150, height - gapSize - 80); // Calcular la altura del tubo superior

  let nuevoTubo = {
    x: width, // Posición inicial en el lado derecho del lienzo
    y1: 0, // Coordenada y del tubo superior
    y2: tuboHeight, // Coordenada y del tubo inferior
  };

  tubos.push(nuevoTubo); // Agregar el nuevo tubo al array
}

function moverTubos() {
  for (let i = tubos.length - 1; i >= 0; i--) {
    let tubo = tubos[i];
    tubo.x -= tuboSpeed;

    if (tubo.x + tuboWidth < 0) {
      tubos.splice(i, 1);
      score.value += 1
      if (preScore !== score.value) {
        preScore = score.value
        audio.play()
      }
    }
  }
}

function mostrarTubos() {
  for (let i = 0; i < tubos.length; i++) {
    let tubo = tubos[i];

    // Mostrar el tubo superior
    image(imageMupi[6],tubo.x, tubo.y1, tuboWidth, tubo.y2)
    //rect(tubo.x, tubo.y1, tuboWidth, tubo.y2);
    
    // Mostrar el tubo inferior
    image(imageMupi[7],tubo.x, tubo.y2 + gapSize, tuboWidth, height - tubo.y2 - gapSize)
    //rect(tubo.x, tubo.y2 + gapSize, tuboWidth, height - tubo.y2 - gapSize);
  }
}

function crearTuboSiEsNecesario() {
  if (frameCount % 150 === 0) {
    crearTubo();
  }
}

function hitTubos() {
  for (let i = 0; i < tubos.length; i++) {
    let tubo = tubos[i];
    
    if (toro.x + 20 > tubo.x && toro.x <
      tubo.x + tuboWidth && toro.y < tubo.y2) {
      return true
    }

    if (toro.x + 20 > tubo.x &&
      toro.x < tubo.x + tuboWidth &&
      toro.y + 20 > tubo.y2 + gapSize) {
      return true
    }

  }
  return false
}

function gameOver() {
  currentMupiscreen = 4
  console.log('Hit');
  gameOversound.play()
}

function draw() {
  switch (currentMupiscreen) {
    case 0:
      video.style.position = 'absolute'
      break;

    case 1:
      video.style.display = 'none'
      image(imageMupi[0], 0, 0)

      if (frameCount % 700 == 0) {
        currentMupiscreen = 2
        changeScreenPhone(2)
      }

      break;

    case 2:
      video.style.display = 'none'
      image(imageMupi[1], 0, 0)
      break;

    case 3:
      image(imageMupi[8], 0, 0)
      video.style.display = 'none'
      textSize(32);
      textAlign(CENTER);
      fill('white');
      text(contador, width / 2, height / 2);

      if (frameCount % 60 == 0 && contador > 0) {
        contador--;
      }


      if (contador == 0) {
        image(imageMupi[2], 0, 0)
        toro.show()
        toro.update()
        score.show()

        moverTubos();
        mostrarTubos();
        crearTuboSiEsNecesario();
        if (hitTubos()) {
          gameOver()
        }
        
        image(imageMupi[4], 20, 20)
      }
      break;
    case 4:
      image(imageMupi[5], 0, 0)
      
      if (frameCount % 2000 == 0) {
        currentMupiscreen = 5
      }
      break;
      case 5 :
        image(imageMupi[9], 0, 0)
    default:
      break;
  }
}



function mouseClicked() {
  if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && currentMupiscreen === 0) {
    intState = true
    itsInt()
    console.log('It`s an interaction');
  }

  if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && currentMupiscreen === 3) {
    console.log('Clikeado');
    toro.flap()
  }
}

function changeScreenPhone(tap2play) {
  socket.emit('game-mupi-screen', tap2play)
}


function itsInt() {
  if (intState !== false) {
    let newintData = { intDay: nombreDia }
    postInt(newintData)
    console.log('it`s a interaction!');
  }
}

async function postInt(newintData) {
  const intdata = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newintData)
  }

  await fetch('/int', intdata)


}

socket.on('arduinoInst', (arduinoMessage) => {
  console.log(`Llegaron estas instrucciones ${arduinoMessage}`);
  let { state, play, screen, value } = arduinoMessage
  console.log(state);
  if (currentMupiscreen == 0) {
    currentMupiscreen = screen
  } else if (currentMupiscreen == 2) {
    currentMupiscreen = play
  }

  console.log(screen);
  console.log(play);

  flapMupi = value
  toro.flap(flapMupi)
})

