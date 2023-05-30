import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'
import dd2 from '../../resources/carousel/dd2.jpeg';
import re4 from '../../resources/carousel/re4.jpeg';
import l2 from '../../resources/carousel/l2.jpeg'

const Carousel = () => {
    const sliderRef = useRef(null);

    const NextArrow = ({ onClick }) => (
        <button onClick={onClick}>Next</button>
    );
    
    const PrevArrow = ({ onClick }) => (
        <button onClick={onClick}>Previous</button>
    );
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: null, //<NextArrow />,
        prevArrow: null //<PrevArrow />,
    };

    const sliderCapsule = (
        <Slider {...settings} ref={sliderRef}>
            <div className='carousel-slide'>
                <div className='slide-content'>
                    <img className='carousel-img' src={dd2} alt='DD2' />
                    <div className='info-capsule'>
                        <div className='game-title'>Darkest Dungeon II</div>
                        <p>
                            
                        </p>
                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <img className='carousel-img' src={re4} alt='RE4'/>
                    <div className='info-capsule'>
                        <div className='game-title'>Resident Evil 4</div>
                        <p>
                            
                        </p>
                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <img className='carousel-img' src={l2} alt='L2'/>
                    <div className='info-capsule'>
                        <div className='game-title'>Lineage II</div>
                        <p>
                            
                        </p>
                    </div>
                </div> 
            </div>
        </Slider>
    )
  
    return (
      
        <div className='carousel-content'>
            <h2 className='carousel-header-text'>Featured & Recommended</h2>

                <div className='carousel-capsule'>
                    {sliderCapsule}
                </div>

        </div>

      
    );
};

export default Carousel;