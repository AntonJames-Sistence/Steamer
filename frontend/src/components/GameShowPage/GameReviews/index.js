import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getReviews, receiveReviews, updateReview } from "../../../store/reviews";
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
    
    const OwnerReview = reviews.find(
        (review) => currentUser.id === review.author.id
    );

    console.log(showForm)

    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch, gameId]);

    // switch to false in case we have owner review on landing of the page
    useEffect(() => {
        if (reviews) {
          const OwnerReview = reviews.find((review) => currentUser.id === review.author.id);
          if (OwnerReview) setShowForm(false);
        }
    }, [reviews, currentUser.id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const review = {
            ...OwnerReview,
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        OwnerReview ? dispatch(updateReview(review)) : dispatch(createReview(review));
        setShowForm(false);
        setReviewBody('');
    };

    const handleEditReview = (e) => {
        e.preventDefault();
        setShowForm(true);
        OwnerReview ? setReviewBody(OwnerReview.body) : setReviewBody('');
        OwnerReview ? setRecommended(OwnerReview.recommended) : setRecommended(null);
    };

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
              <button onClick={() => setShowForm(false)}>Cancel</button>
        </div> 
    )

    
    // need to modify later after implementing game library
    const displayOwnerReview = OwnerReview && <OwnerReviewRep review={OwnerReview} />;
    
    

    return (
        <>
            {displayOwnerReview}
            {ReviewForm}
            <button onClick={handleEditReview}>Edit review</button>
        </>
    )
}

export default GameReviewForm