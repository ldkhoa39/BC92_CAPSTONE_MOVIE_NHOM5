import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMovieUpload } from './slice';
import { DatePicker } from 'antd'; 
import dayjs from 'dayjs'; 

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
                // API CapNhatPhimUpload 
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
        <div className="max-w-2xl mx-auto p-6 md:p-8 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <i className="fa-solid fa-pen-nib"></i>
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Cập nhật Phim: <span className="text-blue-500">{id}</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <label className="block mb-2 text-sm font-bold text-zinc-400">Tên phim</label>
                <input name="tenPhim" value={movie.tenPhim} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all" onChange={handleChange} />
                </div>

                <div>
                <label className="block mb-2 text-sm font-bold text-zinc-400">Mô tả</label>
                <textarea name="moTa" value={movie.moTa} rows={4} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all resize-none" onChange={handleChange}></textarea>
                </div>

                <div>
                <label className="block mb-2 text-sm font-bold text-zinc-400">Ngày khởi chiếu</label>
                <DatePicker
                    format="DD/MM/YYYY"
                    className="w-full h-12 bg-zinc-950 border-zinc-800 hover:border-blue-500"
                    value={movie.ngayKhoiChieu ? dayjs(movie.ngayKhoiChieu) : null}
                    onChange={handleChangeDate}
                />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <div className="text-center shrink-0">
                    <p className="text-xs font-bold text-zinc-500 mb-2 uppercase">Ảnh hiện tại</p>
                    <div className="w-20 h-28 rounded-lg overflow-hidden border border-zinc-700 shadow-md">
                        <img src={movieEdit?.hinhAnh} alt="preview" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <label className="block mb-2 text-sm font-bold text-zinc-400">Chọn ảnh mới (nếu cần):</label>
                    <input type="file" accept="image/*" className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-all" onChange={handleChangeFile} />
                </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 mt-4">
                <i className="fa-solid fa-arrows-rotate mr-2"></i> Xác nhận Cập nhật
                </button>
            </form>
        </div>
    );
}