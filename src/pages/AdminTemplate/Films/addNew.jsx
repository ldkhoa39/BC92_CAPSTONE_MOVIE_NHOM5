import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieUpload } from './slice';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function AddNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    tenPhim: '',
    trailer: '',
    moTa: '',
    ngayKhoiChieu: '',
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maNhom: 'GP01'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangeFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMovie((prev) => ({
        ...prev,
        hinhAnh: file
      }));
    }
  };

  //
  const handleDateChange = (date, dateString) => {
    setMovie((prev) => ({
      ...prev,
      ngayKhoiChieu: dateString 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(movie).forEach(([key, value]) => {
      if (key === 'hinhAnh') {
        if (value) {
          formData.append('File', value, value.name);
        }
      } else {
        formData.append(key, value);
      }
    });

    dispatch(addMovieUpload(formData))
      .unwrap()
      .then(() => {
        alert('Thêm phim thành công!');
        navigate('/admin/films');
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <i className="fa-solid fa-video"></i>
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Thêm Phim Mới</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-bold text-zinc-400">Tên phim</label>
          <input name="tenPhim" placeholder="Nhập tên phim..." className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-zinc-400">Link Trailer</label>
          <input name="trailer" placeholder="https://youtube.com/..." className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-zinc-400">Mô tả chi tiết</label>
          <textarea name="moTa" placeholder="Nhập nội dung phim..." rows={4} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-zinc-400">Ngày khởi chiếu</label>
          {/* Cần bọc ConfigProvider theme dark*/}
          <DatePicker format="DD/MM/YYYY" className="w-full h-12 bg-zinc-950 border-zinc-800 hover:border-red-500" onChange={handleDateChange} />
        </div>

        <div className="flex space-x-6 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 font-medium">
            <input type="checkbox" name="dangChieu" className="w-5 h-5 accent-red-600" onChange={handleChange} /> 
            Đang chiếu
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 font-medium">
            <input type="checkbox" name="hot" className="w-5 h-5 accent-red-600" onChange={handleChange} /> 
            Phim Hot <i className="fa-solid fa-fire text-orange-500"></i>
          </label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-zinc-400">Poster Hình ảnh</label>
          <input type="file" accept="image/*" className="w-full text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-all" onChange={handleChangeFile} />
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-green-600/20 mt-4">
          <i className="fa-solid fa-cloud-arrow-up mr-2"></i> Lưu phim mới
        </button>
      </form>
    </div>
  );
}