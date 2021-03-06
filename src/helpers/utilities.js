const checkOneOfThePairIsInTheRoundBetweenTeams = (round,i,j) =>
{
    return Array.from(round.keys()).filter((key) => `${i}` === key.split(":")[0] || `-${j}` ===  key.split(":")[1]).length > 0
}

const checkOneOfThePairIsInTheRoundWithinTeam = (round,i,j) =>
{
    return Array.from(round.keys()).filter((key) => `${i}` === key.split(":")[0] || `${j}` ===  key.split(":")[0] || `${i}` === key.split(":")[1] || `${j}` ===  key.split(":")[1]).length > 0
}

const assignPairInScheduleBetweenTeams = (map,pair,i,j,startFrom) =>
{
    let iterator= startFrom 
    for(let play = 0; play < map.length ; iterator = ((iterator + 1) % map.length), play++ ) 
    {
        if(!checkOneOfThePairIsInTheRoundBetweenTeams(map[iterator],i,j))
        {
            map[iterator].set(`${i}:-${j}`,pair)
            return iterator
        }
    }

    return iterator
}

const assignPairInScheduleWithinTeam = (map,pair,i,j,startFrom) =>
{
    let iterator= startFrom 
    
    for(let play = 0; play < map.length ; iterator = ((iterator + 1) % map.length), play++ ) 
    {
        let round = map[iterator]

        if(!checkOneOfThePairIsInTheRoundWithinTeam(round,i,j))
        {
            map[iterator].set(`${i}:${j}`,pair)
            return iterator
        }
    }

    return iterator
}

const checkPairExistInTheList = (list,i,j) =>
{
    let listLength = list.length

    for(let iterator = 0 ; iterator< listLength ; iterator++) 
    {
        let pair = list[iterator]
        if(pair === `${i}:${j}` || pair === `${j}:${i}`)
        {
            return true
        }
    }
    return false
}

const renderScheduleBetweenTeams = (teamOne, teamTwo) =>
{
    let map = []
    const roundCount = Math.max(teamOne.length,teamTwo.length)
    let count = 0
    let startFrom = 0
    
    teamOne.forEach((one, i) =>  {
        teamTwo.forEach((two, j) => {
            if(count++ < roundCount)
            {
                map.push(new Map())
            }
            startFrom =  (assignPairInScheduleBetweenTeams(map,{one,two},i,j,startFrom) + 1) % roundCount
        })
    })

   return map
}

const renderScheduleWithinTeam = (team) => {
    let map = []
    const teamCount = team.length
    const roundCount = teamCount % 2 === 0 ? teamCount - 1 : teamCount
    let count = 0
    let startFrom = 0

    let pairsTillNow = []

    team.forEach((one, i) => {
        team.forEach((two, j) => {

            if(i!==j && !checkPairExistInTheList(pairsTillNow,i,j))
            {
                if(count++ < roundCount)
                {
                    map.push(new Map())
                }
                pairsTillNow.push(`${i}:${j}`)
                startFrom =  (assignPairInScheduleWithinTeam(map,{one,two},i,j,startFrom) + 1) % roundCount
                
            }
        })
    })

    return map
}

const getListFromText = (list) => {
    return list.split("\n").map((value) => value.trim()).filter((value) => value.length > 0)
}


const shuffleMyList = (list) => {
 
    return list.sort( ()=>Math.random()-0.5 );
  
 }

export {renderScheduleBetweenTeams, renderScheduleWithinTeam, checkPairExistInTheList, shuffleMyList, getListFromText}