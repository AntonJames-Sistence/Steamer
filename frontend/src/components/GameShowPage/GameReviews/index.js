import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, deleteReview, getReviews, receiveReviews } from "../../../store/reviews";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const { gameId } = useParams();
    const reviews = useSelector(getReviews);

    const dispatch = useDispatch();
    
    console.log(reviews)
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

    const handleRemoveReview = (e) => {
        e.preventDefault();

        

        // dispatch(deleteReview(???));
    }

    const displayReviews = (
        <>
            <ul>
                {}
            </ul>
        </>
    )
    
    return (
        <>
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
            {/* <button onClick={handleRemoveReview}>remove</button> */}
        </>
    )
}

export default GameReviewForm