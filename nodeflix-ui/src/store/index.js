import {configureStore} from "@reduxjs/toolkit";
import MoviesSlice from "./MoviesSlice";
import NodeflixSlice from "./NodeflixSlice";
import NotificationSlice from "./NotificationSlice";

export const store=configureStore({
 reducer:{
    nodeflix:NodeflixSlice.reducer,
    notification: NotificationSlice, 
    movies: MoviesSlice
 }
})