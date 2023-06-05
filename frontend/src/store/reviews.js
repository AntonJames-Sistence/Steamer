import csrfFetch from "./csrf";

const ADD_REVIEWS = "reviews/ADD_REVIEWS"; // might be different in path
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const addReviews = (reviews) => {
    return {
        type: ADD_REVIEWS,
        reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    };
};

export const getReviews = (store) => {
    if (store.reviews) {
        return Object.values(store.reviews);
    } else {
        return [];
    };
};

export const receiveReviews = (gameId) => async (dispatch) => {
    const res = await fetch(`/api/games/${gameId}/reviews`);
    const data = await res.json();

    dispatch(addReviews(data));
};


export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/games/${review.gameId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });
    const data = await res.json();

    dispatch(addReview(data));
};

export const deleteReview = (reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      });
    
    dispatch(removeReview(reviewId));
};

const reviewsReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = {...state};
    switch (action.type) {
        case ADD_REVIEWS:
            return {...state, ...action.reviews}
        case ADD_REVIEW:
            nextState[action.review.id] = action.review
            return nextState
        case REMOVE_REVIEW:
            delete nextState[action.reviewId]
            return nextState
        default:
            return state;
    }
}

export default reviewsReducer;