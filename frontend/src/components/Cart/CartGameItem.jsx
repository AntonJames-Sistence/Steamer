import { useDispatch } from 'react-redux';
import { removeGameFromCart } from '../../store/cartItems';

const CartGameItem = ( { game } ) => {
    const { id, title, price, imageUrls } = game;
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeGameFromCart(id));
    }

    return (
        <div className='game-box'>
            <a href={`/games/${id}`}>
                <div className='cart-game-img' style={{ backgroundImage: `url(${imageUrls[0]})` }}></div>
            </a>

            <div className='cart-game-details'>
                <h3 className='cart-title'>{title}</h3>

                <div className='space-between'>
                    <span className="cart-price">${price}</span>
                    <a onClick={handleRemove} className='cart-remove'>Remove</a>
                </div>
            </div>
        </div>
    )
}

export default CartGameItem;