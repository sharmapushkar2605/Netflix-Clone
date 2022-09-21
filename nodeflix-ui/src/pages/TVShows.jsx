import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import SelectGenre from '../components/SelectGenre';
import SeriesNotAvailable from '../components/SeriesNotAvailable';
import Slider from '../components/Slider';
import { fetchMovies, getGenres } from '../store/NodeflixSlice';
export default function TVShows() {
  const Navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('authToken') === null)
      Navigate('/signup')
  }, [])
  const [isScroll, setIsScroll] = useState(false)
  const genresLoaded = useSelector((state) => state.nodeflix.genresLoaded);
  const movies = useSelector((state) => state.nodeflix.movies);
  const genres = useSelector((state) => state.nodeflix.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }))
  }, [genresLoaded])

  window.onscroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll == null);
  }
  return (
    <Container>
      <div className="navbar">
        <Navbar isScroll={isScroll} />
      </div>
      <div className='data'>
        <SelectGenre genres={genres} type="tv" />
        {
          movies.length ? <Slider movies={movies} /> :
            <SeriesNotAvailable />
        }

      </div>
    </Container>
  )
}
const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available{
        text-align:center;
        color:white;
        margin-top: 4rem;
    }

}
`
