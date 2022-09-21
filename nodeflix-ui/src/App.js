import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import Netflix from "./pages/Netflix";
import Signup from "./pages/Signup";
import Player from "../src/pages/Player";
import Notification from "./components/Notification";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";
import MovieDetail from "./pages/MovieDetail";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="player" element={<Player />} />
          <Route exact path="/movie" element={<Movies />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/myList" element={<MyList  />} />
          <Route exact path="/info/:movieId" element={<MovieDetail/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
