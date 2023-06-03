import { useDispatch } from 'react-redux';
import { removeGameFromCart } from '../../store/cartItems';
import './CartGame.css'

const CartGame = ( { game } ) => {
    const { id, title, price } = game;
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeGameFromCart(id));
    }

    return (
        <div className='box'>
            <h2>{title}</h2>
            <span className="details">${price}</span>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}

export default CartGame;