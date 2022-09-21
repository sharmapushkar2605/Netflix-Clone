import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    tag: undefined,
    movies: [],
    loading: false,
    movieDetail: {},
    detailsFetched: false,
    searchList:[]
  },
  reducers: {
    setTag: (state, action) => {
      state.tag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
    builder.addCase(getMovieDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieDetail.fulfilled, (state, action) => {
      state.movieDetail = action.payload;
      state.loading = false;
      state.detailsFetched = true;
    });
    builder.addCase(getMovieDetail.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
    builder.addCase(search.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(search.fulfilled, (state, action) => {
      state.searchList = action.payload;
      state.loading = false;
      state.detailsFetched = true;
    });
    builder.addCase(search.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export const getMovies = createAsyncThunk("movies/getMovies", async (tag) => {
  const res = await fetch(`http://localhost:8000/api/movies/get?tag=${tag}`, {
    method: "GET",
    headers: {
      authToken: localStorage.getItem("authToken"),
    },
  });
  const data = await res.json();
  return data;
});
export const getMovieDetail = createAsyncThunk(
  "movies/getMovieDetail",
  async ({movieId }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=c5c6d2f44623b1013a2a7b9124560c76&language=en-US`
    );
    const res2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c5c6d2f44623b1013a2a7b9124560c76&language=en-US`
    );

    const details = await res.json();
    const cast = await res2.json();
    if (details.success === false && cast.success === false) {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${movieId}?api_key=c5c6d2f44623b1013a2a7b9124560c76&language=en-US`
      );
      const res2 = await fetch(
        `https://api.themoviedb.org/3/tv/${movieId}/credits?api_key=c5c6d2f44623b1013a2a7b9124560c76&language=en-US`
      );

      const details = await res.json();
      const cast = await res2.json();
      return { details, cast };
    }
    return { details, cast };
  }
);
export const search = createAsyncThunk('movies/search',async(query)=>{
  query = query.split(' ').join('-')
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=c5c6d2f44623b1013a2a7b9124560c76&language=en-US&query=${query}`)
  const data = await res.json();
  return data;
})
export const { setTag } = moviesSlice.actions;
export default moviesSlice.reducer;
