import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getReviews, receiveReviews, updateReview } from "../../../store/reviews";
import { getCurrentUser } from "../../../store/session";
import OwnerReviewRep from "./OwnerReviewRep";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const [editMode, setEditMode] = useState(false);

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
            ...OwnerReview, //be careful here
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        OwnerReview ? dispatch(updateReview(review)) : dispatch(createReview(review));
        setEditMode(false);
        setReviewBody('');
    };

    const OwnerReview = reviews.find(
        (review) => currentUser.id === review.author.id
    );

    const handleEditReview = () => {
        setEditMode(true);
        OwnerReview ? setReviewBody(OwnerReview.body) : setReviewBody('');
        OwnerReview ? setRecommended(OwnerReview.recommended) : setRecommended(null);
    };

    const ReviewForm = (
        <>
           {!editMode ? (
                <div>
                    <button onClick={handleEditReview}>Edit</button>
                </div>
            ) : (
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
                        Recommended </label>
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
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </>
    )


    const displayOwnerReview = OwnerReview && <OwnerReviewRep review={OwnerReview} />;
    
    if(!reviews) return <></>
    return (
        <>
            {ReviewForm}
        </>
    )
}

export default GameReviewForm