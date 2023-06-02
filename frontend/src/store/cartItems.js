import csrfFetch from "./csrf";

const ADD_GAME_TO_CART = 'cart/ADD_GAME_TO_CART';
const RECEIVE_CART_GAMES = 'cart/RECEIVE_CART_GAMES';
const REMOVE_CART_GAME = 'cart/REMOVE_CART_GAME';

const addGameToCart = (game) => {
    return {
        type: ADD_GAME_TO_CART,
        game
    }
};

const receiveCartGames = (payload) => {
    return {
        type: RECEIVE_CART_GAMES,
        payload: payload
    }
};

const removeCartGame = (cartItemId) => {
    return {
        type: REMOVE_CART_GAME,
        cartItemId
    }
}

// =====================================================================

export const getCartGames = (store) => {
    if(store.cart) {
        return Object.values(store.cart);
    } else {
        return [];
    }
};

// export const getCartItems = (store) => {
//     if(store.cart.cartItems) {
//         return Object.values(store.cart.cartItems);
//     } else {
//         return [];
//     }
// };

// // helper func to get only array with games ids
// export const getGamesIdFromCart = state => {
//     const cartItems = state.cart;
//     return Object.values(cartItems).map(item => item.gameId);
// };


export const fetchCartGames = () => async dispatch => {
    const res = await fetch('/api/cart_items'); // index route
    const cartItems = await res.json();

    dispatch(receiveCartGames(cartItems));
}

export const fetchCartGame = (gameId) => async dispatch => {
    const res = await csrfFetch('/api/cart_items', {
        method: 'POST',
        body: JSON.stringify({cart_item: {gameId: gameId}}) // ensure strong params
    });
    const data = await res.json();
    console.log(data) // delete this

    dispatch(addGameToCart(data));
}

export const removeGameFromCart = (cartItemId) => async dispatch => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: 'DELETE'
    });
    
    dispatch(removeCartGame(cartItemId));
}

// =====================================================================

const cartItemsReducer = (state = {}, action) => {
    Object.freeze(state);

    
    switch (action.type) {
        case RECEIVE_CART_GAMES:
            return {...state, ...action.payload.games }
        case ADD_GAME_TO_CART:
            return {...state, ...action.game}
        case REMOVE_CART_GAME:
            const nextState = {...state}
            delete nextState[action.cartItemId];
            return nextState;
        default:
            return state;
    }
}

export default cartItemsReducer;