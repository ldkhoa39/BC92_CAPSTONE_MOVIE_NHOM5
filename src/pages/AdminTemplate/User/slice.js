import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  listUser: [],
  allUsers: [], 
  loading: false,
  error: null,
};

const getAuthToken = () => {
  const userAdmin = localStorage.getItem("USER_ADMIN");
  return userAdmin ? JSON.parse(userAdmin).accessToken : null;
};

export const actFetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Lỗi tải danh sách");
    }
  }
);

export const actDeleteUser = createAsyncThunk(
  "user/delete",
  async (taiKhoan, { dispatch, rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xoá người dùng thành công!");
      dispatch(actFetchUsers());
      return taiKhoan;
    } catch (error) {
      const msg = error.response?.data?.content || "Xoá thất bại";
      alert(msg);
      return rejectWithValue(msg);
    }
  }
);

export const actUpdateUser = createAsyncThunk(
  "users/update",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const result = await api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cập nhật thành công!");
      dispatch(actFetchUsers());
      return result.data.content;
    } catch (error) {
      const msg = error.response?.data?.content || "Cập nhật thất bại";
      alert(msg);
      return rejectWithValue(msg);
    }
  }
);

export const actSearchUser = createAsyncThunk(
  "user/search",
  async (tuKhoa, { rejectWithValue }) => {
    try {
      // Nếu tuKhoa rỗng, url sẽ quay về LayDanhSachNguoiDung
      const url = tuKhoa
        ? `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
        : `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;
      const result = await api.get(url);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Lỗi tìm kiếm");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(actFetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(actFetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.listUser = action.payload;
          state.allUsers = action.payload; 
      })
      .addCase(actFetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search User (Cập nhật danh sách khi tìm kiếm)
      .addCase(actSearchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(actSearchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.listUser = action.payload;
      })
      .addCase(actSearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete & Update (Chỉ quản lý trạng thái loading nếu cần)
      .addMatcher(
        (action) => action.type.endsWith("/pending") && (action.type.includes("delete") || action.type.includes("update")),
        (state) => { state.loading = true; }
      )
      .addMatcher(
        (action) => (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) && (action.type.includes("delete") || action.type.includes("update")),
        (state) => { state.loading = false; }
      );
  },
});

export default userSlice.reducer;