import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews, receiveReviews } from "../../../store/reviews";

const AllReviews = () => {
    const { gameId } = useParams();
    const reviews = useSelector(getReviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveReviews(gameId));
    }, [dispatch]);

    const displayReviews = (
        reviews.map((review) => {
            return <div>{review.body}</div>
        })
    )   

    return (
        <>
            <div className="all-reviews-container">{displayReviews}</div>
        </>
    )
}

export default AllReviews;