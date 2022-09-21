import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { fetchDataByGenre } from '../store/NodeflixSlice'
export default function SelectGenre({genres,type}) {
    const dispatch=useDispatch()
  return( 
  <Select className='flex' onChange={e=>{
    dispatch(fetchDataByGenre({genre:e.target.value,type}))
  }}>
      {genres.map((genre)=>{
       return (
       <option value={genre.id} key={genre.id}>
        {genre.name}
        </option>
      ) 
      })}
    </Select>
)
}


const Select=styled.select`
margin-left: 5rem;
cursor: pointer;
font-size: 1.4 rem;
background-color: rgba(0,0,0,0.4);
color: white;
`;