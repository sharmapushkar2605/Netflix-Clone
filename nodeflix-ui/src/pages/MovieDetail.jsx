import { Box, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getMovieDetail } from '../store/MoviesSlice';
const MovieDetail = () => {
    const [isScroll, setIsScroll] = useState(false)
    window.onscroll = () => {
        setIsScroll(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll == null);
      }
    let {movieId } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieDetail({movieId }))
    }, [])
    useEffect(() => {
        dispatch(getMovieDetail({movieId }))
    }, [movieId])
    const { movieDetail, loading } = useSelector((state) => state.movies)
    return (
        <>
        <Navbar isScroll={isScroll}/>
            {loading ? <Typography variant='h3'>Loading...</Typography> :
                <Box position='relative'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movieDetail?.details?.backdrop_path}`}
                        alt="card"
                        style={{ width: '100vw', height: '100vh', position: 'absolute' }}
                    />
                    <Box zIndex={1} position='absolute' sx={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8),rgba(0,0,0,0.5) ,rgba(255,0,0,0.2))', width: '100vw', height: '100vh' }}>
                        <Box sx={{ padding: '6em' }}>

                            <Typography variant='h2' fontWeight={400}>{movieDetail?.details?.original_title}</Typography>
                            <Typography variant='h2' fontWeight={400}>{movieDetail?.details?.name}</Typography>
                            {movieDetail?.details?.tagline ? <Typography variant='p' component='p' paragraph={true} maxWidth='40%'><u>{movieDetail?.details?.tagline}</u></Typography> : ''}

                            <Typography variant='h6' color='text.primary' gutterBottom sx={{ maxWidth: '50%' }} fontWeight={200}>{movieDetail?.details?.overview}</Typography>
                            <Box sx={{ marginBottom: '3em' }}>
                                {
                                    movieDetail?.details?.genres?.map(genre => {
                                        return <Chip label={genre.name} color='error' variant="outlined" sx={{ marginRight: '12px' }} />
                                    })
                                }
                            </Box>
                            <Box sx={{ display: 'flex', marginBottom: '1em', }}>

                                <Typography fontWeight={500} fontSize={20} sx={{ marginRight: '8px' }}>Cast:</Typography>
                                {movieDetail?.cast?.cast.filter((actor, i) => i < 4).map((actor) => {
                                    return <Typography fontWeight={300} fontSize={20}
                                        sx={{ marginRight: '12px' }}>
                                        {actor.name} |
                                    </Typography>
                                })}
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography fontWeight={500} fontSize={20} sx={{ marginRight: '8px' }}>Directed By:</Typography>
                                {movieDetail?.cast?.crew.filter((director, i) => director.job === 'Director').map((director) => {
                                    return <Typography fontWeight={300} fontSize={20}
                                        sx={{ marginRight: '12px' }}>
                                        {director.name} |
                                    </Typography>
                                })}

                            </Box>
                        </Box>
                    </Box>
                </Box>}

        </>
    )
}

export default MovieDetail