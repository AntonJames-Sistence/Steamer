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
            <div className="cart-header-capsule-wrap">
                <div className="cart-header-capsule">
                    <div className="cart-nav-links">
                        <a href="/">All Products</a>
                        <span> {' > '} Your Shopping Cart</span>
                    </div>
                    
                <h2 className="cart-title-header">Your Shopping Cart</h2>
                
                <div className="cart-bg-holder"></div>
            </div>
            </div>
            <div className="cart-games-list-capsule">
                <div className="cart-games-list">{eachGame()}</div>
            </div>
        </>
    )
}

export default Cart;