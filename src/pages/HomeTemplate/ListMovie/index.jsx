import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./../_components/moive";
import LoadingSkeleton from "./../_components/loading"

export default function ListMovie() {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  // State hỗ trợ tìm kiếm/lọc
  const [searchTerm, setSearchTerm] = useState("");

  // Khai báo thêm state cho nút Back to Top
  const [showBackToTop, setShowBackToTop] = useState(false);

  // theo dõ cuộn chuột to show back to top btn
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ loading: true, data: null, error: null });

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM";

        const [resGroup1, resGroup2] = await Promise.all([
          axios({
            method: "GET",
            url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
            headers: { TokenCybersoft: token },
          }),
          axios({
            method: "GET",
            url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05",
            headers: { TokenCybersoft: token },
          }),
        ]);

        // kết hợp 2 group phim
        const combinedData = [...resGroup1.data.content, ...resGroup2.data.content];

        // lọc phim bị trùng
        const uniqueMovies = combinedData.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.maPhim === movie.maPhim)
        );

        setState({ loading: false, data: uniqueMovies, error: null });

        // set delay để thấy hiệu ứng Skeleton 
        setTimeout(() => {
          setState({ loading: false, data: uniqueMovies, error: null });
        }, 100000);
      } catch (error) {
        console.log("Lỗi tải dữ liệu", error);
        setState({ loading: false, data: null, error: error });
      }
    };
    fetchData();
  }, []);

  // Logic lọc phim đang chiếu và lọc theo tên
  const filteredMovies = state.data?.filter((movie) => {
    const isNowShowing = movie.dangChieu === true;
    const matchesSearch = movie.tenPhim
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isNowShowing && matchesSearch;
  });

  // if (state.loading) return (
  //   <div className="flex justify-center items-center h-screen bg-zinc-950">
  //     <div className="text-center">
  //       <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
  //       <p className="text-red-600 font-bold tracking-widest uppercase">Đang tải phim...</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-zinc-950 min-h-screen pt-24 md:pt-32 pb-20 overflow-hidden relative selection:bg-red-600/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header & Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 md:mb-16 gap-6 border-b border-zinc-800 pb-8 md:pb-10">
          <div className="space-y-2 w-full lg:w-auto">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Phim <span className="text-red-600">Đang Chiếu</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-1 w-8 md:w-12 bg-red-600 rounded-full"></span>
              <p className="text-zinc-500 font-medium italic text-sm md:text-lg mt-1 md:mt-2">
                Tìm thấy {state.loading ? "..." : filteredMovies?.length} phim hiện có
              </p>
            </div>
          </div>

          {/* Ô tìm kiếm Real-time (Responsive chiều rộng 100% trên Mobile) */}
          <div className="relative w-full lg:w-[450px] group">
            <input
              type="text"
              placeholder="Nhập tên phim bạn muốn xem..."
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all pl-12 md:pl-14 shadow-lg md:shadow-2xl text-sm md:text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
          </div>
        </div>

        {/* Danh sách phim Grid & Loading Skeleton */}
        <div className="min-h-[400px]">
          {state.loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="h-full">
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          ) : filteredMovies?.length > 0 ? (
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-12 animate-fadeIn">
              {filteredMovies.map((movie) => (
                
                <div 
                  key={movie.maPhim} 
                  className="h-full flex flex-col transform transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-3"
                >
                  <Movie movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 md:py-32 text-zinc-700 bg-zinc-900/20 rounded-2xl md:rounded-3xl border border-dashed border-zinc-800 mx-4 md:mx-0">
              <i className="fa-solid fa-clapperboard text-5xl md:text-7xl mb-4 md:mb-6 opacity-20"></i>
              <p className="text-lg md:text-2xl font-bold italic text-zinc-500">Rất tiếc, không tìm thấy phim phù hợp!</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 md:mt-6 text-red-600 underline font-bold active:scale-95 transition-transform"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NÚT BACK TO TOP Ẩn trên mobile*/}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-14 md:h-14 bg-red-600 text-white rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-500 z-50 hover:bg-white hover:text-red-600 flex items-center justify-center active:scale-90 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
        }`}
      >
        <i className="fa-solid fa-arrow-up text-lg md:text-xl"></i>
      </button>

      {/* Hiệu ứng mờ ảo góc màn hình */}
      <div className="fixed -bottom-48 -left-48 w-64 h-64 md:w-96 md:h-96 bg-red-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
    </div>
  );
}