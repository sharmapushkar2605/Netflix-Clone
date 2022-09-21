import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { showNotification } from "../store/NotificationSlice";
const RedButton = styled(Button)({
  padding: '0.5rem 1rem',
  backgroundColor: '#e50914',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bolder',
  fontSize: '1.05rem'

})
const signupSchema = yup.object({
  email: yup.string().email('Provide a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'passoword should be atlest 8 characters')
})
function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signupForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signupSchema,
    onSubmit: (signup) => {
      // todo: POST request to register user
      // http://localhost:8000/api/auth/register
      fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(signup)
      }).then(async (response) => {
        const data = await response.json();
        dispatch(showNotification({ message: data.message, severity: data.severity }))
        if (data.success) {
          navigate('/login')
        }
      })
        .catch(function (error) {
          dispatch(showNotification({ message: error.message, severity: error.severity }))
          console.log(error)
        });
    }
  })
  useEffect(() => {
    if (localStorage.getItem('authToken'))
      navigate('/')
  }, [])
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{ position: 'relative' }} showPassword={showPassword} >
      <BackgroundImage />
      <Box sx={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', height: '100vh', width: '100vw', gridTemplateColumns: '15vh 85vh' }}>
        <Header login />
        <Box gap='1rem' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '7rem' }} >

          <Box gap='1rem' sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h2' textAlign='center'>Unlimited movies, TV shows and more</Typography>
            <Typography variant='h4' textAlign='center'>Watch anywhere. Cancel anytime.</Typography>
            <Typography variant='h6' textAlign='center'>
              Ready to watch? Enter your email to create or restart membership
            </Typography>
          </Box>
          <form>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item>
                <TextField name='email' id='email'
                  value={signupForm.email} onChange={signupForm.handleChange}
                  error={signupForm.touched.email && Boolean(signupForm.errors.email)}
                  helperText={signupForm.touched.email && signupForm.errors.email}
                  variant='filled' sx={{ background: 'white', input: { color: 'black' }, marginRight: '8px' }} type="email" label="Email" required />
              </Grid>
              {showPassword && (
                <Grid item>
                  <TextField name='password' id='password'
                    value={signupForm.password} onChange={signupForm.handleChange}
                    error={signupForm.touched.password && Boolean(signupForm.errors.password)}
                    helperText={signupForm.touched.password && signupForm.errors.password}
                    variant='filled' sx={{ backgroundColor: 'white', input: { color: 'black' } }} label="Password" type='password' required />
                </Grid>
              )}
              {!showPassword && (
                <Grid item>
                  <RedButton sx={{ height: 'inherit' }} onClick={() => setShowPassword(true)} >Get Started</RedButton>
                </Grid>
              )}
            </Grid>
            <RedButton sx={{ borderRadius: '0.2rem', display: 'block', margin: 'auto', marginTop: '8px' }} onClick={signupForm.handleSubmit}>Sign Up</RedButton>
          </form>
        </Box>
      </Box>

    </Box>
  );
}
export default Signup;