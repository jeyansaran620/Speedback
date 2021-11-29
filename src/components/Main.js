import React from 'react'
import {renderScheduleBetweenTeams, renderScheduleWithinTeam, shuffleMyList} from '../helpers/utilities'
import Input from './Input'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Schedule from './Schedule';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamOne: [],
            teamTwo : [],
            dual: false,
            scheduleDone : false,
            schedule: {}
        }
    }

    updateTeam(newMembers, team)
    {
       const {teamOne,teamTwo} = this.state

        this.setState({
            teamOne: team === 1 ? newMembers : teamOne,
            teamTwo: team === 2 ? newMembers : teamTwo
        })
    }
    
    toggleDualTeamsOption()
    {
        this.setState({
            dual: !this.state.dual,
            teamTwo: [] 
        })
    }

    createScheduleWithinTeam()
    {
        const { teamOne } = this.state

        let schedule = renderScheduleWithinTeam(shuffleMyList(teamOne))

        this.setState({
            scheduleDone: true,
            schedule
        })
    }

    createScheduleBetweenTeams()
    {
        const {teamOne, teamTwo } = this.state

        let schedule = renderScheduleBetweenTeams(shuffleMyList(teamOne), shuffleMyList(teamTwo))

        this.setState({
            scheduleDone: true,
            schedule
        })
    }

    render()
    {
        const {teamOne, teamTwo, scheduleDone, schedule, dual} = this.state

        return(
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    
                }}>
                <Input name="Team 1" onTeamChange={(newMembers) => this.updateTeam(newMembers,1)}/>
                
                {dual ?  <Input name="Team 2" onTeamChange={(newMembers) => this.updateTeam(newMembers,2)}/> : null}
    
                <Typography variant="h6">
                <Switch
                    checked={dual}
                    onChange={() => this.toggleDualTeamsOption()}
                    inputProps={{ 'aria-label': 'controlled' }}
                />  Between Teams
                 </Typography>

                 {!dual ? <Button variant="contained" disabled={teamOne.length < 2} onClick={() => this.createScheduleWithinTeam()} >
                        Schedule
                    </Button> :
                    <Button variant="contained" disabled={teamOne.length < 1 || teamTwo.length < 1} onClick={() => this.createScheduleBetweenTeams()} >
                        Schedule
                    </Button>}
                {scheduleDone ? <Schedule schedule={schedule} /> : null}
            </Box>
        )
    }

}

export default Main 