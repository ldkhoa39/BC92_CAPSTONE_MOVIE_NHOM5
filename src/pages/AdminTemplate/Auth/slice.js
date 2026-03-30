import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api"
// import { data } from "react-router-dom";

const userAdmin = localStorage.getItem("USER_ADMIN");
const data = userAdmin ? JSON.parse(userAdmin) : null


const initialState = {
    loading: false,
    data,
    error: null
};

export const actAuth = createAsyncThunk("auth/actAuth", async (user, { rejectWithValue }) => {
    try {
        const result = await api.post("QuanLyNguoiDung/DangNhap", user);
        
        // 1. Phải có return thì data mới vào được store
        // 2. Thường thì lưu vào LocalStorage luôn ở đây để khi F5 trang không bị mất login
        localStorage.setItem("UserLogin", JSON.stringify(result.data.content));
        
        /**
         * kiem tra ng dung
         * khach hang -> prevert
         * admin -> 
         */

        const role = result.data.content.maLoainguoiDung;

        if (role === "KhachHang"){

            return rejectWithValue({
                response:{
                    data: {
                        contet: "ban ko co tuoi vao day",
                    },
                },
            });
        }

        // luu trang thai login xuong local storage
        localStorage.setItem("USER_ADMIN",JSON.stringify(result.data.content));

        return result.data.content;
    } catch (error) {
        // Trả về error.response.data để lấy được message lỗi từ server (ví dụ: "Tài khoản không tồn tại")
        return rejectWithValue(error.response?.data || error.message);
    }
});

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actAuth.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(actAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actAuth.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export default authSlice.reducer;