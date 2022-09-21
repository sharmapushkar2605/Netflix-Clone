import { Box, Button } from '@mui/material';
import React from 'react'
import backgroundImage from "../static/home.jpg"
import MovieLogo from "../static/homeTitle.webp";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom';


const StyledButton = styled(Button)({
  fontSize: '1.4rem',
  gap: '1rem',
  borderRadius: '0.2rem',
  padding: '0.5rem',
  paddingLeft: '2rem',
  paddingRight: '2.4rem',
  border: 'none',
  cursor: 'pointer',
  transition: '0.2s ease-in-out',
  color: 'black',
  background: 'white',
  '&:hover': {
    opacity: '0.8',
    backgroundColor: 'rgba(118, 118, 115, 0.7)'
  },
  '&:nth-of-type(2)': {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    color: 'white',
    svg: {
      fontSize: '1.8rem',
    }
  }
  })
 
const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box position='relative' className="hero">
      <img style={{ filter: 'brightness(60%)', height: '100vh', width: '98vw' }}
        src={backgroundImage}
        alt="background"
        className="background-image"
      />
      <Box position='absolute' sx={{bottom:'5rem'}} className="container">
        <div className="logo">
          <img src={MovieLogo} alt="Movie Logo" style={{ height: '100%', marginLeft: '5rem', width: '100%', }} />
        </div>
        <Box sx={{ margin: '5rem', gap: '2rem', display: 'flex' }} className="buttons flex">
          <StyledButton variant='contained' className="flex j-center a-center"
          onClick={() => navigate("/player")}
          >
            <PlayArrowIcon/>
            Play
          </StyledButton>
          <StyledButton variant='contained' className="flex j-center a-center">
            <InfoIcon />
            More Info
          </StyledButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Hero;