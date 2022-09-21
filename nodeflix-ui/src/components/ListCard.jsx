import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification } from '../store/NotificationSlice';
import { getMovies } from '../store/MoviesSlice';
import { useNavigate } from 'react-router-dom';
const ListCard = ({ movieData, key }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useSelector(state => state.movies)

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8000/api/movies/delete?tag=${tag}&id=${movieData.movieId}`,
      {
        method: 'DELETE',
        headers: {
          'authToken': localStorage.getItem('authToken')
        }
      })
    const data = await res.json()
    dispatch(showNotification({ message: data.message, severity: data.severity }))
    dispatch(getMovies(tag))
  }
  return (
    <Card key={key} sx={{ maxWidth: 345, background: 'black', border: '2px solid white', borderRadius: '10px' }} >
      <CardMedia
        component="img"
        height="140"
        image={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
        alt="Movie image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieData.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' onClick={() => navigate(`/info/${movieData.movieId}`)}>Details</Button>
        <Button size="small" variant='outlined' onClick={handleDelete}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default ListCard