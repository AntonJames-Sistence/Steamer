import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainCarousel.css'


import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, getGames } from '../../store/games';
import SliderItem from './SliderItem';


// ---------------------------------------------------------

const MainCarousel = () => {
    const sliderRef = useRef(null);
    const dispatch = useDispatch();
    const games = useSelector(getGames);

    useEffect(() => {
        dispatch(fetchGames())
    }, [dispatch])
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    if(games.length === 0) return (<></>)

    const sliderCapsule = (
        <Slider {...settings} ref={sliderRef}>
            
            <SliderItem game={games[0]} />

            <SliderItem game={games[1]} />

            <SliderItem game={games[2]} />
            
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