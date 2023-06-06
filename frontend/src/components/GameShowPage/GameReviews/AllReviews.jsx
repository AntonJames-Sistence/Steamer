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

    // custom function for formating date string from backend
    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return formattedDate;
    };

    const displayReviews = (
        reviews.map((review, index) => {
            return <div className="all-reviews-review-container" key={index}>
                        <div className="all-review-rec">
                            <div className={review.recommended ? 'all-thumb-up' : 'all-thumb-down'}></div>
                            <div className="all-recommended">{review.recommended ? 'Recommended' : 'Not Recommended'}</div>
                            <img className="all-mini-logo"></img>
                        </div>
                        <div className="review-column-holder">
                            <div className="review-left-col">
                                <div className="player-avatar">
                                </div>
                                <div className="players-name">
                                    {review.author.username}
                                </div>
                            </div>
                            <div className="review-right-col">
                                <div className="right-col-top">
                                    <span>posted: {formatDate(review.createdAt)}</span>
                                    <div className="right-col-review-body">{review.body}</div>
                                </div>
                                <div className="right-col-bottom">
                                    <span>Was this review helpful?</span>
                                    <div className="votes-wrap">
                                        <div className="votes">
                                            <span>
                                                <i className="icon-thumb-up"></i>
                                                Yes
                                            </span>
                                        </div>
                                        <div className="votes">
                                            <span>
                                                <i className="icon-thumb-down"></i>
                                                No
                                            </span>
                                        </div>
                                        <div className="votes">
                                            <span>
                                                <i className="icon-funny"></i>
                                                Funny
                                            </span>
                                        </div>
                                    </div>
                                </div>
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