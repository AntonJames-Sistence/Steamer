import { Link } from "react-router-dom";

const CategoryItem = ({ game }) => {

const { id, title, price, imageUrls } = game

    return (
        <Link to={`/games/${id}`}>
            <div className="category-item-holder">
                <div className="category-item-img">
                    <img src={imageUrls[0]}></img>
                </div>

                <div className="category-item-info-holder">
                    <div className="category-item-info">
                        <div className="category-item-title">{title}</div>
                        <div className="category-item-price">{price === '0.0' ? 'Free To Play' : `$${price}`}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CategoryItem;