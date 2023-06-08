const RECEIVE_CATEGORY = 'category/RECEIVE_CATEGORY';

const receiveCategory = (categoryGames) => {
    return {
        type: RECEIVE_CATEGORY,
        categoryGames
    }
};

// ======================================================

export const getCategoryGames = (store) => {
    if(store.category) {
        return Object.values(store.category);
    } else {
        return [];
    }
}

// ======================================================

export const fetchCategoryGame = (category) => async dispatch => {
    const res = await fetch(`/api/search?category=${encodeURIComponent(category)}`);
    const data = await res.json();

    dispatch(receiveCategory(data));
}

// ======================================================

const categoryReducer = (state = {}, action) => {
    Object.freeze(state);

    // const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CATEGORY:
            return {...action.categoryGames}
            // return {...state, ...action.categoryGames}
        default:
            return state;
    }
}

export default categoryReducer;