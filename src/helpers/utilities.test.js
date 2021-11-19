import { renderMapBetweenTeams, checkPairExistInTheList, renderMapWithinTeam, getListFromText } from "./utilities";

describe('test get list from text', () => {

    test('should return empty list for empty text', () => 
    {
        const text  = ""
        const list  = getListFromText(text)
        expect(list.length).toBe(0)
    })
    
    test('should return a list with all the values trimmed', () => 
    {
        const text  = `hello \n hello \n hey`
        let expectedList = ["hello", "hello", "hey"]

        const actualList  = getListFromText(text)

        expect(actualList.length).toBe(3)
        expect(expectedList).toStrictEqual(actualList)
    })

    test('should skip the value if it is empty', () => 
    {
        const text  = `hello \n \n`
        let expectedList = ["hello"]

        const actualList  = getListFromText(text)
        
        expect(actualList.length).toBe(1)
        expect(expectedList).toStrictEqual(actualList)
    })
})

describe('test render map between teams', () => {

    let team1 = ["a", "b"]
    let team2 = ["c", "d"]

    let actualMap = renderMapBetweenTeams(team1,team2)

    test('should return a map between given teams', () => 
    {
        expect(actualMap).toBeTruthy()
    })

    test('should return empty map if either team is empty', () => 
    {
        let team1 = ["a", "b"]
        let team2 = []

        let actualMap = renderMapBetweenTeams(team1,team2)

        expect(actualMap.length).toBe(0)
    })

    test('should return a map having rounds of highest team count', () => 
    {
        let expectedCount = Math.max(team1.length,team2.length)
        expect(actualMap.length).toBe(expectedCount)
    })

    test('should return a map without a player conflict within all its rounds', () =>
    {
        actualMap.forEach(round => {
        expect(checkForConflictWithinARound(round)).toBeFalsy()      
        });
    })

    test('should return a map which has all the pair within a team', () => 
    {
        expect(returnAllThePairsInTheMap(actualMap).sort()).toEqual(returnAllPossiblePairsBetweenTeams(team1,team2).sort())
    })

})

describe('test render map within team', () => {

    let team = ["a","b","c","d"]

    let actualMap = renderMapWithinTeam(team)

    test('should return a map for a given team', () => 
    {
        expect(actualMap).toBeTruthy()
    })

    test('should return empty map if the team is empty', () => 
    {
        let team = []

        let actualMap = renderMapWithinTeam(team)

        expect(actualMap.length).toBe(0)
    })

    test('should return empty map if the team has only one player', () => 
    {
        let team1 = ["a"]

        let actualMap = renderMapWithinTeam(team1)

        expect(actualMap.length).toBe(0)
    })


    test('should return a map without a player conflict within all its rounds', () =>
    {
        actualMap.forEach(round => {
        expect(checkForConflictWithinARound(round)).toBeFalsy()      
        });
    })

    test('should return a map which has all the pair within a team', () => 
    {
        expect(returnAllThePairsInTheMap(actualMap).sort()).toEqual(returnAllPossiblePairsWithinATeam(team).sort())
    })

})


// helper functions
const checkForConflictWithinARound = (round) => {

    let players = []
    let playersInSet = new Set()
    const roundArray = Array.from(round.keys())

    let roundLength = roundArray.length

    for(let iterator=0 ; iterator < roundLength ; iterator++) 
    {
        let pair = roundArray[iterator].split(":")

        players.push(pair[0])
        playersInSet.add(pair[0])
        players.push(pair[1])
        playersInSet.add(pair[1])
    }

    return players.length !== playersInSet.size
}

const returnAllPossiblePairsWithinATeam = (team) => {

    let pairsTillNow = []

    team.forEach((one, i) => {
        team.forEach( (two, j) => {

            if(!(i===j || checkPairExistInTheList(pairsTillNow,i,j)))
            {
                pairsTillNow.push(`${i}:${j}`)
            }

        })
    })
    
    return pairsTillNow
}

const returnAllPossiblePairsBetweenTeams = (team1, team2) => {
    let possiblePairs = []

    team1.forEach((one, i) => {
        team2.forEach( (two, j) => {
            possiblePairs.push(`${i}:-${j}`)
        })
    })
    
    return possiblePairs
}

const returnAllThePairsInTheMap = (map) => {
    let pairsInTheMap = []

    map.forEach(round => {
        Array.from(round.keys()).forEach(pair => {
            pairsInTheMap.push(pair)
        })
    })

    return pairsInTheMap
}
