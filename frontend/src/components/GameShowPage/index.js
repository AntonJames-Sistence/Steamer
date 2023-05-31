import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, getGame } from '../../store/games';

const GameShowPage = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector(getGame(gameId));

    useEffect(() => {
        dispatch(fetchGame(gameId))
    }, [dispatch, gameId]);

    return (
        <>
            <h1>{game.title}</h1>
        </>
    )

}

export default GameShowPage;