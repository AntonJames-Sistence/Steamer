import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews, receiveReviews } from "../../../store/reviews";
import './AllReviews.css'

const AllReviews = () => {
    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch]);

    const displayReviews = (
        reviews.map((review, index) => {
            return <div key={index}>{review.body}</div>;
        })
    );

    return ( reviews.length === 0 ? <></> :
        <>
            <div className="all-reviews-wrap">
                <div className="all-reviews-capsule">
                    <div className="all-review-statistic">
                        <div>Showing {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'} that match the filters</div>
                    </div>
                    <div className="all-reviews-review-container">{displayReviews}
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllReviews;