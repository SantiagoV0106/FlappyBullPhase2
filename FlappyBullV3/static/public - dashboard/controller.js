//const NGROK = `${window.location.hostname}`;
//console.log('192.168.1.28', NGROK);
const view = new View()
const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;
const PORT = window.location.port === ''? '' : `:${window.location.port}`
const URL = `${PROTOCOL}//${HOST}${PORT}`;
console.log(URL);
const socket = io(URL, { path: '/real-time' });

function controller(view) {
    
    (async function getDashboardData() {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        kpi = data;
        console.log(kpi);
        view.updateBarChart(kpi.dashtotalIntDay)
        view.updateTable(kpi.lastFiveLeads);
        view.updateMupiInt(kpi.totalInteractions);
    })();

    const updateRealTime = async () => {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        const kpi = data;
        view.updateTable(kpi.lastFiveLeads);
        view.updateTable(kpi.lastFiveLeads);
        console.log('Hello from updateRealTime');
    }

    socket.on('real-time-update', (data) => {
        console.log('Some update happen!');
        console.log(data);
        updateRealTime();
    });
    
    view.render()
}

controller(view, socket)