import { Autocomplete, TextField} from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom';
import { search } from '../../store/MoviesSlice';

const AutoComplete = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const onQueryChange = (e) => {
        setQuery(e.target.value)
        setTimeout(() => {
            dispatch(search(e.target.value))
        }, 1000);
    }

    const [query, setQuery] = useState('')
    const { searchList } = useSelector(state => state.movies)
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchList.results ? searchList.results : [{ name: '' }]}
            getOptionLabel={(opt => opt?.name || opt.original_title)}
            filterOptions={(x) => x}
            sx={{
                width: 200, marginX: '0.75em',
                backgroundColor: 'rgb(255,255,255,0.2)', border: 'none',

            }}
            color='text.primary'
            onChange={(e, value) => Navigate(`/info/${value.id}`)}
            renderInput={(params) => <TextField {...params} variant='standard' value={query}
                onChange={onQueryChange} placeholder='search...' />}
        />
    )
}

export default AutoComplete