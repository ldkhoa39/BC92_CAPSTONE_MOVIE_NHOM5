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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Thêm Phim Mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="tenPhim"
          placeholder="Tên phim"
          className="w-full p-2 border"
          onChange={handleChange}
        />

        <input
          name="trailer"
          placeholder="Link Trailer"
          className="w-full p-2 border"
          onChange={handleChange}
        />

        <textarea
          name="moTa"
          placeholder="Mô tả"
          className="w-full p-2 border"
          onChange={handleChange}
        />

        {/* ✅ Ant Design DatePicker */}
        <DatePicker
          format="DD/MM/YYYY"
          className="w-full"
          onChange={handleDateChange}
        />

        <div className="flex space-x-4">
          <label>
            <input type="checkbox" name="dangChieu" onChange={handleChange} /> Đang chiếu
          </label>

          <label>
            <input type="checkbox" name="hot" onChange={handleChange} /> Hot
          </label>
        </div>

        <div>
          <label className="block mb-2">Hình ảnh:</label>
          <input type="file" accept="image/*" onChange={handleChangeFile} />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Tạo phim mới
        </button>
      </form>
    </div>
  );
}