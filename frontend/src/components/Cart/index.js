import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, getGamesIdFromCart } from "../../store/cart";


const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(getGamesIdFromCart);

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch]);

    if(!cartItems) return (<></>)
    return (
        <>
            <h1></h1>
        </>
    )
}

export default Cart;