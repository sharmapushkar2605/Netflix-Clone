import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../static/nodeflixWhite.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' padding='0 4rem'>
      <div className="logo">
        <img style={{height:'5rem'}} src={logo} alt="logo" />
      </div>
      <Button variant='contained' onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </Button>
    </Box>
  );
}
