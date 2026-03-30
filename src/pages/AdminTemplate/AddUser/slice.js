import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api"

const initialState = {
    loading: false,
    data: null,
    error: null
};

export const actAddUser = createAsyncThunk(
    "actAddUser", 
    async (user, { rejectWithValue }) => {
    try {
        const result = await api.post("QuanLyNguoiDung/ThemNguoiDung", user);
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error);
    }
},);

const addUserSlice = createSlice({
    name: "addUserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actAddUser.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(actAddUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actAddUser.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export default addUserSlice.reducer;