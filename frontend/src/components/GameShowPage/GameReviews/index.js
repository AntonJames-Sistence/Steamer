import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from "../../../store/reviews";

const GameReviewForm = () => {
    const [ reviewBody, setReviewBody ] = useState('');
    const [ recommended, setRecommended ] = useState(null);
    const { gameId } = useParams();

    const dispatch = useDispatch();


    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const review = {
            body: reviewBody,
            recommended: recommended,
            gameId: gameId
        };

        dispatch(createReview(review));
    }
    
    return (
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
    )
}

export default GameReviewForm