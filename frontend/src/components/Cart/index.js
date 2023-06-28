import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartGames, getCartGames, removeGameFromCart, removeGamesFromCart } from "../../store/cartItems";
import CartGameItem from "./CartGameItem";

import './Cart.css'
import './cartCheckout.css'
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();

    const cartGames = useSelector(getCartGames);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(fetchCartGames())
    }, [dispatch]);

    if(!cartGames) return (<></>)

    const eachGame = () => {
        return cartGames.map((game) => {
            return <CartGameItem game={game} key={game.id} />
        })
    }

    const getTotal = () => {
        const total = cartGames.reduce((total, game) => total + parseFloat(game.price), 0);
        return total.toFixed(2);
    };

    const handleCleanCart = () => {
        // cartGames.forEach((game) => {dispatch(removeGameFromCart(game.id))})
        dispatch(removeGamesFromCart())
    }
    const removeAll = (
        <div className="remove-all-wrap">
            <div className="remove-all-capsule">
                <a onClick={handleCleanCart} className="cart-remove">Remove all items</a>
            </div>
        </div>
    )

    const cartCheckout = (
        <div className="cart-checkout-area-wrap">

            <div className="cart-checkout-area">
                <div className="cart-estimated-holder">
                    <span>Estimated total</span>
                    <div>${getTotal()}</div>
                </div>

                <div className="checkout-span">Is this a purchase for yourself or is it a gift? Select one to continue to checkout.</div>

                <div className="cart-checkout-buttons-capsule">
                    <a onClick={handleCleanCart} className="cart-checkout-buttons">Purchase for myself</a>
                    <a onClick={handleCleanCart} className="cart-checkout-buttons">Purchase as a gift</a>
                </div>
            </div>
            
        </div>
    )

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

            {cartGames.length === 0 ? <></> : removeAll}
            {cartGames.length === 0 ? <></> : cartCheckout}
            <div className="continue-shopping-capsule">
                <div className="continue-shopping-wrap">
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            </div>
        </>
    )
}

export default Cart;