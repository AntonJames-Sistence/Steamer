import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'
import dd2 from '../../resources/carousel/dd2.jpeg';
import re4 from '../../resources/carousel/re4.jpeg';
import l2 from '../../resources/carousel/l2.png'

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
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: null, //<NextArrow />,
        prevArrow: null //<PrevArrow />,
    };
  
    return (
      <Slider {...settings} ref={sliderRef}>

        <div>
            <img className='carousel-img' src={dd2} alt='DD2'/>
        </div>

        <div>
            <img className='carousel-img' src={re4} alt='RE4'/> 
        </div>

        <div>
            <img className='carousel-img' src={l2} alt='L2'/> 
        </div>

      </Slider>
    );
};

export default Carousel;