import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, getCurrentGame } from '../../store/games';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import { fetchCartGame, fetchCartGames, getCartGames } from '../../store/cartItems';
import InfoHolder, { formatDate } from './InfoHolder';

import './GameShowPage.css'
import './carousel.css'
import './pageContent.css'
import './GameReviews/GameReviews.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GameReviewForm from './GameReviews';
import AllReviews from './GameReviews/AllReviews';
import { getCurrentUser } from '../../store/session';
import { Link } from 'react-router-dom';

export const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const GameShowPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const currentUser = useSelector(getCurrentUser);

    useEffect(() => {
        dispatch(fetchCartGames());
        window.scrollTo(0, 0);
        dispatch(fetchGames());
    }, [dispatch, gameId]);

    const cartGames = useSelector(getCartGames);
    const game = useSelector(getCurrentGame(gameId));
    
    const sliderRef = useRef(null);
    const [ showPageSignInModal, showPageSetSignInModal ] = useState(false);

    if (!game) return (<></>) // prevents bug when code executing too fast

    const settings = {
        // Main carousel settings
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        pauseOnHover: false,
    };

    const slider = (
        <Slider ref={sliderRef} {...settings}>
        {game.imageUrls.map((imageUrl, index) => (
          <div className="show-carousel-slide" key={index}>
            <div className="show-content-wrap">

              <img className="show-slider-img" 
              src={imageUrl} 
              alt="" />

              <InfoHolder game={game} />

            </div>
          </div>
        ))}
      </Slider>
    )

    const handleThumbnailHover = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const sliderThumbnail = (
        <div className="thumbnail-carousel-container">
            <div className="thumbnail-carousel">
                {game.imageUrls.map((imageUrl, index) => (
                <img
                    src={imageUrl}
                    alt=""
                    key={index}
                    onMouseEnter={() => handleThumbnailHover(index)}
                />
                ))}
            </div>
        </div>
    )

    const sliderHeader = (
        <div className='slider-header-wrap'>
            <div className='slide-header-links'>
                <Link to='/category/All'>All Games</Link>
                {' > '}
                <Link to={`/category/${game.genre}`}>{game.genre} Games</Link>
                {' > '}
                <span>{game.title}</span>
            </div>
            <div className='title-wrap'>
                <div className='show-game-title'>{game.title}</div>
                <div>
                    <a href='https://github.com/AntonJames-Sistence' target='_blanc' className='community-hub'><span>Community Hub</span></a>
                </div>
            </div>
        </div>
    )

    const signInInvite = (
        <div className='invite-capsule'>
            <div><a className='login-invite-link' onClick={() => showPageSetSignInModal(true)}>Sign in</a> to add this item to your wishlist, follow it, or mark it as ignored</div>
            {showPageSignInModal && (
                <Modal onClose={() => showPageSetSignInModal(false)}>
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
                onClick={() => showPageSetSignInModal(true)}
                ><span>Sign In</span></a>
                or
                <a className='signin-offer-button'><span>Open in Steamer</span></a>
            </div>
        </div>
    )

    // add item to cart handle
    const handleAddToCart = () => {
        if(currentUser) {
            dispatch(fetchCartGame(game.id))
        } else {
            showPageSetSignInModal(true)
        }
    };

    const isGameInCart = Object.values(cartGames).some(value => {
        return value.id === game.id;
    });

    const pageContent = (
        <div className='page-content-wrap'>
            <div className='page-content-capsule'>

                <div className='left-col-content'>
                    <div className='franchise'>
                        <Link to={`/category/${game.genre}`}>Check out more games like {game.title} on Steamer</Link>
                    </div>
                    <div className='purchase-area'>
                        <span>Buy {game.title}</span>

                        <div className='purchase-button-capsule'>
                            <div className='price-button-wrap'>
                                <div className='show-price'>
                                    { game.price !== '0.0' ? `$${game.price}` : 'Free To Play'}
                                </div>
                                <div className='add-to-cart'>

                                    { isGameInCart ? <Link to='/cart'>In Cart</Link> 
                                    :
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
                                <a>{game.genre}</a>
                                <br />
                                <b>Developer:</b>
                                <a>{game.developer}</a>
                                <br />
                                <b>Publisher:</b>
                                <a>{game.publisher}</a>
                                <br />
                                <b>Franchise:</b>
                                <a>{game.title}</a>
                                <br />
                                <b>Release date:</b>
                                {formatDate(game.releaseDate)}
                                <br />
                            </div>
                        </div>

                        <div className='buttons-block'>
                            <Link to={`/category/All`}>More games</Link>
                            <Link to={`/category/${game.genre}`}>View similar games</Link>
                            <a onClick={() => scrollTo('all-reviews')}>View reviews</a>
                            <Link to='/'>Home page</Link>
                            <Link to={`/games/${getRandomNumber(1, 8)}`}>Best seller game</Link>
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
            {/* this has to be modified after implementing library */}
            {currentUser ? <GameReviewForm /> : <></>} 
            {pageContent}
            <AllReviews />
        </>
    )

}

export default GameShowPage;