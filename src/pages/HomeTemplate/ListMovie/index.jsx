import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./../_components/moive";

export default function ListMovie() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  // State hỗ trợ tìm kiếm/lọc
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ loading: true, data: null, error: null });

        const result = await axios({
          method: "GET",
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
          headers: {
            TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM",
          },
        });

        setState({ loading: false, data: result.data.content, error: null });
      } catch (error) {
        setState({ loading: false, data: null, error: error });
      }
    };
    fetchData();
  }, []);

  // Logic lọc phim đang chiếu và lọc theo tên
  const filteredMovies = state.data?.filter((movie) => {
    const isNowShowing = movie.dangChieu === true;
    const matchesSearch = movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase());
    return isNowShowing && matchesSearch;
  });

  if (state.loading) return (
    <div className="container mx-auto py-20 text-center">
       <div className="inline-block animate-bounce text-red-600 font-bold">ĐANG TẢI PHIM...</div>
    </div>
  );

  return (
    <div className="bg-zinc-950 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              Phim <span className="text-red-600">Đang Chiếu</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-medium">Khám phá {filteredMovies?.length} siêu phẩm tại rạp</p>
          </div>

          {/* Ô tìm kiếm*/}
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Tìm tên phim..."
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-6 py-3 rounded-full focus:outline-none focus:border-red-600 transition-all pl-12"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"></i>
          </div>
        </div>

        {/* Danh sách phim */}
        {filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredMovies.map((movie) => (
              <div key={movie.maPhim} className="hover:scale-105 transition-transform duration-300">
                <Movie movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <i className="fa-solid fa-film text-5xl mb-4 block"></i>
            <p>Không tìm thấy phim nào phù hợp...</p>
          </div>
        )}

      </div>
    </div>
  );
}