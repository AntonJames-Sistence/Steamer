import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, deleteReview, getReviews, receiveReviews, updateReview } from "../../../store/reviews";
import { getCurrentUser } from "../../../store/session";
import OwnerReviewRep from "./OwnerReviewRep";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
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
        <div className="review-form-box">
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
              </form>
              {ownerReview ? <button onClick={() => setShowForm(false)}>Cancel</button> : <></>}
              {ownerReview ? <button onClick={handleDeleteReview}>Delete</button> : <></>}
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