import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, deleteReview, getReviews, receiveReviews, updateReview } from "../../../store/reviews";
import { getCurrentUser } from "../../../store/session";
import { getCurrentGame, getGames } from "../../../store/games";
import './OwnerReview.css'
import { formatDate } from "./AllReviews";
import { Link } from "react-router-dom";
import { scrollTo } from "..";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [errors, setErrors] = useState([]);

    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const currentGame = useSelector(getCurrentGame(gameId));
    const dispatch = useDispatch();
    
    const ownerReview = reviews.find(review => currentUser.id === review.author.id);

    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch, gameId]);

    // switch to false in case we have owner review on landing of the page
    useEffect(() => {
        
        ownerReview ? setShowForm(false) : setShowForm(true);
        
    }, [reviews, currentUser.id, gameId]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        if (reviewBody.trim() === '') {
            setErrors(prevMessages => [...prevMessages, 'Please leave your comment.']);
        };

        if (recommended === null) {
            setErrors(prevMessages => [...prevMessages, 'Do you recommend this game?']);
        };

        const review = {
            ...ownerReview,
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        if (ownerReview) {
            dispatch(updateReview(review))
              .then(() => {
                setShowForm(false);
                setReviewBody('');
              })
              .catch((error) => {
              });
          } else {
            dispatch(createReview(review))
              .then(() => {
                setShowForm(false);
                setReviewBody('');
              })
              .catch((error) => {
              });
          }      
    };

    const getErrorByField = (field) => {
        return errors.find((error) => error.includes(field));
    };

    const handleEditReview = (e) => {
        e.preventDefault();
        setShowForm(true);
        ownerReview ? setReviewBody(ownerReview.body) : setReviewBody('');
        ownerReview ? setRecommended(ownerReview.recommended) : setRecommended(null);
    };

    const handleDeleteReview = (e) => {
        e.preventDefault();
        
        dispatch(deleteReview(ownerReview.id));
        setReviewBody('');
        setRecommended(null);
    }

    const renderOwnerReview = ownerReview && (
        <div className='review-form-wrap' id="review-form-wrap">
            <div className='review-form-capsule'>
                <div className='owner-review-header-capsule'>
                    <div className='actions-holder'>
                        <Link to={`/category/All`} className="install-play-button">Browse More</Link>
                        <Link to='/' className="install-play-button">To Main</Link>
                    </div>
                    <div className='review-offer'>You reviewed this game on {formatDate(ownerReview.createdAt)}</div>
                    <p className='review-rules'></p>
                </div>

                <a onClick={()=>{scrollTo('all-reviews')}} className="view-owner-review">View your review</a>

                <div className="icon-body-holder">
                    <div className={ownerReview.recommended ? "all-thumb-up" : "all-thumb-down"}></div>
                    <div className="owner-review-body">{ownerReview.body}</div>
                </div>

                <div className="flex-end">
                    <button className="submit-post" onClick={handleEditReview}>Edit your review</button>
                </div>
            </div>
        </div>
    )

    const ReviewForm = showForm && (
        <div className="review-form-wrap" id="review-form-wrap">
            <div className="review-form-capsule">
                <div className="review-form-header-capsule">
                    <div className="actions-holder">
                        <Link to={`/category/All`} className="install-play-button">Browse More</Link>
                        <Link to='/' className="install-play-button">To Main</Link>
                    </div>
                    <div className="review-offer">Write a review for {currentGame.title}</div>
                    <p className="review-rules">
                        Please describe what you liked or disliked about this game and whether you recommend it to others.<br/>
                        Please remember to be polite and follow the
                    </p>
                </div>
                <div className="form-avatar-capsule">
                    <div className="review-avatar-capsule">
                        <img className="avatar-img"></img>
                    </div>
                    
                    <form onSubmit={handleReviewSubmit}>

                        <textarea
                            className={ getErrorByField('comment') ? 'body-data-error' : 'body-data'}
                            value={reviewBody}
                            onChange={(e) => setReviewBody(e.target.value)}
                        />
                        {getErrorByField('comment') ? <div className="review-errors">{getErrorByField('comment')}</div> : <div className="review-error-place-holder"></div>}

                        <div className={getErrorByField('recommend') ? 'review-errors' : 'form-rec-question'}>Do you recommend this game?</div>

                        <div className="flex-box">
                            <div className="like-dislike-capsule">
                                
                                
                                <a className={recommended === true ? 'true-like-active' : 'true-like'} onClick={() => setRecommended(true)}>
                                    <span className="true-like-span">
                                        <i className={recommended === true ? 'true-thumb-up-active' : 'true-thumb-up'}></i> 
                                        Yes
                                    </span>
                                </a>

                                <a className={recommended === false ? 'true-dislike-active' : 'true-like'} onClick={() => setRecommended(false)}>
                                    <span className="true-like-span">
                                        <i className={recommended === false ? 'true-thumb-down-active' : 'true-thumb-down'}></i> 
                                        No
                                    </span>
                                </a>

                            </div>

                            <div className="review-buttons-capsule">
                                <button className="submit-post">{ownerReview ? 'Update Review' : 'Post Review'}</button>
                                {ownerReview ? <button className="submit-post" onClick={() => setShowForm(false)}>Cancel</button> : <></>}
                                {ownerReview ? <button className="submit-post" onClick={handleDeleteReview}>Delete Review</button> : <></>}
                            </div>
                        </div>

                    </form>
                    
              </div>
            </div>
        </div> 
    )

    return (
        <>
            {!showForm && renderOwnerReview}
            {ReviewForm}
        </>
    )
}

export default GameReviewForm