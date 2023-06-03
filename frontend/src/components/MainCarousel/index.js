import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainCarousel.css'


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
        speed: 700,
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
                    <a href={ `/games/${games[0].id}`}>
                        <img className='carousel-img' src={games[0].imageUrls[0]} alt='' />
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[0].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[0].imageUrls[1]} alt=''/>
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[0].imageUrls[2]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[0].imageUrls[3]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[0].imageUrls[4]} alt='' />
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
                        <img className='carousel-img' src={games[1].imageUrls[0]} alt=''/>
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[1].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[1].imageUrls[1]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[1].imageUrls[2]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[1].imageUrls[3]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[1].imageUrls[4]} alt='' />
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
                        <img className='carousel-img' src={games[2].imageUrls[0]} alt=''/>
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{games[2].title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[2].imageUrls[1]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[2].imageUrls[2]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[2].imageUrls[3]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={games[2].imageUrls[4]} alt='' />
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