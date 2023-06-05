import csrfFetch from "./csrf";

const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

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

export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/games/${review.gameId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });
    const data = await res.json();
    console.log(data)

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