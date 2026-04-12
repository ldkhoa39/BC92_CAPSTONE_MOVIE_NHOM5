import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

// 
export const fetchListMovieAdmin = createAsyncThunk(
    'films/fetchListMovieAdmin',
    async (_, { rejectWithValue }) => {
        try {
            //
            const res = await api.get('/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data?.content);
        }
    }
);

// Thêm phim
export const addMovieUpload = createAsyncThunk(
    'films/addMovieUpload',
    async (formData, { rejectWithValue }) => {
        try {
            // 
            const res = await api.post('/QuanLyPhim/ThemPhimUploadHinh', formData);
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data?.content || "Thêm phim thất bại!");
        }
    }
);

// Sửa phim
export const updateMovieUpload = createAsyncThunk(
  "films/updateMovieUpload",
  async (formData, { rejectWithValue }) => {
    try {
      // 1. Lấy đúng key mà folder Auth đang lưu (USER_ADMIN)
      const userAdmin = localStorage.getItem("USER_ADMIN");
      const token = userAdmin ? JSON.parse(userAdmin).accessToken : null;

      // 2. Gửi API kèm Header trực tiếp tại đây
      const res = await api.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
        headers: {
          // Ép Header Authorization để sửa lỗi 401
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.content;
    } catch (error) {
      // Trả về nội dung lỗi từ server để dễ debug
      return rejectWithValue(error.response?.data?.content || "Cập nhật thất bại!");
    }
  }
);

// xóa phim
export const deleteMovie = createAsyncThunk(
  "films/deleteMovie",
  async (maPhim, { rejectWithValue, dispatch }) => {
    try {
      // Lấy Token từ đúng key từ trong folder Auth
      const userAdmin = JSON.parse(localStorage.getItem("USER_ADMIN"));
      const token = userAdmin?.accessToken;

      // Gọi API Delete
      const res = await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Sau khi xoá thành công trên Server tự lọc list dưới client để giao diện cập nhật ngay lập tức
      alert("Xoá phim thành công!");
      return maPhim; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Xoá thất bại!");
    }
  }
);

const initialState = {
    listMovie: [],
    loading: false,
    error: null,
};

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchListMovieAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchListMovieAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.listMovie = action.payload;
            })
            .addCase(fetchListMovieAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // (Không cần cập nhật state nội bộ cho deleteMovie vì ta sẽ dispatch fetchListMovieAdmin lại sau khi xóa thành công)
    },
});

export default filmsSlice.reducer;