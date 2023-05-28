import csrfFetch from "./csrf";

// ========================== POJO action creators ==============================

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

// ========================== Thunks and helper methods ==========================

//                      ======== restore session ========
// logic for storing currentUser
const storeCurrentUser = (user) => {
    // - seItem - and - removeItem - provided by sessionStorage 
    // if else logic prevents setting currentUser to null value
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user)) 
    } else {
        sessionStorage.removeItem("currentUser")
    };
};

// logic for storing X-CSRF-Token
const storeCSRFToken = (response) => {
    // taking X-CSRF-Token from header object of the response
    const csrfToken = response.headers.get("X-CSRF-Token");

    // if token exists saves it in sessionStorage in browser
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

export const restoreSession = () => async (dispatch) => {
    // request info about current session user from backend
    const response = await csrfFetch('/api/session');
    // store token inside browser
    storeCSRFToken(response);
    
    // gets session: { user: ...} object with user inside
    const data = await response.json();
    // helper method to store current user in browser storage
    storeCurrentUser(data.user);

    // dispatching user to action
    dispatch(setCurrentUser(data.user));

    // return in case of chaining more logic
    return response;
};

//                      ======== login thunk ========

export const login = (userLogPass) => async (dispatch) => {

    // fetch request to DB with modifications using - csrfFetch - method
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify(userLogPass)
    });
    const sessionObject = await response.json();

    // helper method to store current user in browser storage
    storeCurrentUser(sessionObject.user);

    // dispatch to get POJO and initialize reducer
    dispatch(setCurrentUser(sessionObject.user));

    // return in case of chaining more logic
    return response;
};

// ========================== Session Reducer ==========================

// session reducer takes initial state, in case app havs logged in user
const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
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