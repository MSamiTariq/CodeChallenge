import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../App.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function Events() {

    let params = useParams();
    let aName = params.artistName;
    const [eventsArray, setEventsArray] = useState([]);
    let eventList = eventsArray.map((item, index) => {
        return (
            <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 500 }} className="card">
                    <Typography gutterBottom variant="h6" component="div">
                        Event Details
                    </Typography>
                    <hr></hr>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.venue.city}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.venue.country}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.venue.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.starts_at}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })

    useEffect(() => {
        GetEvent(aName);
    }, []);

    const GetEvent = async (aName) => {

        try {
            fetch(`https://rest.bandsintown.com/artists/${aName}/events?app_id=abc`)
                .then((response) => response.json())
                .then((actualData) => {
                    setEventsArray(actualData);
                    console.log(actualData)
                });

            // const response = await api.get(`${input}/json`)
            // setCep(response.data)
            //   setInput('')

        } catch (error) {
            alert(`Invalid Input!`)
            //   setInput('')
            return
        }
    }


    return (
        <div>
            <Typography gutterBottom variant="h6" component="div" className="header">
                {eventList.length} upcoming events
            </Typography>
            <Grid container spacing={2}>
                {eventList}
            </Grid>
        </div>

    );
}