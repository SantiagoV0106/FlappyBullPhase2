import { express, cors, SocketIOServer, SerialPort, ReadlineParser, dotenv} from './dependencies.js'
import userRoutes from './routes/userRoutes.js'
import intRoutes from './routes/intRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import fireStoreDB from './firebase-config.js'


const SERVER_IP = "192.168.1.28";//CAMBIAR IP SIEMPRE
dotenv.config()
const PORT = process.env.PORT;
const expressApp = express(); 


const protocolConfiguration = { 
    path: 'COM3', 
    baudRate: 9600
};

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser)

parser.on('data', (arData) =>{
    let dataArray = arData.split(' ')

    let arduinoMessage = {
    state : dataArray[0],
    screen : parseInt(dataArray[2]),
    play : parseInt(dataArray[1]),
    value : parseInt(dataArray[3])
    }
    console.log(arduinoMessage);
    io.emit('arduinoInst', arduinoMessage);
})

const httpServer = expressApp.listen(PORT, () => {

    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi`,
        'Dashboard App Endpoint' : `http://localhost:${PORT}/dashboard-app` });
});

const io = new SocketIOServer(httpServer, { path: '/real-time' });

const STATIC_APP = express.static('./static/public - app')
const STATIC_MUPI = express.static('./static/public - mupi')
const STATIC_DASH = express.static('./static/public - dashboard')

expressApp.use(express.json()) 
expressApp.use(cors({ origin: "*" }));
expressApp.use('/app', STATIC_APP);
expressApp.use('/mupi', STATIC_MUPI);
expressApp.use('/dashboard-app', STATIC_DASH);
expressApp.use('/user', userRoutes)
expressApp.use('/int', intRoutes)
expressApp.use('/dashboard', dashboardRoutes) 

io.on('connection', (socket) => {
    console.log('Conectado', socket.id);

    console.log(`Client ${socket.id} connected.`);
    
      // Custom event
  socket.on('customEvent', (data) => {
    console.log('Received custom event:', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnect.`);
  });
   
    
});

fireStoreDB.updateRealTime('Leads', ()=> {
  io.emit('real-time-firebase', {state : 'Using onSnapshot'})
})


export { io };