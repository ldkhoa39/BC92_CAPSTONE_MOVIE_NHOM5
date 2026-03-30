import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";

const initialState = {
    loading: false,
    roomTicketDetail: null, // Chứa thongTinPhim và danhSachGhe
    danhSachGheDangDat: [], // Những ghế người dùng đang chọn (màu vàng)
    error: null,
};

// Thunk lấy danh sách phòng vé
export const fetchRoomDetail = createAsyncThunk(
    "checkout/fetchRoomDetail",
    async (maLichChieu, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Thunk đặt vé (Gửi lên server)
export const bookTicket = createAsyncThunk(
    "checkout/bookTicket",
    async (bookingInfo, { rejectWithValue, dispatch }) => {
        try {
            // bookingInfo dạng: { maLichChieu: 0, danhSachVe: [{ maGhe: 0, giaVe: 0 }] }
            await api.post(`QuanLyDatVe/DatVe`, bookingInfo);
            alert("Đặt vé thành công!");
            // Sau khi đặt thành công, load lại phòng vé để cập nhật ghế đã có người mua
            dispatch(fetchRoomDetail(bookingInfo.maLichChieu));
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkoutSlice",
    initialState,
    reducers: {
        // Action xử lý khi người dùng click vào 1 ghế
        datGhe: (state, action) => {
            const gheClick = action.payload;
            const index = state.danhSachGheDangDat.findIndex(ghe => ghe.maGhe === gheClick.maGhe);
            
            if (index !== -1) {
                // Nếu ghế đã có trong danh sách đang đặt -> Xóa đi (Bỏ chọn)
                state.danhSachGheDangDat.splice(index, 1);
            } else {
                // Nếu chưa có -> Thêm vào (Chọn ghế)
                state.danhSachGheDangDat.push(gheClick);
            }
        },
        // Reset lại sau khi thanh toán xong
        clearBooking: (state) => {
            state.danhSachGheDangDat = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoomDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.roomTicketDetail = action.payload;
            })
            .addCase(fetchRoomDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { datGhe, clearBooking } = checkoutSlice.actions;
export default checkoutSlice.reducer;