import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartGames, getCartGames } from "../../store/cartItems";

import './Cart.css'
import CartGameItem from "./CartGameItem";


const Cart = () => {
    const dispatch = useDispatch();

    const cartGames = useSelector(getCartGames);
    // const cartItems = useSelector(getCartItems);

    useEffect(() => {
        dispatch(fetchCartGames())
    }, [dispatch]);

    if(!cartGames) return (<></>)

    const eachGame = () => {
        return cartGames.map((game) => {
            return <CartGameItem game={game} key={game.id} />
        })
    }

    return (
        <>
            <div className="temp">{eachGame()}</div>
        </>
    )
}

export default Cart;