import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Đừng quên import axios nhé!
import api from "../../../services/api";


const initialState = {
    loading: false,
    data: null,
    banners: [],
    error: null,
};

// Làm fetchBanners
export const fetchBanners = createAsyncThunk("homeMovie/fetchBanners", async (__, { rejectWithValue }) => {
    try {
        const result = await api.get("QuanLyPhim/LayDanhSachBanner");
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const fetchData = createAsyncThunk("homeMovie/fetchData", async (__, { rejectWithValue }) => {
    try {
        // const result = await axios({
        //   method: "GET",
        //   url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
        //   headers: {
        //     TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM",
        //   },
        // });

        const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");

        return result.data.content;
    } catch (error) {
        // Trả về error để action.payload ở case rejected nhận được
        return rejectWithValue(error.response?.data || error.message);
    }
});

const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        // Sửa fulfilled thành rejected ở đây
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
        // fetchBanners
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            state.banners = action.payload;
        });
    },
});

export default homeSlice.reducer;