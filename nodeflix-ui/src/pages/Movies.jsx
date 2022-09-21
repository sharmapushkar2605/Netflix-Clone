import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { fetchMovies, getGenres } from '../store/NodeflixSlice';
export default function Movies() {
  const Navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('authToken')=== null)
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
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }))
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
        <SelectGenre genres={genres} type="movie" />
        {
          movies.length ? <Slider movies={movies} /> :
            <NotAvailable />
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
