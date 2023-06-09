export function getLastFiveLeads (users) {
    return users.slice(-5)
}

export function allLeads(users) {
    const allLeads = users
    return allLeads    
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

export function getFlavors(flavors) {
    const flavorCounts = {}

    for (let i = 0; i < flavors.length; i++) {
        const RBFlavors = flavors[i].flavor;
        flavorCounts[RBFlavors] = (flavorCounts[RBFlavors] || 0) + 1
    }
    
    return flavorCounts
}