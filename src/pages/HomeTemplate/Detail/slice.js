import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchDetailMovie = createAsyncThunk(
    "detailMovie/fetchDetailMovie", 
    async (id, { rejectWithValue }) => {
        try {
            // Đảm bảo "api" đã được cấu hình baseURL là ".../api/"
            // lay thong tin cua phim(30s)
            // const resultDetail = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

            // // lay thong tin lich chieu cua phim
            // const resultSchedule = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);

             const [resultDetail, resultSchedule] = await Promise.all([
                api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
                api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`),
            ]);

            console.log("rsschedule", resultSchedule.data.content);

            const result ={
                detail: resultDetail.data.content,
                schedule: resultSchedule.data.content,
            };

            // Trả về dữ liệu thành công
            return result;
        } catch (error) {
            // Chỉ trả về data lỗi từ server hoặc thông báo lỗi để tránh lỗi "non-serializable"
            return rejectWithValue(error.response?.data || error.message);
        }
    },
);

const detailMovieSlice = createSlice({
    name: "detailMovieSlice",
    initialState,
    reducers: {},
    extraReducers: (builder ) =>{
        builder.addCase(fetchDetailMovie.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchDetailMovie.fulfilled, (state,action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchDetailMovie.rejected, (state,action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export default detailMovieSlice.reducer;