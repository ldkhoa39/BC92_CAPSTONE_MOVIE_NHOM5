import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBanners } from '../../Home/slice';

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { banners } = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <section className="relative home-carousel overflow-hidden">
      <Carousel autoplay effect="fade" speed={1000}>
        {banners.map((banner) => (
          <div key={banner.maBanner}>
            <div 
              className="relative h-[450px] sm:h-[600px] md:h-[750px] w-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${banner.hinhAnh})` }}
            >
              {/* Overlay: Chỉnh lại gradient để trên mobile nhìn rõ ảnh hơn */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 md:via-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-4 sm:px-8 md:px-12">
                  <div className="max-w-3xl space-y-4 md:space-y-6">
                    
                    {/* Title: Giảm size trên mobile (text-4xl) và tăng dần lên desktop (text-8xl) */}
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight tracking-tighter drop-shadow-xl">
                      Trải nghiệm <br />
                      <span className="text-red-600 block mt-1">Điện ảnh đỉnh cao</span>
                    </h2>
                    
                    {/* Description: Ẩn bớt trên màn hình cực nhỏ hoặc giảm size */}
                    <p className="text-gray-200 text-sm sm:text-lg md:text-2xl font-light max-w-xs sm:max-w-md md:max-w-xl border-l-4 border-red-600 pl-4 py-1 md:py-2">
                      Khám phá những siêu phẩm bom tấn với chất lượng hình ảnh và âm thanh tuyệt đỉnh.
                    </p>

                    <div className="pt-4 md:pt-8">
                      <button 
                        onClick={() => navigate(`/detail/${banner.maPhim}`)}
                        className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-black py-3 px-8 md:py-4 md:px-12 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] uppercase tracking-widest text-xs md:text-sm"
                      >
                        Đặt vé ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Căn chỉnh lại lớp phủ mờ phía dưới đáy để tiệp vào nội dung trang chủ */}
      <div className="absolute bottom-0 w-full h-24 md:h-40 bg-gradient-to-t from-zinc-950 to-transparent z-10"></div>
    </section>
  );
}