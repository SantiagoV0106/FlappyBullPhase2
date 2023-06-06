const NGROK = `${window.location.hostname}`;
console.log('192.168.1.28', NGROK);
let socket = io(NGROK, { path: '/real-time' });

// metadatos

const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const fechaActual = new Date();
const diaSemana = fechaActual.getDay();

const nombreDia = diasSemana[diaSemana];

console.log(nombreDia);

const dates = new Date().getTime()
const dateInt = new Date(dates).toLocaleDateString()
const device = navigator.userAgent
let deviceType;
if (/iPhone|iPad|iPod/.test(device)) {
  deviceType = 'iOS';
} else if (/Android/.test(device)) {
  deviceType = 'Android';
} else if (/windows/) {
  deviceType = 'Windows';
} else {
  deviceType = 'Other'
}
const time = new Date().getTime()
const timeStarted = new Date(time).toLocaleTimeString()
console.log(timeStarted);

// DOM

const nameInput = document.getElementById('nombre')
const emailInput = document.getElementById('correo')
const numberInput = document.getElementById('numero')
const checkbox = document.getElementById('checkbox')
const myForm = document.getElementById('maiform')
const titulo = document.getElementById('contendor-titulo')
const form = document.getElementById('contendor-form')
const final = document.getElementById('contendor-final')
const sb = document.getElementById('submit')

// sabores
const watermelon = document.getElementById('watermelon-checkbox')
const blueberry = document.getElementById('blueberry-checkbox')

let flavorCB

watermelon.addEventListener('change', ()=> {
  if (watermelon.checked && !blueberry.checked) {
    flavorCB = "Watermelon"
    console.log('watermelon checked');
  }
})

blueberry.addEventListener('change', ()=> {
  if (!watermelon.checked && blueberry.checked) {
    flavorCB = "Blueberry"
    console.log('blueberry checked');
  }
})


checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    sb.removeAttribute('disabled')
  } else {
    sb.setAttribute('disabled', true)
  }
})


myForm.addEventListener('submit', (e) => {
  if (!checkbox.checked) {
    e.preventDefault()
    alert('Please accept the privacy terms')

  } else {
    const SendTime = new Date().getTime()
    const IntDuration = SendTime - time
    const DurationSec = IntDuration / 1000

    let user = {
      name: nameInput.value,
      email: emailInput.value,
      numero: numberInput.value,
      flavor: flavorCB,
      date: dateInt,
      intDay: nombreDia,
      device: deviceType,
      TimeIntStarted: timeStarted,
      IntDuration: DurationSec
    }

    console.log(flavorCB);
    userData(user);
    console.log('Enviado');

  }
})



async function userData(user) {
  const data = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }
  await fetch('/user', data);

}



/*
Aqui va como hacer un post con metadatos para cuando toque hacerlo con el arduino
const dates = new Date().getTime()
const dateInt = new Date(dates).toLocaleDateString()
const device = navigator.userAgent

    let otherData = { locations: locations, date: dateInt, device: deviceType, TimeIntStarted: timeStarted, IntDuration : DurationSec }
    postData(otherData)
    
async function postData(datas) {

  const data2 = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(datas)
  }

  await fetch('/dashboard', data2)

}

*/