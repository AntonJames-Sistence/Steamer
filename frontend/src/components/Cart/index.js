import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartGames, getCartGames, getCartItems, removeGameFromCart } from "../../store/cartItems";


const Cart = () => {
    const dispatch = useDispatch();

    const cartGames = useSelector(getCartGames);
    // const cartItems = useSelector(getCartItems);

    useEffect(() => {
        dispatch(fetchCartGames())
    }, [dispatch]);

    if(!cartGames) return (<></>)

    const handleRemove = () => {
        dispatch();
    }

    const eachGame = () => {
        return cartGames.map((game) => {
            return (
                <div key={game.id}>
                    <h2>{game.title}</h2>
                    <button onClick={handleRemove}>remove</button>
                </div>
                // <></>
            )
        })
    }

    return (
        <>
            <div>{eachGame()}</div>
            
        </>
    )
}

export default Cart;