import { fs } from "../dependencies.js";
import { io } from '../index.js';

export const postIntData = (req, res) => {
    try {
    
        // se lee el doc Users.json donde están las interacciones
        const intData = fs.readFileSync('./localCollection/interactions.json')
        const jsonIntData = JSON.parse(intData)
    
        // se crea un nuevo objeto "interactions.json"
    
        const newInt = {
            id : jsonIntData.interactions.length + 1,
            intDay : req.body.intDay    
        }
    
        // se añade el usario recien creado al "interactions.jons"
        jsonIntData.interactions.push(newInt)
    
        io.emit('real-time-update', { state: true });
    
        // aqui se escribe el nuevo usario al documento "interactions.json"
        fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonIntData, null, 2))
        // se envia las respuesta indicando que se legró crear el int
        res.status(201).send({ msn : `user ${newInt.id} created`})
    
    } catch (error) {
    
        console.log(error);
        res.status(500).send('Error adding interaction')
        
    }
    }


export const getInt = (req, res) => {
    res.send({ msn : 'Hello getting'})
}