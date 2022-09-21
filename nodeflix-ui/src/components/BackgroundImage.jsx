import React from 'react'
import background from "../static/login.jpg";
// import styled from "styled-components";
import { Box } from '@mui/material';
export default function BackgroundImage() {
  return (
    <Box height='99vh' width='100vw'>
      <img style={{height:'99vh', width:'100vw'}} src={background} alt="background" />
    </Box>
  )
}