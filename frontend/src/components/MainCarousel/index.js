import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainCarousel.css'

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

import la from '../../resources/carousel/la/lost_ark.jpeg'
import l2_screenshot_2 from '../../resources/carousel/la/la1.jpg'
import l2_screenshot_3 from '../../resources/carousel/la/la2.jpg'
import l2_screenshot_1 from '../../resources/carousel/la/la3.jpg'
import l2_screenshot_4 from '../../resources/carousel/la/la4.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, getGames } from '../../store/games';


// ---------------------------------------------------------

const MainCarousel = () => {
    const sliderRef = useRef(null);
    const dispatch = useDispatch();
    const games = useSelector(getGames);


    useEffect(() => {
        
        dispatch(fetchGames())
    
    }, [dispatch])

    // const NextArrow = ({ onClick }) => (
    //     <button onClick={onClick}>Next</button>
    // );
    
    // const PrevArrow = ({ onClick }) => (
    //     <button onClick={onClick}>Previous</button>
    // );
    
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

    if(games.length === 0) return (<></>)

    const sliderCapsule = (
        <Slider {...settings} ref={sliderRef}>
            <div className='carousel-slide'>
                <div className='slide-content'>
                    <a href={`/games/${games[0].id}`}>
                        <img className='carousel-img' src={dd2} alt='DD2' />
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[0].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_1} alt='dd2_scr1'/>
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_2} alt='dd2_scr2' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_3} alt='dd2_scr3' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={dd2_screenshot_4} alt='dd2_scr4' />
                            </div>
                        </div>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>${games[0].price}</div>
                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <a href={`/games/${games[1].id}`}>
                        <img className='carousel-img' src={re4} alt='RE4'/>
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[1].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_1} alt='re4_scr1' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_2} alt='re4_scr2' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_3} alt='re4_scr3' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={re4_screenshot_4} alt='re4_scr4' />
                            </div>
                        </div>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>${games[1].price}</div>

                    </div>
                </div>
            </div>

            <div className='carousel-slide'>
                <div className='slide-content'>
                    <a href={`/games/${games[2].id}`}>
                        <img className='carousel-img' src={la} alt='LostArk'/>
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[2].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_1} alt='l2_scr1' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_2} alt='l2_scr2' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_3} alt='l2_scr3' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={l2_screenshot_4} alt='l2_scr4' />
                            </div>
                        </div>

                        <div className='avaliability'>Just Updated</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>{games[2].price === "0.0" ? 'Free to Play' : games[2].price}</div>
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

export default MainCarousel;