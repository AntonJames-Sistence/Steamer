import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartGames, getCartGames, getCartItems, removeGameFromCart } from "../../store/cartItems";

import './Cart.css'
import CartGame from "../cartGame";


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
            return (
                <>
                    <CartGame game={game} />
                </>
            )
        })
    }

    return (
        <>
            <div className="temp">{eachGame()}</div>
            
        </>
    )
}

export default Cart;