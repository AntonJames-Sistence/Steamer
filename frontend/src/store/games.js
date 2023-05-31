const RECEIVE_GAME = 'games/RECEIVE_GAME';
const RECEIVE_GAMES = 'games/RECEIVE_GAMES';

const receiveGame = (game) => {
    return {
        type: RECEIVE_GAME,
        payload: game
    }
};

const receiveGames = (games) => {
    return {
        type: RECEIVE_GAMES,
        games: games
    }
}
 
// ======================================================

export const getGame = (gameId) => (store) => {
    if (store.games && store.games[gameId]) {
        return store.games[gameId];
    } else {
        return null;
    }
};

export const getGames = (store) => store.games ? Object.values(store.games) : [];

// ======================================================

export const fetchGame = (gameId) => async dispatch => {
    const res = await fetch(`/api/games/${gameId}`);
    const gameInfo = await res.json();

    dispatch(receiveGame(gameInfo));
};

export const fetchGames = () => async dispatch => {
    const res = await fetch('/api/games/');
    const gamesInfo = await res.json();
    console.log(gamesInfo)

    dispatch(receiveGames(gamesInfo));
};

// ======================================================

const gamesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_GAME:
            return {...state, ...action.payload};
        case RECEIVE_GAMES:
            return {...state, ...action.games};
        default:
            return state;
    }
}

export default gamesReducer;