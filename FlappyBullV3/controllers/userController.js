import { fs } from "../dependencies.js";

export const postUserData = (req, res) => {

try {

    // se lee el doc Users.json donde están los usuarios
    const data = fs.readFileSync('./localCollection/users.json')
    const jsonData = JSON.parse(data)

    // se crea un nuevo objeto "users.json"

    const newUser = {
        id : jsonData.users.length + 1,
        name : req.body.name,
        email : req.body.email
    }

    // se añade el usario recien creado al "users.jons"
    jsonData.users.push(newUser)

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