import { useState } from "react";
import { actAddUser } from "./slice";
import { useDispatch, useSelector } from "react-redux";


export default function AddUser() {

  const dispatch = useDispatch()
  // const {loading, data, error} = useSelector((state) => state.addUserReducer)

  const {} = useSelector((state) => state.addUserReducer);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const hanldAddUser = (e) => {
    e.preventDefault();
    dispatch(actAddUser(user));
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={hanldAddUser}>
      {/* {error && (
        <div
          className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
          role="alert"
        >
          {error.response.data.content}
        </div>
      )}  */}
      <div className="mb-5">
        <label
          htmlFor=""
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Tai Khoan
        </label>
        <input
          onChange={handleOnchange}
          name="taiKhoan"
          type="text"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Nháº­p tĂ i khoáº£n"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor=""
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Mat Khau
        </label>
        <input
          onChange={handleOnchange}
          name="matKhau"
          type="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Nháº­p máº­t kháº©u"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor=""
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Email
        </label>
        <input
          onChange={handleOnchange}
          name="email"
          type="email"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Nháº­p email"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor=""
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          So Dien Thoai
        </label>
        <input
          onChange={handleOnchange}
          name="soDt"
          type="text"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Nháº­p sdt"
        />
      </div>
      <div className="mb-5">
        <div>
          <label
            htmlFor="countries"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Loai Nguoi Dung
          </label>
          <select
            name="maLoaiNguoiDung"
            onChange={handleOnchange}
            id="countries"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            <option value="">Choose a user</option>
            <option value="KhachHang">Khach hang</option>
            <option value="QuanTri">Quan tri‹</option>
          </select>
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor=""
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Ho Ten
        </label>
        <input
          onChange={handleOnchange}
          name="hoTen"
          type="text"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Nháº­p há» tĂªn"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        Add user
      </button>
    </form>
  );
}
