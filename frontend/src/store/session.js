import csrfFetch from "./csrf";

// ========================== POJO action creators ==========================

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    };
};

// ========================== Thunks ==========================

export const login = (userLogPass) => async (dispatch) => {

    // fetch request to DB with modifications using - csrfFetch - method
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify(userLogPass)
    });
    const sessionObject = await response.json();

    // dispatch to get POJO and initialize reducer
    dispatch(setCurrentUser(sessionObject.user));

    // return in case of chaining more logic
    return response;
};

// ========================== Session Reducer ==========================

// session reducer takes default user state as null, in case app doesn't have logged in user
const sessionReducer = (state = { user: null }, action) => {
    // good practice
    Object.freeze(state);

    const nextState = { ...state };

    switch (action.type) {

        case SET_CURRENT_USER:
            nextState['user'] = action.payload;
            return nextState;

        case REMOVE_CURRENT_USER:
            nextState['user'] = null;
            return nextState;

        default:
            return nextState;
    };
};

export default sessionReducer;