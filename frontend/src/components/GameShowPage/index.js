import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, getGame } from '../../store/games';
import './GameShowPage.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../../resources/carousel/l2/l2.jpeg'
import slide2 from '../../resources/carousel/l2/l22.jpeg'
import slide3 from '../../resources/carousel/l2/l23.jpeg'

// helper method to parse date
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const GameShowPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector(getGame(gameId));
    console.log(game)
    const sliderRef = useRef(null);

    useEffect(() => {
        dispatch(fetchGame(gameId))
    }, [dispatch, gameId]);



    if (!game) return (<></>) // prevents bug when not provided params

    const settings = {
        // Main carousel settings
        dots: false,
        arrows: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        fade: true,
    };

    const handleThumbnailHover = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const infoHolderComponent = (
        <div className='info-holder'>

            <div>
                <img className='show-header-img' src={slide1} />
            </div>

            <div className='show-game-description'>
                {game.details}
            </div>

            <div className='dev-pub-info'>
                <div className='release-date'>
                    <div>Release Date:</div>
                    <div className='show-date'>{formatDate(game.releaseDate)}</div>
                </div>
                <div className='developer'>
                    <div>Developer:</div>
                    <div className='show-developer'>{game.developer}</div>
                </div>
                <div className='publisher'>
                    <div>Publisher:</div>
                    <div className='show-publisher'>{game.publisher}</div>
                </div>
            </div>

            <div className='show-genre'>
                <div className='show-tags'>Popular user-defined tags for this product:</div>
                <div className='show-tags-data'>
                    <a href='#'>{game.genre}</a>
                </div>
            </div>

        </div>
    )

    const slider = (
        <Slider ref={sliderRef} {...settings}>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={slide1} alt="Slide 1" />
                    
                    {infoHolderComponent}
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={slide2} alt="Slide 2" />
                    
                    {infoHolderComponent}
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={slide3} alt="Slide 3" />
                    
                    {infoHolderComponent}
                </div>
            </div>
        </Slider>
    )

    return (
        <div className='carousel-content'>
            {slider}
            <div className="thumbnail-carousel-container">
                <div className="thumbnail-carousel">
                    <img className='test' 
                        src={slide1} alt="Thumbnail 1"
                        onMouseEnter={() => handleThumbnailHover(0)}
                        />
                    <img className='test'
                        src={slide2} 
                        alt="Thumbnail 2"
                        onMouseEnter={() => handleThumbnailHover(1)}
                        />
                    <img className='test'
                        src={slide3}
                        alt="Thumbnail 3"
                        onMouseEnter={() => handleThumbnailHover(2)}
                        />
                    <img className='test' 
                        src={slide1} alt="Thumbnail 1"
                        onMouseEnter={() => handleThumbnailHover(0)}
                        />
                    <img className='test'
                        src={slide2} 
                        alt="Thumbnail 2"
                        onMouseEnter={() => handleThumbnailHover(1)}
                        />
                    <img className='test'
                        src={slide3}
                        alt="Thumbnail 3"
                        onMouseEnter={() => handleThumbnailHover(2)}
                        />
                </div>
            </div>
        </div>

    )

}

export default GameShowPage;