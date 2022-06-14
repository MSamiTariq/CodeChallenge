import '../App.css';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: 'auto',
    color: theme.palette.text.secondary,
  }));


function Home() {
    const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  const getEvent = async (e) => {
    // e.preventDefault();

    try {
      fetch(`https://rest.bandsintown.com/artists/${e}/events?app_id=abc`)
        .then((response) => response.json())
        .then((actualData) => {
          // setCep(actualData)
          console.log(actualData)
        });

      // const response = await api.get(`${input}/json`)
      // setCep(response.data)
      setInput('')

    } catch (error) {
      alert(`Invalid Input!`)
      setInput('')
      return
    }
  }

  const handleButton = async (e) => {
    e.preventDefault()

    if (input === '') {
      alert('This field cannot be empty.')
      return
    }

    try {
      fetch(`https://rest.bandsintown.com/artists/${input}?app_id=abc`)
        .then((response) => response.json())
        .then((actualData) => {
          setCep(actualData)
          console.log(actualData)
        });

      // const response = await api.get(`${input}/json`)
      // setCep(response.data)
      setInput('')

    } catch (error) {
      alert(`Invalid Input!`)
      setInput('')
      return
    }

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item>
        <Stack spacing={2} sx={{ width: 300 }}>
    </Stack>
            <h1 className='title'>SEARCH ARTIST</h1>
            <form className='form'>
              <input
                type="text" name="cep" id="cep" placeholder='Artist Name...' autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className='button-search'
                onClick={handleButton}>
                Submit
              </button>
            </form>

            {Object.keys(cep).length > 0 && (
              <Card sx={{ maxWidth: 345 }} className="card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={cep.image_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {cep.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cep.facebook_page_url}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary"
                  onClick={()=> getEvent(cep.name)}>
                    Event
                  </Button>
                </CardActions>
              </Card>
            )}
        </Item>
      </Grid>
    </Grid>
  );
}

export default Home;