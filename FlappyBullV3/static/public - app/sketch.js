const NGROK = `${window.location.hostname}`;
console.log('192.168.1.28', NGROK);
let socket = io(NGROK, { path: '/real-time' });

// metadatos

const locations = window.location.href
const dates = new Date().getTime()
const dateInt = new Date(dates).toLocaleDateString()
const device = navigator.userAgent
let deviceType;
if (/iPhone|iPad|iPod/.test(device)) {
    deviceType = 'iOS';
} else if (/Android/.test(device)) {
    deviceType = 'Android';
} else if (/windows/){
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
const checkbox = document.getElementById('checkbox')
const myForm = document.getElementById('maiform')
const titulo = document.getElementById('contendor-titulo')
const form = document.getElementById('contendor-form')
const final = document.getElementById('contendor-final')
const sb = document.getElementById('submit')


checkbox.addEventListener('change', ()=> { 
  if (checkbox.checked) {
    sb.removeAttribute('disabled')
  } else {
    sb.setAttribute('disabled', true)
  }
})


myForm.addEventListener('submit', (e)=>{
  if (!checkbox.checked) {
    e.preventDefault()
    alert('Please accept the privacy terms')
  } else {   

    let user = {name : nameInput.value, email : emailInput.value}
    userData(user);
    
    const SendTime = new Date().getTime()
    const IntDuration = SendTime - time
    const DurationSec = IntDuration / 1000

    let otherData = { locations: locations, date: dateInt, device: deviceType, TimeIntStarted: timeStarted, IntDuration : DurationSec }
    postData(otherData)
    
    
    titulo.style.display = 'none'
    form.style.display = 'none'
    final.style.display = 'flex'
    console.log('Enviado');
    
  }
})



async function userData(user) {
  const data = {
      method: 'POST',
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
  }
  await fetch('/user', data);

}

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