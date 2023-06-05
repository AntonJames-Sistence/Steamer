import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getReviews, receiveReviews } from "../../../store/reviews";
import { getCurrentUser } from "../../../store/session";
import OwnerReviewRep from "./OwnerReviewRep";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch])

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const review = {
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        dispatch(createReview(review));
    }

    const handleEditReview = () => {
        
        // dispatch(deleteReview(???));
    }

    const ReviewForm = (
        <div className="review-form-box">
            <form onSubmit={handleReviewSubmit}>
                <textarea
                value={reviewBody}
                onChange={e=>setReviewBody(e.target.value)}
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
            <button onClick={handleEditReview}>edit</button>
        </div>
    )

    const OwnerReview = reviews.find(
        (review) => currentUser.id === review.author.id
    );

    const displayOwnerReview = OwnerReview && <OwnerReviewRep review={OwnerReview} />;
    
    if(!reviews) return <></>
    return (
        <>{displayOwnerReview || ReviewForm}</>
    )
}

export default GameReviewForm