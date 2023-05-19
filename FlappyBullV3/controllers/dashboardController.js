import { fs } from "../dependencies.js";

export const postIntData = (req, res) => {
    try {
        const intData = fs.readFileSync('./localCollection/interactions.json')
        const jsonIntData = JSON.parse(intData)

        const newInt = {
            id : jsonIntData.interactions.length + 1,
            location: req.body.locations,
            date: req.body.date,
            device: req.body.device,
            TimeIntStarted: req.body.TimeIntStarted,
            IntDuration: req.body.IntDuration
        }

        jsonIntData.interactions.push(newInt)

        fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonIntData, null, 2))
        res.status(201).send({msn : `int ${newInt.id} created`})

    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding Int');
    }
}

export const getInt = (req, res) => {
    try {
        const userJsonData = fs.readFileSync('./localCollection/users.json')
        const intJsonData = fs.readFileSync('./localCollection/interactions.json')
        const {users} = JSON.parse(userJsonData)
        const {interactions} = JSON.parse(intJsonData)


    } catch (error) {
        
    }
}
