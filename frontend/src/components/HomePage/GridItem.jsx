import { Link } from "react-router-dom";


const GridItem = ({ game }) => {
    const {id, title, imageUrls, price, details} = game;

    return (
        <Link to={`/games/${id}`}>
            <div className="grid-item-capsule">
                <div className="grid-item-img">
                    <img src={imageUrls[0]}></img>

                    <div className="grid-item-left-column">
                        <div className="grid-item-title">
                            {title}
                        </div>
                        <div className="grid-item-info">
                            {details}
                        </div>
                    </div>

                </div>

                <div className="grid-item-price">
                    {price === '0.0' ? 'Free To Play' : `$${price}`}
                </div>

            </div>
        </Link>
    )
}

export default GridItem;