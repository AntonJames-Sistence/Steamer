import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, getGame } from '../../store/games';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

import './GameShowPage.css'
import './sliderHeader.css'
import './carousel.css'
import './pageContent.css'

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
    const [ signInModal, setSignInModal ] = useState(false);

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchGame(gameId))
    }, [dispatch, gameId]);



    if (!game) return (<></>) // prevents bug when not provided params

    const settings = {
        // Main carousel settings
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
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
                    <a className='show-tags-links' href='#'>{game.genre}</a>
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

    const sliderThumbnail = (
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
    )

    const sliderHeader = (
        <div className='slider-header-wrap'>
            <div className='slide-header-links'>
                <a href='#'>All Games</a>
                {' > '}
                <a href='#'>{game.genre} Games</a>
                {' > '}
                <a href='#'>{game.title}</a>
            </div>
            <div className='title-wrap'>
                <div className='show-game-title'>{game.title}</div>
                <div>
                    <a href='#' className='community-hub'><span>Community Hub</span></a>
                </div>
            </div>
        </div>
    )

    const signInInvite = (
        <div className='invite-capsule'>
            <p><a className='login-invite-link' onClick={() => setSignInModal(true)}>Sign in</a> to add this item to your wishlist, follow it, or mark it as ignored</p>
            {signInModal && (
                <Modal onClose={() => setSignInModal(false)}>
                    <LoginForm />
                </Modal>     
            )}
        </div>
    )

    const signUpOffer = (
        <div className='signin-offer-wrap'>
            <div className='signin-offer'>Is this game relevant to you?</div>
            <div className='show-signin-offer'>
                <p>Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.</p>
                <a 
                className='signin-offer-button' 
                id='left-side-button'
                onClick={() => setSignInModal(true)}
                ><span>Sign In</span></a>
                or
                <a className='signin-offer-button'><span>Open in Steamer</span></a>
            </div>
        </div>
    )

    const pageContent = (
        <div className='page-content-wrap'>
            <div className='page-content-capsule'>

                <div className='left-col-content'>
                    <div className='franchise'>
                        <span>Check out the {game.title} franchise on Steamer</span>
                    </div>
                    <div className='purchase-area'>
                        <span>Buy {game.title}</span>

                        <div className='purchase-button-capsule'>
                            <div className='price-button-wrap'>
                                <div className='show-price'>
                                    ${game.price}
                                </div>
                                <div className='add-to-cart'>
                                    <span>Add to Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='show-details'>
                        <h2 className='about-game'>About this Game</h2>
                        <span className='game-description'>{game.description}</span>
                        <h2 className='about-game' id='bottomline'></h2>
                    </div>
                </div>

                <div className='right-col-content'>
                    {!currentUser ? signUpOffer : <></>}
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className='show-carousel-content'>
                {sliderHeader}
                {slider}
                {sliderThumbnail}
            </div>
            {!currentUser ? signInInvite : <></>}
            {pageContent}
        </>
    )

}

export default GameShowPage;