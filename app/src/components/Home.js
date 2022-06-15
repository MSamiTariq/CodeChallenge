import '../App.css';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  margin: 'auto',
  color: theme.palette.text.secondary,
}));


export default function Home() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [items, setItems] = useState();

  const handleLocalStorage = () => {
    try {
      fetch(`https://rest.bandsintown.com/artists/${input}?app_id=abc`)
        .then((response) => response.json())
        .then((actualData) => {
          setCep(actualData)
          console.log(actualData)
        });

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
    localStorage.setItem('items', input);

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

  useEffect(() => {
    if (localStorage.getItem('items')) {
      const itm = localStorage.getItem('items');
      if (itm) {
        setItems(itm);
        setInput(itm);
        handleLocalStorage();
      }

    }
  }, []);

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
        </Item>
      </Grid>

      <Grid xs={12}>
        <Item>
          {Object.keys(cep).length > 0 && (
            <Card sx={{ maxWidth: 345 }} className="card1">
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
                <Button size="small" color="primary">
                  <Link to={`/events/${cep.name}`} className='link'>Events</Link>
                </Button>
              </CardActions>
            </Card>
          )}
        </Item>
      </Grid>
    </Grid>
  );
}