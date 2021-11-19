const checkPairIsInARound = (round,i,j) =>
{
    return !(Array.from(round.keys()).filter((key) => `${i}` === key.split(":")[0] || `-${j}` ===  key.split(":")[1]).length > 0)
}

const assignPairInMap = (map,pair,i,j,startFrom) =>
{
    for(let iterator= startFrom ; iterator< map.length ; iterator++ % map.length) 
    {
        if(checkPairIsInARound(map[iterator],i,j))
        {
            map[iterator].set(`${i}:-${j}`,pair)
            return iterator
        }
    }
}

const renderMapBetweenTeams = (teamOne, teamTwo) =>
{
    let map = []
    const higherLength = Math.max(teamOne.length,teamTwo.length)
    let count = 0
    let startFrom = 0
    
    teamOne.forEach((one,i) =>  {
        teamTwo.forEach((two,j) => {
            if(count++ < higherLength)
            {
                map.push(new Map())
            }
            startFrom =  (assignPairInMap(map,[one,two],i,j,startFrom) + 1) % map.length
        })
    })

   return map
}

const renderMapWithinTeam = (team) => {
    let map = []

    return map
}

const getArrayFromList = (list) => {
    return list.split("\n").filter((value) => value.trim().length > 0)
}

export {renderMapBetweenTeams, renderMapWithinTeam, getArrayFromList}