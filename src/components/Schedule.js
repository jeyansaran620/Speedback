import React from "react";
import ImageList from '@mui/material/ImageList';
import Round from "./Round";

const Schedule = ({schedule}) => {
    return(
        <ImageList >
        { schedule.map((round,i) => <Round round={round} roundNo={i} key={i} />)}
        </ImageList> 
    )
}

export default Schedule