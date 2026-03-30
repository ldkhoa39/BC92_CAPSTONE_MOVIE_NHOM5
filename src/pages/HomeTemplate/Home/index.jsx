import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider } from 'antd';
import Slider from "react-slick";
import { fetchBanners, fetchData } from './slice';
import Movie from './../_components/moive';
import HomeCarousel from '../_components/HomeCarousel';


// Nút bấm bên phải (Next)
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-4 md:-right-10 z-30 transform -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-red-600 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all border border-zinc-700 hover:border-red-600 group"
      onClick={onClick}
    >
      <i className="fa-solid fa-chevron-right group-hover:scale-125 transition-transform"></i>
    </div>
  );
};

// Nút bấm bên trái (Prev)
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-4 md:-left-10 z-30 transform -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-red-600 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all border border-zinc-700 hover:border-red-600 group"
      onClick={onClick}
    >
      <i className="fa-solid fa-chevron-left group-hover:scale-125 transition-transform"></i>
    </div>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchBanners());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Cấu hình Slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  // Logic lọc các group phim 
  const nowShowing = data?.filter(movie => movie.dangChieu);
  const comingSoon = data?.filter(movie => movie.sapChieu);
  const hotMovies = data?.filter(movie => movie.hot); // Nhóm phim HOT

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
    </div>
  );

  return (
    <div className="bg-zinc-950 min-h-screen pb-20 overflow-hidden text-white">
      {/* Banner */}
      <HomeCarousel />

      <div className="container mx-auto px-4 mt-16 relative z-20 space-y-24">
        
        {/* GROUP 1: PHIM ĐANG CHIẾU */}
        <section className="animate-fadeIn">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter border-l-8 border-red-600 pl-4 leading-none">
              Phim Đang Chiếu
            </h2>
            <button className="text-red-600 font-bold hover:text-white transition-colors text-sm tracking-widest">
              XEM TẤT CẢ +
            </button>
          </div>
          
          <Slider {...settings} className="movie-slider -mx-2">
            {nowShowing?.map((movie) => (
              <div key={movie.maPhim} className="px-3 py-4">
                <Movie movie={movie} />
              </div>
            ))}
          </Slider>
        </section>

        {/* GROUP 2: SIÊU PHẨM HOT  */}
        <section className="animate-fadeIn">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter border-l-8 border-white pl-4 leading-none">
              Siêu Phẩm HOT
            </h2>
          </div>
          
          <Slider {...settings} className="movie-slider -mx-2">
            {hotMovies?.map((movie) => (
              <div key={movie.maPhim} className="px-3 py-4">
                <Movie movie={movie} />
              </div>
            ))}
          </Slider>
        </section>

        {/* GROUP 3: PHIM SẮP CHIẾU */}
        <section className="animate-fadeIn pb-10">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter border-l-8 border-zinc-700 pl-4 leading-none mb-8">
            Phim Sắp Chiếu
          </h2>
          <Slider {...settings} className="movie-slider -mx-2">
            {comingSoon?.map((movie) => (
              <div key={movie.maPhim} className="px-3 py-4 opacity-80 hover:opacity-100 transition-opacity">
                <Movie movie={movie} />
              </div>
            ))}
          </Slider>
        </section>

      </div>

      {/* Hiệu ứng trang trí background */}
      <div className="fixed top-1/2 -left-64 w-[500px] h-[500px] bg-red-900/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="fixed bottom-0 -right-64 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] pointer-events-none rounded-full"></div>
    </div>
  );
}