// import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar/Navbar'
import { getGenres, fetchMovies } from '../store/NodeflixSlice'
import { useDispatch, useSelector } from "react-redux";
import Slider from '../components/Slider'
import { useNavigate } from 'react-router-dom';
function Netflix() {
  const Navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('authToken') === null)
      Navigate('/signup')
  }, [])
  const [isScroll, setIsScroll] = useState(false)
  const genresLoaded = useSelector((state) => state.nodeflix.genresLoaded);
  const movies = useSelector((state) => state.nodeflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }))
  }, [genresLoaded])
  window.onscroll = () => {
    setIsScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll == null);
  }
  return (
    <div>
      <Navbar isScroll={isScroll} />
      <Hero />
      <Slider movies={movies} />
    </div>
  )
}

export default Netflix
