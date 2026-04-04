import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from "@services/api";

//ENTITY ADAPTER
const movieAdapter = createEntityAdapter({
  selectId: (movie) => movie.maPhim,
  sortComparer: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
});

//INITIAL STATE
const initialState = movieAdapter.getInitialState({
  movieSchedule: null,
  loadingMovies: false,
  loadingSchedule: false,
  error: null,
});

//ASYNC THUNK 
export const fetchMoviesForBooking = createAsyncThunk(
  'booking/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi lấy danh sách phim");
    }
  }
);

export const fetchMovieSchedule = createAsyncThunk(
  'booking/fetchMovieSchedule',
  async (maPhim, { rejectWithValue }) => {
    try {
      const res = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Lỗi lấy lịch chiếu");
    }
  }
);

//SLICE
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearSchedule: (state) => {
      state.movieSchedule = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //MOVIES
      .addCase(fetchMoviesForBooking.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(fetchMoviesForBooking.fulfilled, (state, action) => {
        state.loadingMovies = false;
        movieAdapter.setAll(state, action.payload); // 💥 mạnh hơn map thường
      })
      .addCase(fetchMoviesForBooking.rejected, (state, action) => {
        state.loadingMovies = false;
        state.error = action.payload;
      })

      //SCHEDULE
      .addCase(fetchMovieSchedule.pending, (state) => {
        state.loadingSchedule = true;
      })
      .addCase(fetchMovieSchedule.fulfilled, (state, action) => {
        state.loadingSchedule = false;
        state.movieSchedule = action.payload;
      })
      .addCase(fetchMovieSchedule.rejected, (state, action) => {
        state.loadingSchedule = false;
        state.error = action.payload;
      });
  }
});

export const { clearSchedule } = bookingSlice.actions;

//SỬ DỤNG NEMO
export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
} = movieAdapter.getSelectors((state) => state.bookingReducer);

export const selectMovieSchedule = (state) => state.bookingReducer.movieSchedule;
export const selectLoadingMovies = (state) => state.bookingReducer.loadingMovies;
export const selectLoadingSchedule = (state) => state.bookingReducer.loadingSchedule;

export default bookingSlice.reducer;
