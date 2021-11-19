import { renderMap } from "./utilities";

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

describe('test render map between teams', () => {

    let team1 = ["a","b"]
    let team2 = ["c","d"]

    test('should return a map between given teams', () => 
    {
        let actualMap = renderMap(team1,team2)

        expect(actualMap).toBeTruthy()
    })

    test('should return a map having rounds of highest team count', () => 
    {
        let actualMap = renderMap(team1,team2)

        let expectedCount = Math.max(team1.length,team2.length)
        expect(actualMap.length).toBe(expectedCount)
    })

    test('should return a map without a player conflict within all its rounds', () =>
    {
        let actualMap = renderMap(team1,team2)

        actualMap.forEach(round => {
        expect(checkForConflictWithinARound(round)).toBeFalsy()      
        });
    })

    test('should return a map which has all the pair within a team', () => {
        let actualMap = renderMap(team1,team2)
        expect(returnAllThePairsInTheMap(actualMap).sort()).toEqual(returnAllPossiblePairWithinTeams(team1,team2).sort())
    })
    
})