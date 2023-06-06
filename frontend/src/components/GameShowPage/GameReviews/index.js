import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, deleteReview, getReviews, receiveReviews, updateReview } from "../../../store/reviews";
import { getCurrentUser } from "../../../store/session";
import OwnerReviewRep from "./OwnerReviewRep";
import { getCurrentGame } from "../../../store/games";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const currentGame = useSelector(getCurrentGame);
    const dispatch = useDispatch();
    
    const ownerReview = reviews.find(
        (review) => currentUser.id === review.author.id
    );


    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch, gameId]);

    // switch to false in case we have owner review on landing of the page
    useEffect(() => {
        if (reviews) {
          const ownerReview = reviews.find((review) => currentUser.id === review.author.id);
          if (ownerReview) setShowForm(false);
        }
    }, [reviews, currentUser.id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const review = {
            ...ownerReview,
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        ownerReview ? dispatch(updateReview(review)) : dispatch(createReview(review));
        setShowForm(false);
        setReviewBody('');
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

    const ReviewForm = showForm && (
        <div className="review-form-wrap">
            <div className="review-form-capsule">
                <div className="review-form-header-capsule">
                    <div className="actions-holder">
                        <div className="install-play-button">Install Steamer</div>
                        <div className="install-play-button">Play Now</div>
                    </div>
                    <div className="review-offer">Write a review for {currentGame.title}</div>
                    <p className="review-rules">
                        Please describe what you liked or disliked about this game and whether you recommend it to others.<br/>
                        Please remember to be polite and follow the
                    </p>
                </div>
                <div className="review-form-body-capsule">
                    <form onSubmit={handleReviewSubmit}>
                        <textarea
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                        />
            
                        <label>
                        <input
                            type="radio"
                            value={true}
                            checked={recommended === true}
                            onChange={() => setRecommended(true)}
                        />
                        Recommended

                        </label>
                        <label>
                        <input
                            type="radio"
                            value={false}
                            checked={recommended === false}
                            onChange={() => setRecommended(false)}
                        />
                        Not Recommended

                        </label>
                        <button>Submit</button>
                        {ownerReview ? <button onClick={() => setShowForm(false)}>Cancel</button> : <></>}
                        {ownerReview ? <button onClick={handleDeleteReview}>Delete</button> : <></>}
                    </form>
              </div>
            </div>
        </div> 
    )

    
    // need to modify later after implementing game library
    const displayownerReview = ownerReview && <OwnerReviewRep review={ownerReview} />;
    

    return (
        <>
            {/* {!showForm ? <OwnerReviewRep review={ownerReview} /> : <></>} */}
            {!showForm ? displayownerReview : <></>}
            {ReviewForm}
            {ownerReview && !showForm ? <button onClick={handleEditReview}>Edit review</button> : <></>}
        </>
    )
}

export default GameReviewForm