import React from 'react'
import {renderMapBetweenTeams, renderMapWithinTeam, shuffleMyList, getListFromText} from '../helpers/utilities'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamOne: [],
            teamOneInput: "",
            teamOneError: "",
            teamTwo : [],
            teamTwoInput: "",
            teamTwoError: "",
            mapDone : false,
            map: {}
        }
    }

    checkMembersCount(members){
        if(members.length < 1)
            return "Add atleast One Member"
        return ""
    }

    changeValue1(newValue)
    {
        let members = getListFromText(newValue)

        this.setState({
            teamOneInput : newValue,
            teamOne: members,
            teamOneError: this.checkMembersCount(members)
        })
    }

    changeValue2(newValue)
    {
        let members = getListFromText(newValue)

        this.setState({
            teamTwoInput : newValue,
            teamTwo: members,
            teamTwoError : this.checkMembersCount(members)
        })
    }

    createMapWithinTeam()
    {
        const { teamOne } = this.state

        let map = renderMapWithinTeam(shuffleMyList(teamOne))

        this.setState({
            mapDone: true,
            map
        })
    }

    createMapBetweenTeams()
    {
        const {teamOne, teamTwo } = this.state

        let map = renderMapBetweenTeams(shuffleMyList(teamOne), shuffleMyList(teamTwo))

        this.setState({
            mapDone: true,
            map
        })
    }

    render()
    {
        const {teamOneInput,teamOne,teamOneError,teamTwoInput,teamTwo,teamTwoError,mapDone,map} = this.state

        return(
            <div>
                <label htmlFor="teamOneInput"><h4>Team 1:</h4></label>
                <textarea id={"teamOneInput"} placeholder={"put your input"} value={teamOneInput} onChange={(e) =>this.changeValue1(e.target.value)}/>
                <h5>count {teamOne.length}</h5> <br/> 
                { teamOneError !== "" ?  <div>{teamOneError}</div> : null } <br/> 


                <button disabled={teamOne.length < 1} onClick={() => this.createMapWithinTeam()}>
                 Schedule within this team
                </button>

                <label htmlFor="teamTwoInput"><h4>Team 2:</h4></label>
                <textarea id={"teamTwoInput"} placeholder={"put your input"} value={teamTwoInput} onChange={(e) =>this.changeValue2(e.target.value)}/>
                <h5>count {teamTwo.length}</h5> <br/>
                { teamTwoError !== "" ?  <div>{teamTwoError}</div> : null } <br/>


                <button disabled={teamOne.length < 1 || teamTwo.length < 1} onClick={() => this.createMapBetweenTeams()}>
                 Schedule between teams
                </button>
                {mapDone ? 
                map.map((round,i) => {
                    return(
                        <div key={i}>
                            <h5>round: {i+1}</h5>
                            {
                                Array.from(round.values()).map((pair,i) =>{
                                    return(
                                        <h6 key={i}>
                                            {`${pair.one} , ${pair.two}`}
                                        </h6>
                                    )
                                } )
                            }
                        </div>
                    )
                })
                    : null}
            </div>
        )
    }

}

export default Main 