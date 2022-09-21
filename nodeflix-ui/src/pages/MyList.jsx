import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../store/MoviesSlice'
import ListCard from '../components/ListCard'
import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
const MyList = () => {
    const Navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('authToken') === null)
            Navigate('/signup')
    }, [])
    const dispatch = useDispatch()
    const { tag, movies, loading } = useSelector((state) => state.movies)
    useEffect(() => {
        dispatch(getMovies(tag))
    }, [tag])
    const [isScroll, setIsScroll] = useState(false)
    window.onscroll = () => {
        setIsScroll(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll == null);
    }
    return (
        <>
            <Navbar isScroll={isScroll} />
            <Container sx={{ marginTop: '7rem' }}>
                {loading ? <Typography variant='h4'>Loading...</Typography> : <><Typography variant='h3'>Your <Typography color='red' variant='h3' sx={{ display: 'inline' }}>{tag}</Typography> list {movies.length === 0 ? 'is empty' : ''}</Typography>
                    <Grid container spacing={2} sx={{ marginTop: '3rem' }}>
                        {movies.map(m => { return <Grid item xs={4}><ListCard movieData={m} key={m.movieId} /></Grid> })}
                    </Grid></>}

            </Container>
        </>
    )
}

export default MyList