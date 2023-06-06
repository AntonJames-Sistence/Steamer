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
            return <div className="all-reviews-review-container" key={index}>
                        <div className="review-column-holder">
                            <div className="review-left-col">
                                <div className="player-avatar">
                                </div>
                                <div className="players-name">
                                    {review.author.username}
                                </div>
                            </div>
                            <div className="review-right-col">
                                {review.body}
                            </div>
                        </div>
                    </div>;
        })
    );

    return ( reviews.length === 0 ? <></> :
        <>
            <div className="all-reviews-wrap">
                <div className="all-reviews-capsule">
                    <div className="all-reviews-statistic">
                        <div className="all-reviews-header">
                            Showing {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'} that match the filters
                        </div>
                    </div>
                    <div className="all-reviews-under-header">
                        Most Helpful Reviews
                        <span> In The Past 30 Days</span>
                    </div>
                    <div className="all-reviews-container">
                        {displayReviews}

                    </div>
                </div>
            </div>
        </>
    )
}

export default AllReviews;