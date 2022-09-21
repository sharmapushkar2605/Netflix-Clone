import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY,TMDB_BASE_URL } from "../utils/constants";

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
};
export const getGenres=createAsyncThunk("nodeflix/genres",async()=>{
   const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
   );//console.log(data);
   return genres; 
})
const createArrayFromRawData=(array,moviesArray,genres)=>{
  //console.log(array);
  array.forEach((movie)=>{
    const movieGenres=[];
    movie.genre_ids.forEach((genre)=>{
    const name=genres.find(({id})=>id===genre); 
    if(name) movieGenres.push(name.name);
  })
  if(movie.backdrop_path){
    moviesArray.push({
      id:movie.id,
      name:movie?.original_name ? movie.original_name:movie.original_title,
      image:movie.backdrop_path,
      genres:movieGenres.slice(0, 3),
    })
  }
})
}
const getRawData=async (api,genres,paging)=>{
  const moviesArray=[];
  for(let i=1;moviesArray.length<60&& i<10;i++){
   const{data:{results},
  }=await axios.get(`${api}${paging?`&page=${i}`:""}`
   );
   createArrayFromRawData(results,moviesArray,genres)
  }
  return  moviesArray
}
export const fetchDataByGenre=createAsyncThunk("nodeflix/moviesByGenres",async({genre,type},thunkApi)=>{
  const {nodeflix:{genres}}=thunkApi.getState();  
  return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
});

export const fetchMovies=createAsyncThunk("nodeflix/trending",async({type},thunkApi)=>{
const {nodeflix:{genres}}=thunkApi.getState();  
return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true)
});


  



const NodeflixSlice=createSlice({
    name:"Nodeflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
          state.genres=action.payload;
          state.genresLoaded =true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
          state.movies=action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
          state.movies=action.payload;
        });  
    },    
    })

export default NodeflixSlice