import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
    listUser: [],
    loading: false,
    error: null,
};


export const actFetchUsers = createAsyncThunk("users/fetchAll", async () => {
    const result = await api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
    return result.data.content;
});


export const actDeleteUser = createAsyncThunk("users/delete", async (taiKhoan, { dispatch }) => {
    try {
        await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        alert("Xóa thành công!");
        dispatch(actFetchUsers()); 
    } catch (error) {
        alert(error.response.data.content);
    }
});


export const actUpdateUser = createAsyncThunk("users/update", async (user) => {
    const result = await api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
    return result.data.content;
});

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(actFetchUsers.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });
    },
});

export default userSlice.reducer;