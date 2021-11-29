import React from "react";
import { getListFromText } from '../helpers/utilities'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputName: this.props.name,
            inputValue: "",
            errorMessage: "",
            membersCount : 0
        }
    }

    getErrorMessageForMembersCount(members)
    {
        if(members.length < 1)
            return "Add atleast One Member"
        return ""
    }

    onValueChange(newValue)
    {
        let members = getListFromText(newValue)
        let errorMessage = this.getErrorMessageForMembersCount(members)

        this.setState({
            errorMessage,
            inputValue: newValue,
            membersCount: members.length
        })

        this.props.onTeamChange(members)

    }

    render()
    {
        const {inputName, inputValue, errorMessage, membersCount } = this.state
        return(
            <div>
                <TextField
                    label= {inputName}
                    style={{ width: 400 }}
                    multiline
                    size="small"
                    minRows={3}
                    maxRows={5}
                    value={inputValue} 
                    onChange={(e) =>this.onValueChange(e.target.value)}
                    placeholder={`Give ${inputName} members one in a line`} 
                    InputProps={{
                        endAdornment: <InputAdornment position="start"  >Count: {membersCount} </InputAdornment>
                      }}
                    error = {errorMessage !== ""}
                    helperText = {errorMessage}
                />
            </div>
        )
    }
}

export default Input;