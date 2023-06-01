const ADD_GAME_TO_CART = 'cart/ADD_GAME_TO_CART';
const RECEIVE_CART_GAMES = 'cart/RECEIVE_CART_GAMES';

const addGameToCart = (reference) => {
    return {
        type: ADD_GAME_TO_CART,
        reference
    }
};

const receiveCartGames = (games) => {
    return {
        type: RECEIVE_CART_GAMES,
        games
    }
}

export const getCartItems = (store) => store.cart ? Object.values(store.cart) : [];

export const fetchCartItems = () => async dispatch => {
    const res = await fetch('/api/carts'); // index route
    const cartInfo = await res.json();

    dispatch(receiveCartGames(cartInfo));
}

const cartReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CART_GAMES:
            return {...state, ...action.games}
        default:
            return state;
    }
}

export default cartReducer;