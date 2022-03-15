import React from "react";
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Round = ({round, roundNo}) => {
    return(
        <ImageListItem sx={{ lineHeight:"inherit" , margin:"auto" }} >
             <Card sx={{ width: "100%", maxWidth: 345, padding:"1.5rem" }}>
                <CardHeader
                    title={
                    <Typography variant="h6">
                            Round: {roundNo+1}
                    </Typography>
                    } />
                <CardContent>
                {Array.from(round.values()).map((pair,i) =>{
                    return(
                        <Grid container spacing={2} key={i} justifyContent="center" mt={0}>
                            <Grid item xs={1}>
                                {i+1 }.
                            </Grid>
                            <Grid item xs={4}>
                                {pair.one}
                            </Grid>
                            <Grid item xs={2}>
                                <CompareArrowsIcon />
                            </Grid>
                            <Grid item xs={4}>
                                {pair.two}
                            </Grid>
                      </Grid>
                    )})
                }
                </ CardContent>
            </Card>
        </ImageListItem>
    )
}
export default Round