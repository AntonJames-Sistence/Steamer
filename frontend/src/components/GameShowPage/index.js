import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, getGame } from '../../store/games';
import './GameShowPage.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../../resources/carousel/l2/l21.jpeg'
import slide2 from '../../resources/carousel/l2/l22.jpeg'
import slide3 from '../../resources/carousel/l2/l23.jpeg'


const GameShowPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector(getGame(gameId));
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
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
    };

    const handleThumbnailHover = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const slider = (
        <Slider ref={sliderRef} {...settings}>
            <div>
                <img className='slider-img' src={slide1} alt="Slide 1" />
            </div>
            <div>
                <img className='slider-img' src={slide2} alt="Slide 2" />
            </div>
            <div>
                <img className='slider-img' src={slide3} alt="Slide 3" />
            </div>
        </Slider>
    )

    return (
        <div className='carousel-content'>
            <div className='show-slider-capsule'>
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
        </div>
    )

}

export default GameShowPage;