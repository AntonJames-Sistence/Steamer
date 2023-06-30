import { useDispatch } from 'react-redux';
import { removeGameFromCart } from '../../store/cartItems';
import { Link } from 'react-router-dom';

const CartGameItem = ( { game } ) => {
    const { id, title, price, imageUrls } = game;
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeGameFromCart(id));
    }

    return (
        <div className='game-box'>
            <Link className='game-box-link' to={`/games/${id}`}>
                <div className='cart-game-img' style={{ backgroundImage: `url(${imageUrls[0]})` }}></div>
            </Link>

            <div className='cart-game-details'>
            <Link to={`/games/${id}`}>
                <div className='cart-title'>{title}</div>
                </Link>
                <div className='space-between'>
                    <span className="cart-price">{price === '0.0' ? <></> : '$' + price }</span>
                    <a onClick={handleRemove} className='cart-remove'>Remove</a>
                </div>
            </div>
        </div>
    )
}

export default CartGameItem;