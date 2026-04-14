import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin', 
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post('/QuanLyNguoiDung/DangNhap', user);
      
      localStorage.setItem('USER_LOGIN', JSON.stringify(res.data.content));
      
      return res.data.content;
    } catch (error) {
      const errorMessage = error.response?.data?.content || "Tài khoản hoặc mật khẩu không đúng!";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  userLogin: localStorage.getItem("USER_LOGIN") 
    ? JSON.parse(localStorage.getItem("USER_LOGIN")) 
    : null,
};

const loginSlice = createSlice({ 
  name: 'login', 
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("USER_LOGIN");
      state.userLogin = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null; // Xóa lỗi cũ khi bắt đầu nhấn đăng nhập mới
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { logOut, clearError } = loginSlice.actions;
export default loginSlice.reducer;