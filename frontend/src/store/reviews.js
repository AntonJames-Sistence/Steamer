import csrfFetch from "./csrf";

const ADD_REVIEW = "reviews/ADD_REVIEW";

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/games/${review.gameId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });
    const data = await res.json();
    console.log(data); // <- delete later

    dispatch(addReview(data));
};

const reviewsReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = {...state};
    switch (action.type) {
        case ADD_REVIEW:
            return { ...state, ...action.review }
        default:
            return state;
    }
}

export default reviewsReducer;