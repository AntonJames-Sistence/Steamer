import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainCarousel.css'


import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, getGames } from '../../store/games';
import SliderItem from './SliderItem';


// ---------------------------------------------------------
// game slider randomizer
export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

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
        arrows: true
    };

    if(games.length === 0) return (<></>)

    const shuffledGames = shuffle(games);
    const selectedGames = shuffledGames.slice(0, 7);

    const sliderCapsule = (
        <Slider {...settings} ref={sliderRef}>

            {selectedGames.map((game) => (
                <SliderItem key={game.id} game={game} />
            ))}
            
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