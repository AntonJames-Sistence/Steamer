import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'

// images imports  ---------------------------------------------------------

import dd2 from '../../resources/carousel/dd2/dd2.jpeg';
import dd2_screenshot_1 from '../../resources/carousel/dd2/dd_screenshot_1.jpg';
import dd2_screenshot_2 from '../../resources/carousel/dd2/dd_screenshot_2.jpg';
import dd2_screenshot_3 from '../../resources/carousel/dd2/dd_screenshot_3.jpg';
import dd2_screenshot_4 from '../../resources/carousel/dd2/dd_screenshot_4.jpg';

import re4 from '../../resources/carousel/re4/re4.jpeg';
import re4_screenshot_1 from '../../resources/carousel/re4/rs4_screenshot_1.jpg'
import re4_screenshot_2 from '../../resources/carousel/re4/re4_screenshot_2.jpg'
import re4_screenshot_3 from '../../resources/carousel/re4/re4_screenshot_3.jpg'
import re4_screenshot_4 from '../../resources/carousel/re4/re4_screenshot_4.jpg'

import l2 from '../../resources/carousel/l2/l2.jpeg'
import l2_screenshot_1 from '../../resources/carousel/l2/l2_screenshot_1.jpeg'
import l2_screenshot_2 from '../../resources/carousel/l2/l2_screenshot_2.jpeg'
import l2_screenshot_3 from '../../resources/carousel/l2/l2_screenshot_3.jpeg'
import l2_screenshot_4 from '../../resources/carousel/l2/l2_screenshot_4.jpeg'


// ---------------------------------------------------------

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
        autoplaySpeed: 10000,
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

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_1} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_2} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_3} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_4} />
                            </div>
                        </div>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>$39.99</div>
                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <img className='carousel-img' src={re4} alt='RE4'/>
                    <div className='info-capsule'>
                        <div className='game-title'>Resident Evil 4</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_1} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_2} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_3} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_4} />
                            </div>
                        </div>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>$59.99</div>

                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <img className='carousel-img' src={l2} alt='L2'/>
                    <div className='info-capsule'>
                        <div className='game-title'>Lineage II</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_1} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_2} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_3} />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_4} />
                            </div>
                        </div>

                        <div className='avaliability'>Just Updated</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>Free To Play</div>
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