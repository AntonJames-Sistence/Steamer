const RECEIVE_GAME = 'games/RECEIVE_GAME';
const RECEIVE_GAMES = 'games/RECEIVE_GAMES';

const receiveGames = (games) => {
    return {
        type: RECEIVE_GAMES,
        games
    }
}
 
// ======================================================

export const getCurrentGame = ( gameId ) => (store) => {
    if (store.showGames && store.showGames[gameId]) {
        return store.showGames[gameId];
    } else {
        return null;
    }
};

export const getGames = (store) => store.showGames ? Object.values(store.showGames) : [];

// ======================================================

// export const fetchGame = (gameId) => async dispatch => {
//     const res = await fetch(`/api/games/${gameId}`);
//     const gameInfo = await res.json();

//     dispatch(receiveGame(gameInfo));
// };

export const fetchGames = () => async dispatch => {
    const res = await fetch('/api/games/');
    const gamesInfo = await res.json();

    dispatch(receiveGames(gamesInfo));
};

// ======================================================

const gamesReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_GAMES:
            return {...state, ...action.games};
        default:
            return state;
    }
}

export default gamesReducer;