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
    <section className="relative home-carousel">
      <Carousel autoplay effect="fade" speed={1000}>
        {banners.map((banner) => (
          <div key={banner.maBanner}>
            <div 
              className="relative h-[500px] md:h-[750px] w-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${banner.hinhAnh})` }}
            >
              
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-3xl space-y-6">
                    
                    <h2 className="text-white text-5xl md:text-8xl font-black uppercase leading-[1.1] tracking-tighter drop-shadow-2xl">
                      Trải nghiệm <br />
                      <span className="text-red-600 block mt-2">Điện ảnh đỉnh cao</span>
                    </h2>
                    
                    <p className="text-gray-200 text-lg md:text-2xl font-light max-w-xl border-l-4 border-red-600 pl-4 py-2">
                      Khám phá những siêu phẩm bom tấn với chất lượng hình ảnh và âm thanh tuyệt đỉnh.
                    </p>

                    <div className="pt-8">
                      {/*Link vào dẫn thẳng đến trang đặt vé của phim đó */}
                      <button 
                        onClick={() => navigate(`/detail/${banner.maPhim}`)}
                        className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-black py-4 px-12 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] uppercase tracking-widest text-sm"
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

      {/* Effect */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10"></div>
    </section>
  );
}