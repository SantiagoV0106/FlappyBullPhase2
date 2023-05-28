import { fs } from "../dependencies.js";
import * as KPI from './kpiCalculations.js'

export const getInt = (req, res) => {
    try {
        const userJsonData = fs.readFileSync('./localCollection/users.json')
        const {users} = JSON.parse(userJsonData)
    
        const intJsonData = fs.readFileSync('./localCollection/interactions.json')
        const {interactions} = JSON.parse(intJsonData)
        

        //para la Bar Chart
        const mupiInts = interactions
        
        const lastFiveLeads = KPI.getLastFiveLeads(users)
        const dashtotalIntDay = KPI.countTotalInt(mupiInts)
        const totalInteractions = KPI.totalInts(interactions)

        let dashboardData = {lastFiveLeads, dashtotalIntDay, totalInteractions}
        res.send(dashboardData)


    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading JSON data');
        
    }
}
