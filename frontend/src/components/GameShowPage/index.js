import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, getCurrentGame } from '../../store/games';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import { fetchCartGame, fetchCartGames, getCartGames } from '../../store/cartItems';
import InfoHolder, { formatDate } from './InfoHolder';

import './GameShowPage.css'
import './carousel.css'
import './pageContent.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const GameShowPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();

    const game = useSelector(getCurrentGame);
    const cartGames = useSelector(getCartGames);
    
    const sliderRef = useRef(null);
    const [ signInModal, setSignInModal ] = useState(false);

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchGame(gameId));
        dispatch(fetchCartGames());
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

    const slider = (
        <Slider ref={sliderRef} {...settings}>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={game.imageUrls[0]} alt="" />
                    
                    <InfoHolder game={game} />
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={game.imageUrls[1]} alt="" />
                    
                    <InfoHolder game={game} />
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={game.imageUrls[2]} alt="" />
                    
                    <InfoHolder game={game} />
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={game.imageUrls[3]} alt="" />
                    
                    <InfoHolder game={game} />
                </div>
            </div>
            <div className='show-carousel-slide'>
                <div className='show-content-wrap'>
                    <img className='show-slider-img' src={game.imageUrls[4]} alt="" />
                    
                    <InfoHolder game={game} />
                </div>
            </div>
        </Slider>
    )

    const handleThumbnailHover = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const sliderThumbnail = (
        <div className="thumbnail-carousel-container">
                <div className="thumbnail-carousel">
                    <img
                        src={game.imageUrls[0]}
                        alt=""
                        onMouseEnter={() => handleThumbnailHover(0)}
                        />
                    <img
                        src={game.imageUrls[1]} 
                        alt=""
                        onMouseEnter={() => handleThumbnailHover(1)}
                        />
                    <img
                        src={game.imageUrls[2]}
                        alt=""
                        onMouseEnter={() => handleThumbnailHover(2)}
                        />
                    <img
                        src={game.imageUrls[3]}
                        alt=""
                        onMouseEnter={() => handleThumbnailHover(3)}
                        />
                    <img
                        src={game.imageUrls[4]}
                        alt=""
                        onMouseEnter={() => handleThumbnailHover(4)}
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

    // add item to cart handle
    const handleAddToCart = () => {
        if(currentUser) {
            return dispatch(fetchCartGame(game.id))
        } else {
            return setSignInModal(true)
        }
    }

    const isGameInCart = Object.values(cartGames).some(value => {
        return value.id === game.id;
    });

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
                                    { game.price !== '0.0' ? `$${game.price}` : 'Free To Play'}
                                </div>
                                <div className='add-to-cart'>

                                    { isGameInCart ? <span onClick={() => {window.location.href = '/cart';}}>In Cart</span> :
                                    <span onClick={handleAddToCart}>Add to Cart</span> }

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
                    <div className='game-details-box'>
                        <div className='.block-content'>
                            <div className='game-details-block'>
                                <b>Title:</b>
                                {game.title}
                                <br />
                                <b>Genre:</b>
                                <a href='#'>{game.genre}</a>
                                <br />
                                <b>Developer:</b>
                                <a href='#'>{game.developer}</a>
                                <br />
                                <b>Publisher:</b>
                                <a href='#'>{game.publisher}</a>
                                <br />
                                <b>Franchise:</b>
                                <a href='#'>{game.title}</a>
                                <br />
                                <b>Release date:</b>
                                {formatDate(game.releaseDate)}
                                <br />
                            </div>
                        </div>

                        <div className='buttons-block'>
                            <a href='/'>Visit the website</a>
                            <a href='/'>View update history</a>
                            <a href='/'>Read related news</a>
                            <a href='/'>View discussions</a>
                            <a href='/'>Find Community Groups</a>
                        </div>
                    </div>
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