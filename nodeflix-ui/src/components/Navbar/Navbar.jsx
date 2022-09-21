import React, { useEffect, useState } from 'react'
import { AppBar, Box, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../static/nodeflixWhite.png'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/NotificationSlice";
import { setTag, getMovies } from '../../store/MoviesSlice';
import AutoComplete from './AutoComplete';
const Navbar = ({ isScroll }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [color, setColor] = useState('transparent')
    useEffect(() => {
        setColor(isScroll ? 'secondary' : 'transparent')
    }, [isScroll])

    const logout = () => {
        localStorage.removeItem('authToken')
        dispatch(showNotification({ message: 'Logged out successfully.', severity: 'success' }))
        navigate('/login')
    }
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeTag = (tg) => {
        dispatch(setTag(tg))
        dispatch(getMovies(tg))
    }


    return (
        <AppBar color={color} sx={{ padding: '1rem' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignContent: 'center' }}>
                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center'>
                    <img style={{ height: '4rem' }} src={logo} alt='nodeflix' />
                    <Typography variant='h6' fontWeight={200}>
                        <Link to='/' style={{ color: 'inherit', textDecorationLine: 'none', marginRight: '2rem', marginLeft: '2rem' }}>Home</Link>
                    </Typography>
                    <Typography variant='h6' fontWeight={200}>
                        <Link to='/tv' style={{ color: 'inherit', textDecorationLine: 'none', marginRight: '2rem' }}>TV shows</Link>
                    </Typography>
                    <Typography variant='h6' fontWeight={200}>
                        <Link to='/movie' style={{ color: 'inherit', textDecorationLine: 'none', marginRight: '2rem' }}>Movies</Link>
                    </Typography>
                    <Typography variant='h6' fontWeight={200}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ cursor: 'pointer' }}
                        onClick={handleClick}>
                        My List <ArrowDropDownIcon />
                    </Typography>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <MenuItem onClick={handleClose} sx={{ color: 'black' }}>
                            <Link to='/myList' onClick={() => changeTag('like')} style={{ color: 'inherit', textDecorationLine: 'none', width: '-webkit-fill-available' }}>Liked</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ color: 'black' }}>
                            <Link to='/myList' onClick={() => changeTag('dislike')} style={{ color: 'inherit', textDecorationLine: 'none', width: '-webkit-fill-available' }}>Disliked</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ color: 'black' }}>
                            <Link to='/myList' onClick={() => changeTag('watch-later')} style={{ color: 'inherit', textDecorationLine: 'none', width: '-webkit-fill-available' }}>Watch Later</Link>
                        </MenuItem>
                    </Menu>

                </Box>
                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center'>
                    <AutoComplete />
                    <PowerSettingsNewIcon color='primary' onClick={logout} />
                </Box>
            </Toolbar>
        </AppBar >
    )

}

export default Navbar
