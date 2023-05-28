export function getLastFiveLeads (users) {
    return users.slice(-5)
}

export function countTotalInt(mupiInts) {
   const dayCounts = {}

   for (let i = 0; i < mupiInts.length; i++) {
    const day = mupiInts[i].intDay;
    dayCounts[day] = (dayCounts[day] || 0) + 1
    
   }
   return dayCounts
}

export function totalInts(interactions) {
    const todasLasInts = interactions.length
    return todasLasInts
    
}