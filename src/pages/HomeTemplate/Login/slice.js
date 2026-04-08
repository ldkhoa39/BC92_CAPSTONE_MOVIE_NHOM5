import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (user, { rejectWithValue }) => {
    try {
      // Sử dụng api.post thay vì axios.post
      // Đường dẫn bây giờ chỉ cần phần đuôi vì baseURL đã có sẵn ".../api"
      const res = await api.post('/QuanLyNguoiDung/DangNhap', user);
      
      // Lưu thông tin user (kèm token) xuống LocalStorage
      // Dùng key 'USER_LOGIN' để đồng bộ với interceptor trong file api.js
      localStorage.setItem('USER_LOGIN', JSON.stringify(res.data.content));
      
      return res.data.content;
    } catch (error) {
      // Trả về thông báo lỗi từ server (ví dụ: "Tài khoản hoặc mật khẩu không đúng")
      return rejectWithValue(error.response?.data?.content || "Đã có lỗi xảy ra");
    }
  }
);

// Khởi tạo State ban đầu
const initialState = {
  loading: false,
  error: null,
  // Khi F5 trang web, Redux sẽ lấy lại data từ LocalStorage để giữ trạng thái đăng nhập
  userLogin: localStorage.getItem("USER_LOGIN") 
    ? JSON.parse(localStorage.getItem("USER_LOGIN")) 
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("USER_LOGIN");
      state.userLogin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;