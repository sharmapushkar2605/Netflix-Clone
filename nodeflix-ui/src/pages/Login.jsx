import React, { useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/system'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/NotificationSlice";
const LoginButton = styled(Button)({
  padding: ' 0.5rem 1rem',
  backgroundColor: '#e50914',
  border: ' none',
  cursor: 'pointer',
  color: 'white',
  borderRadius: '0.2rem',
  fontWeight: 'bolder',
  fontSize: '1.05rem'
})
const loginSchema = yup.object({
  email: yup.string().email('Provide a valid email').required('Email can not be empty'),
  password: yup.string().required('Password can not be empty').min(8, 'Password should be atleast 8 characters')
})
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (login) => {
      // http://localhost:8000/api/user/login
      fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(login)
      }).then(async (response) => {
        const data = await response.json();
        dispatch(showNotification({ message: data.message, severity: data.severity }))
        if (data.success) {
          localStorage.setItem('authToken', data.authToken)

          navigate('/')
        }
      })
        .catch(function (error) {
          dispatch(showNotification({ message: error.message, severity: error.severity }))
        });
    }
  })
  useEffect(() => {
    if (localStorage.getItem('authToken'))
      navigate('/')
  }, [])
  return (
    <Box position='relative'>
      <BackgroundImage />
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        gridTemplateRows: '15vh 85vh'
      }}>
        <Header />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <form>
            <Box sx={{ backgroundColor: '#000000b0', padding: '2rem', width: '25vw', gap: '2rem' }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'
            >
              <div className="title">
                <Typography variant='h4' >Login</Typography>
              </div>
              <Box display='flex' flexDirection='column' gap='2rem'>

                <TextField id='email' name='email'
                  value={loginForm.email} onChange={loginForm.handleChange}
                  error={loginForm.touched.email && Boolean(loginForm.errors.email)}
                  helperText={loginForm.touched.email && loginForm.errors.email}
                  sx={{ backgroundColor: 'white', input: { color: 'black' } }}
                  label="Email" variant="filled"
                  required />

                <TextField id='password' name='password'
                  value={loginForm.password} onChange={loginForm.handleChange}
                  error={loginForm.touched.password && Boolean(loginForm.errors.password)}
                  helperText={loginForm.touched.password && loginForm.errors.password}
                  sx={{ backgroundColor: 'white', input: { color: 'black' } }}
                  label="Password" type='password' variant="filled"
                  required />
                <LoginButton onClick={loginForm.handleSubmit}>Login to your account</LoginButton>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}


export default Login;
