import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import video from "../static/video.mp4";
import { Box } from "@mui/material";

export default function Player() {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ width: '100vw', height: '100vh' }} className="player">
        <Box position='absolute' sx={{ padding: '2rem', zIndex: 1 }} className="back">
          <ArrowBackIcon style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => navigate(-1)} />
        </Box>
        <video sx={{ height: '100vh', width: '100vw', objectFit: 'cover' }} src={video} autoPlay loop controls muted />
      </Box>
    </div>
  );
}

