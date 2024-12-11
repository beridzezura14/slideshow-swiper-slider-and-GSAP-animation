import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const country = ["ესპანეთი", "ეგვიპტე", "თურქეთი", "იტალია", "ჩეხეთი", "საფრანგეთი", "ინდოეთი", "ტაილანდი"]

function Country() {
    const swiperRef = useRef(null);
    const changeRef = useRef(null);

    const [slidesToShow, setSlidesToShow] = useState(4); // Default value

    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1.1); // For mobile devices
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2.2); // For tablets
      } else {
        setSlidesToShow(4.3); // For larger screens
      }
    };
    useEffect(() => {
        updateSlidesToShow(); // Update on mount
        window.addEventListener('resize', updateSlidesToShow); // Update on resize
        return () => window.removeEventListener('resize', updateSlidesToShow);
      }, []);

    return (
        <div className='country'>
            <div className="country-content">
                <div className='head'>
                    <h2>პოპულარული ქვეყნები</h2>
                    <div className='arr'>
                            <button onClick={() => changeRef.current.slidePrev()}><ion-icon name="chevron-back-outline"></ion-icon></button>
                            <button onClick={() => changeRef.current.slideNext()}><ion-icon name="chevron-forward-outline"></ion-icon></button>
                    </div>
                </div>
                {/* <div cl> </div> */}
                <div ref={swiperRef}>
                    <Swiper 
                        className='country-slide'
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true, el: '.swiper-pagination', }}
                        spaceBetween={20} 
                        // centeredSlides={true} 
                        slidesPerView={slidesToShow}
                        onSwiper={(swiper) => (changeRef.current = swiper)}
                    >
                        {country.map((item, i) => (
                            <SwiperSlide className='coutry-item' key={i}>
                                <div className='item' >
                                    <h3>{item}</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination swiper-pagination"></div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Country
