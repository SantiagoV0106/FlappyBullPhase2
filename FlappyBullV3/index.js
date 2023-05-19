import { express, Server, cors, os, SerialPort, ReadlineParser, dotenv} from './dependencies.js'
import userRoutes from './routes/userRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'


const SERVER_IP = "192.168.1.28";//CAMBIAR IP SIEMPRE
dotenv.config()
const PORT = process.env.PORT;
const expressApp = express(); 
const STATIC_APP = express.static('./static/public - app')
const STATIC_MUPI = express.static('./static/public - mupi')
const STATIC_DASH = express.static('./static/public - dashboard')

expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json()) 
expressApp.use('/app', STATIC_APP);
expressApp.use('/mupi', STATIC_MUPI);
expressApp.use('/dashboard-app', STATIC_DASH);
expressApp.use('/user', userRoutes)
expressApp.use('/dashboard', dashboardRoutes)


// const protocolConfiguration = { 
//     path: 'COM3', 
//     baudRate: 9600
// };

// const port = new SerialPort(protocolConfiguration);
// const parser = port.pipe(new ReadlineParser)

// parser.on('data', (arData) =>{
//     let dataArray = arData.split(' ')

//     let arduinoMessage = {
//     state : dataArray[0],
//     screen : parseInt(dataArray[2]),
//     play : parseInt(dataArray[1]),
//     value : parseInt(dataArray[3])
//     }
//     console.log(arduinoMessage);
//     io.emit('arduinoInst', arduinoMessage);
// })

const httpServer = expressApp.listen(PORT, () => {

    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi`,
        'Dashboard App Endpoint' : `http://${SERVER_IP}:${PORT}/dashboard-app` });
});

const io = new Server(httpServer, { path: '/real-time' }); 

io.on('connection', (socket) => {
    console.log('Conectado', socket.id);

    // socket.on('mupi-screen', paquete1 =>{
    //     console.log(`Se envio el cambio de pantalla para el mupi case ${paquete1}`)
    //     socket.broadcast.emit('current-mupi-screen',paquete1);
    // })
    // socket.on('game-mupi-screen', tap2play =>{
       
    //     socket.broadcast.emit('game-phone-screen',tap2play);
    // })
    // socket.on('game-instructions', instrucciones =>{
    //     console.log(`El usario ya está jugando. Está llegando este valor ${instrucciones}`)
    //     socket.broadcast.emit('mupi-game-instructions',instrucciones);
    // })
   
    
});

// let userData;

// expressApp.post('/user-data', (req, res) => {
//     userData = req.body;
//     console.log(userData);
//     // res.send({Data: `User data is: ${userData}`})
// });

// expressApp.get('/get-user', (req,res)=>{

//     res.send(userData)

// })