import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, getCartGames } from "../../store/cart";


const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(getCartGames);

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch]);

    if(!cartItems) return (<></>)

    const eachGame = () => {
        return cartItems.map((game) => {
            return (
                <>
                    <h1>{game.title}</h1>
                    <br />
                </>
            )
        })
    }

    return (
        <>
            <h1>{eachGame()}</h1>
        </>
    )
}

export default Cart;