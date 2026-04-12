import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMovieUpload } from './slice';
import { DatePicker } from 'antd'; // Import DatePicker từ Ant Design
import dayjs from 'dayjs'; // Import dayjs

export default function Edit() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listMovie } = useSelector((state) => state.filmsReducer);
    const movieEdit = listMovie.find(item => item.maPhim == id);

    const [movie, setMovie] = useState({
        maPhim: '', tenPhim: '', trailer: '', moTa: '',
        ngayKhoiChieu: '', dangChieu: false,
        sapChieu: false, hot: false, danhGia: 0,
        hinhAnh: null, maNhom: 'GP01'
    });

    useEffect(() => {
        if (movieEdit) {
            setMovie({
                ...movieEdit,

                ngayKhoiChieu: movieEdit.ngayKhoiChieu
            });
        }
    }, [movieEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMovie({ ...movie, [name]: type === 'checkbox' ? checked : value });
    };

    // Hàm xử lý riêng cho DatePicker của Ant Design
    const handleChangeDate = (date, dateString) => {
        // dateString sẽ có định dạng dd/mm/yyyy nhờ thuộc tính format của antd
        setMovie({ ...movie, ngayKhoiChieu: dateString });
    };

    const handleChangeFile = (e) => {
        setMovie({ ...movie, hinhAnh: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mã phim
        if (!movie.maPhim) {
            alert("Không tìm thấy mã phim để cập nhật!");
            return;
        }

        let formData = new FormData();

        // Duyệt qua từng key để đóng gói FormData
        for (let key in movie) {
            if (key === 'hinhAnh') {
                // API CapNhatPhimUpload yêu cầu key là 'File' (viết hoa chữ F)
                if (movie.hinhAnh instanceof File) {
                    formData.append('File', movie.hinhAnh, movie.hinhAnh.name);
                }
            }
            else if (key === 'ngayKhoiChieu') {
                // Chuyển về định dạng dd/mm/yyyy chuẩn API
                const dateFormatted = dayjs(movie.ngayKhoiChieu).format('DD/MM/YYYY');
                formData.append(key, dateFormatted);
            }
            else if (key === 'maNhom') {
                formData.append(key, 'GP01');
            }
            else if (key === 'maPhim' || key === 'tenPhim' || key === 'trailer' || key === 'moTa' || key === 'danhGia' || key === 'hot' || key === 'dangChieu' || key === 'sapChieu') {
                // kiểm tra để không bỏ sót maPhim
                formData.append(key, movie[key]);
            }
        }

        // LOG kiểm tra lần cuối trước khi bay lên server
        console.log("--- Kiểm tra FormData ---");
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Dispatch action
        dispatch(updateMovieUpload(formData))
            .unwrap()
            .then(() => {
                alert("Cập nhật phim thành công rồi <3");
                navigate('/admin/films');
            })
            .catch((err) => {
                console.error("Lỗi từ server:", err);
                alert(typeof err === 'string' ? err : "Cập nhật thất bại!!!");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Phim: {id}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="tenPhim" value={movie.tenPhim} className="w-full p-2 border" onChange={handleChange} />
                <textarea name="moTa" value={movie.moTa} className="w-full p-2 border shadow-sm" rows={4} onChange={handleChange}></textarea>

                {/* Sử dụng DatePicker của Ant Design */}
                <div className="block">
                    <label className="block mb-1">Ngày khởi chiếu (dd/mm/yyyy):</label>
                    <DatePicker
                        format="DD/MM/YYYY"
                        className="w-full p-2"
                        // Dùng dayjs để convert chuỗi ngày tháng cho DatePicker hiển thị
                        value={movie.ngayKhoiChieu ? dayjs(movie.ngayKhoiChieu) : null}
                        onChange={handleChangeDate}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Ảnh hiện tại</p>
                        <img src={movieEdit?.hinhAnh} alt="preview" className="w-20 h-20 object-cover border" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm">Chọn ảnh mới (nếu muốn thay đổi):</label>
                        <input type="file" accept="image/*" className="w-full" onChange={handleChangeFile} />
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition">
                    Cập nhật phim
                </button>
            </form>
        </div>
    );
}