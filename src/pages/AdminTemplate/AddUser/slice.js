import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
    loading: false,
    data: null,
    error: null
};

// Hàm lấy token từ localStorage
const getAuthToken = () => {
    const userAdmin = localStorage.getItem("USER_ADMIN");
    return userAdmin ? JSON.parse(userAdmin).accessToken : null;
};

export const actAddUser = createAsyncThunk(
    "addUser/actAddUser", 
    async (user, { rejectWithValue }) => {
        try {
            const token = getAuthToken();
            const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Thêm người dùng thành công!");
            return result.data.content;
        } catch (error) {
            const msg = error.response?.data?.content || "Thêm người dùng thất bại";
            alert(msg);
            return rejectWithValue(msg);
        }
    }
);

const addUserSlice = createSlice({
    name: "addUserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actAddUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(actAddUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(actAddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default addUserSlice.reducer;