import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const slideList = [
    {
        id: 1,
        img: img1,
        header: "Thailand",
        paragraph: "This paragraph, sit amet consectetur adipisicing elit. In deserunt id dolore praesentium voluptatem inventore."
    },
    {
        id: 2,
        img: img2,
        header: "Paris Tour",
        paragraph: "This paragraph, sit amet consectetur adipisicing elit. In deserunt id dolore praesentium voluptatem inventore."
    },
    {
        id: 3,
        img: img3,
        header: "Desert Tour",
        paragraph: "This paragraph, sit amet consectetur adipisicing elit. In deserunt id dolore praesentium voluptatem inventore."
    },
    {
        id: 4,
        img: img2,
        header: "Paris Tour 2",
        paragraph: "This paragraph, sit amet consectetur adipisicing elit. In deserunt id dolore praesentium voluptatem inventore."
    },
];

function Hero() {
    const swiperRef = useRef(null);
    const changeRef = useRef(null);

    // Function to reset GSAP animations and trigger them
    const animateSlide = (swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const header = activeSlide.querySelector('h1');
        const paragraph = activeSlide.querySelector('p');

        // Reset previous animations before applying new ones
        gsap.killTweensOf(header);
        gsap.killTweensOf(paragraph);

        gsap.fromTo(
            header,
            { opacity: 0, y: 200,  rotation: 5,},
            {
                opacity: 1,
                y: 0,
                duration: 1,
                rotation: 0,
                ease: 'power1.out',
            }
        );

        gsap.fromTo(
            paragraph,
            { opacity: 0, y: 200, rotation: 5, },
            {
                opacity: 1,
                rotation: 0,
                y: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power1.out',
            }
        );
    };

    useEffect(() => {
        // Initial animation for the first slide
        if (swiperRef.current) {
            animateSlide({ activeIndex: 0, slides: swiperRef.current.querySelectorAll('.swiper-slide') });
        }

        // Clean up animations on component unmount
        return () => {
            gsap.killTweensOf('.swiper-slide h1, .swiper-slide p');
        };
    }, []);

    return (
        <div className='hero'>
            <div className='hero-content' ref={swiperRef}>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation
                    pagination={{ clickable: true, el: '.swiper-pagination', }}
                    scrollbar={{ draggable: true }}
                    slidesPerView={1}
                    onSwiper={(swiper) => (changeRef.current = swiper)}
                    onSlideChange={(swiper) => animateSlide(swiper)}  // Trigger animation on slide change
                >
                    {slideList.map(item => (
                        <SwiperSlide className='swiper' key={item.id}>
                            <div className='swiper-item' style={{
                                background: `linear-gradient(#00000086, black), url(${item.img})no-repeat center center / cover`,
                                height: "93.5dvh",
                                margin: "3dvh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#ffffff"
                            }}>
                                <div className='text'>
                                    <div className='ofset'>
                                        <h1>{item.header}</h1>
                                    </div>
                                    <div className='ofset'>
                                        <p>{item.paragraph}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                    <div className='arr'>
                        <button onClick={() => changeRef.current.slidePrev()}><ion-icon name="chevron-back-outline"></ion-icon></button>
                        <button onClick={() => changeRef.current.slideNext()}><ion-icon name="chevron-forward-outline"></ion-icon></button>
                    </div>
                </Swiper>
            </div>
        </div>
    );
}

export default Hero;
