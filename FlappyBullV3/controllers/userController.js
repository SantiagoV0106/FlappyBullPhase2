import { fs } from "../dependencies.js";
import { io } from '../index.js';
import fireStoreDB from "../firebase-config.js";

export const postUserData = (req, res) => {
try {

    // se lee el doc Users.json donde están los usuarios
    const data = fs.readFileSync('./localCollection/users.json')
    const jsonData = JSON.parse(data)

    // se crea un nuevo objeto "users.json"

    const newUser = {
        id : jsonData.users.length + 1,
        name : req.body.name,
        email : req.body.email,
        number : req.body.numero,
        flavor : req.body.flavor,
        date: req.body.date,
        intDay : req.body.intDay,
        device: req.body.device,
        TimeIntStarted: req.body.TimeIntStarted,
        IntDuration: req.body.IntDuration

    }

    // se añade el usario recien creado al "users.jons"
    jsonData.users.push(newUser)

    io.emit('real-time-update', { state: true });

    fireStoreDB.addNewDoc(newUser, 'Leads')

    // aqui se escribe el nuevo usario al documento "users.json"
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonData, null, 2))
    // se envia las respuesta indicando que se legró crear el usario
    res.status(201).send({ msn : `user ${newUser.id} created`})

} catch (error) {

    console.log(error);
    res.status(500).send('Error adding user')
    
}
}


export const getUsers = (req, res) => {
    res.send({ msn : 'Hello getting'})
}