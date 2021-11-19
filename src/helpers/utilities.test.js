import { renderMapBetweenTeams, renderMapWithinTeam} from "./utilities";

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
        expect(returnAllThePairsInTheMap(actualMap).sort()).toEqual(returnAllPossiblePairWithinTeams(team1,team2).sort())
    })

})

describe('test render map within team', () => {

    let team = ["a", "b", "c"]

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
})



// helper functions
const checkForConflictWithinARound = (round) => {

    let playersInTheMap = []

    round.forEach( pair => {
        if(pair[0] in playersInTheMap || pair[1] in playersInTheMap)
        {
            return true
        }
        else 
        {
            playersInTheMap.push(pair[0])
            playersInTheMap.push(pair[1])
        }
    })

    return false
}

const returnAllPossiblePairWithinTeams = (team1, team2) => {
    let possiblePairs = []

    team1.forEach( one => {
        team2.forEach( two => {
            possiblePairs.push([one,two])
        })
    })
    
    return possiblePairs
}

const returnAllThePairsInTheMap = (map) => {
    let pairsInTheMap = []

    map.forEach(rounds => {
        rounds.forEach(pair => {
            pairsInTheMap.push(pair)
        })
    })

    return pairsInTheMap
}
