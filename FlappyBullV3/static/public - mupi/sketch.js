// Aqui se conecta el servidor
const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, {
  path: '/real-time'
});
console.log('192.168.1.28', NGROK);

let cnvWidth = 431
let cnvHeigth = 768
let currentMupiscreen = 0
let flapMupi

// declaro las variables del juego
var toro
var tubos = []
var score
let imageMupi = []
let font 
let scoreSE
let videoIntro
let preScore = 0

var source = "assets/scoreSE.mp3"
var audio = document.createElement("audio");
audio.autoplay = true

audio.load()
audio.src = source


var sourcevideo = "assets/video.mp4"
var video = document.createElement('video')

var contonedor = document.getElementById('videoredbull')
contonedor.append(video)
console.log(video);
video.load()
video.src = sourcevideo

video.addEventListener('click', ()=> {
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
}

function preload () {
  loadImageMupi()
  font = loadFont('assets/SansSerifBldFLF.otf')
}


// creo al toro
function Toro() {
  this.y = cnvHeigth / 2
  this.x = 50

// fisicas
this.gravedad = 0.25
this.salto = 4.6
this.velocidad = 0

  this.show = function() {
    // fill(255)
    // ellipse(this.x,this.y,40,40)
    image(imageMupi[3], this.x - 30,this.y - 30, 60, 60)
  }

  this.flap = function(){ 
    this.velocidad =- this.salto
    
  }

  this.update = function(){ 
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

// se crean los tubos

function Tubo(){
  this.top = random(250, cnvHeigth/2)
  this.buttom = random(cnvHeigth/2)
  this.x = cnvWidth
  this.w = 120
  this.speed = 1


  this.show = function(){
    // fill(255)
    // rect(this.x,0,this.w,this.top)
    image(imageMupi[6], this.x, 0, this.w, this.top)
    // fill('red')
    // rect(this.x,cnvHeigth - this.buttom, this.w, this.buttom)
    image(imageMupi[7], this.x, cnvHeigth - this.buttom, this.w, this.buttom)
  }

  this.update = function(){
    this.x -= this.speed
  }
  this.offsscreen = function(){
   if (this.x < - this.w) {
    return true
   } else {
    return false
   }
  }

  this.hits = function(toro){
    if (toro.y < this.top || toro.y > cnvHeigth - this.buttom) {
      if (toro.x > this.x && toro.x < this.x + this.w) {
        currentMupiscreen = 4
        return true
      }
    }
    return false
  }

}

function Puntaje(){
  this.value = 0

  this.show = function(){
    textFont(font)
    textSize(20)
    fill(255)
    text(this.value, 130 , 76)
    
  }
}



function setup(){
createCanvas(cnvWidth,cnvHeigth)
toro = new Toro()
score = new Puntaje()
tubos.push(new Tubo())

}

function draw() {
switch (currentMupiscreen) {
  case 0: 
  video.style.position = 'absolute'   
    background('white')
    text('Pantalla 1 del mupi <3',cnvWidth/2 - 120 , cnvHeigth/2)    
    break;
    
    case 1 : 
    video.style.display = 'none'   
    // video.autoplay = false
    image(imageMupi[0], 0, 0)
    
    if (frameCount % 700 == 0) {
      currentMupiscreen=2
      changeScreenPhone(2)
    }
    
    break;
    
    case 2 :
      image(imageMupi[1], 0, 0)
      // background('red')
      // fill(255)
      // text('Pantalla START llegamos acá después de 40 segs <3',cnvWidth/2 - 120 , cnvHeigth/2)
      break;
      case 3 :
        background('black')
        image(imageMupi[2], 0, 0)
        toro.show()
        toro.update()
        score.show()
        
        if (frameCount % 200 == 0) {
          tubos.push(new Tubo())
        }
        
        for (var i = tubos.length - 1 ; i >= 0; i--) {
          tubos[i].show()
          tubos[i].update()
          
          if (tubos[i].hits(toro)) {
            console.log('HIT');
          }
          
          if (tubos[i].offsscreen()) {
            tubos.splice(i,1)
            score.value += 1
            if (preScore !== score.value) {
              audio.play()
              preScore = score.value
            }
          }      
          image(imageMupi[4], 20, 20 )          
          }
        // fill(255)
        // text('Pantalla del juego, se supone que ya está JUGANDO <3',cnvWidth/2 - 120 , cnvHeigth/2)
        break;
        case 4 :
      background('red')
      // fill(255)
      // text('JAJAJA perdiste amigo, mete tus datos <3',cnvWidth/2 - 120 , cnvHeigth/2)
      image(imageMupi[5], 0 ,0)
      changeScreenPhone(4)
      default:
        break;
        
      }
    }



    function mouseClicked(){
      getUser()
      if (mouseX > 0 && mouseX < 430 && mouseY > 0 && mouseY < 768 && currentMupiscreen === 3) {
        console.log('Clikeado');
        toro.flap()
      }
    }
    
    function changeScreenPhone(tap2play) {
      socket.emit('game-mupi-screen', tap2play)
  
}

// socket.on('current-mupi-screen',paquete1 => {
// console.log(`Llegó el cambio de pantalla caso ${paquete1}`);
// currentMupiscreen = paquete1
// })
// socket.on('mupi-game-instructions',instrucciones => {
// console.log(`Llegaron estas instrucciones ${instrucciones}`);
// flapMupi = instrucciones
// toro.flap(flapMupi)
// })

socket.on('arduinoInst', (arduinoMessage) => {
console.log(`Llegaron estas instrucciones ${arduinoMessage}`);
let {state, play, screen, value} = arduinoMessage
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



async function getUser() {
  
  const res = await fetch('/get-user')
  const data =  await res.json()
  console.log(data);

}
