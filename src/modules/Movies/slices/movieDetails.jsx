import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesDetails } from 'apis/movieAPI';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const getMovieDetails = createAsyncThunk(
  'movie/details/getMovieDetails',
  async (movieId) => {
    // Lấy data,
    const data = await getMoviesDetails(movieId); // Khi thành công thì nó sẽ tự lấy data về, thất bại thì nó tự handle lỗi cho mình rồi
    return { data };
  }
);

const movieDetailsSlice = createSlice({
  name: 'movie/details',
  initialState,
  reducers: {},
  extraReducers: {
    [getMovieDetails.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getMovieDetails.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getMovieDetails.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});

export default movieDetailsSlice.reducer;
