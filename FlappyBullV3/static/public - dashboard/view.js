const NGROK = `${window.location.hostname}`;
console.log('192.168.1.28', NGROK);
let socket = io(NGROK, { path: '/real-time' });


let btn = document.querySelector('#btnmenu')
let sidebar = document.querySelector('.sidebar')

btn.addEventListener('click', ()=> {
    sidebar.classList.toggle('active')
})