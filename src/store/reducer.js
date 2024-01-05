import axios from "axios";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/constant";

export const getGenres = createAsyncThunk("ott/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
  );
  return genres;
});

const movieData = (array, moviesArray, genres) => {
  array.map((movie) => {
    const movieGenre = [];
    movie.genre_ids.map((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenre.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenre.slice(0, 3),
      });
    }
  });
};

const getMovieData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    movieData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "ott/trending",
  async ({ type }, myThunk) => {
    const {
      ott: { genres },
    } = myThunk.getState();
    return getMovieData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`,
      genres,
      true
    );
  }
);

const initialState = {
  movies: [],
  isLoaded: false,
  genres: [],
};

const OttSlice = createSlice({
  name: "NazOtt",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.isLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const store = configureStore({
  reducer: {
    ott: OttSlice.reducer,
  },
});
