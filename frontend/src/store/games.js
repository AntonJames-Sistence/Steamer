const RECEIVE_GAME = 'games/RECEIVE_GAME';
const RECEIVE_GAMES = 'games/RECEIVE_GAMES';

const receiveGame = (game) => {
    return {
        type: RECEIVE_GAME,
        game
    }
};

const receiveGames = (games) => {
    return {
        type: RECEIVE_GAMES,
        games: games
    }
}
 
// ======================================================

export const getCurrentGame = (store) => {
    if (store.showGames && store.showGames['currentGame']) {
        return store.showGames['currentGame'];
    } else {
        return null;
    }
};

export const getGames = (store) => store.games ? Object.values(store.games) : [];

// ======================================================

export const fetchGame = (gameId) => async dispatch => {
    const res = await fetch(`/api/games/${gameId}`);
    const gameInfo = await res.json();
    console.log(gameInfo)

    dispatch(receiveGame(gameInfo));
};

export const fetchGames = () => async dispatch => {
    const res = await fetch('/api/games/');
    const gamesInfo = await res.json();

    dispatch(receiveGames(gamesInfo));
};

// ======================================================

const gamesReducer = (state = {}, action) => {
    Object.freeze(state);

    const nextState = {...state}
    switch (action.type) {
        case RECEIVE_GAME:
            nextState['currentGame'] = action.game
            return nextState
        case RECEIVE_GAMES:
            return {...state, ...action.games};
        default:
            return state;
    }
}

export default gamesReducer;