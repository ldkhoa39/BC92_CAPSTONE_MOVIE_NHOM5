import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "./../../../services/api"; 
import { actUpdateUser } from "./slice";

export default function EditUser() {
  const params = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const result = await api.post(
          `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${params.taiKhoan}`
        );
        setUser(result.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetail();
  }, [params.taiKhoan]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await dispatch(actUpdateUser(user));

    alert("Cập nhật thành công!");
    navigate("/admin/user");
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-5">Chỉnh sửa người dùng</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tài Khoản (Không được sửa)</label>
          <input
            name="taiKhoan"
            value={user.taiKhoan}
            disabled
            className="bg-gray-100 border w-full px-3 py-2 rounded-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Họ Tên</label>
          <input
            name="hoTen"
            value={user.hoTen}
            onChange={handleOnchange}
            className="border w-full px-3 py-2 rounded-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleOnchange}
            className="border w-full px-3 py-2 rounded-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Số Điện Thoại</label>
          <input
            name="soDt"
            value={user.soDt || user.soDT} 
            onChange={handleOnchange}
            className="border w-full px-3 py-2 rounded-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Loại Người Dùng</label>
          <select
            name="maLoaiNguoiDung"
            value={user.maLoaiNguoiDung}
            onChange={handleOnchange}
            className="border w-full px-3 py-2 rounded-base"
          >
            <option value="KhachHang">Khách hàng</option>
            <option value="QuanTri">Quản trị</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-base hover:bg-green-700"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}