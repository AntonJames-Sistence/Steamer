import { useState } from "react";
import { Link } from "react-router-dom";

const SliderItem = ({game}) => {
    const { imageUrls, title, id, price } = game;

    const [hoveredIndex, setHoveredIndex] = useState(null);


    return (
        <div className='carousel-slide'>
                <div className='slide-content'>
                    <Link to={ `/games/${id}`}>
                        <img className='carousel-img' 
                        src={hoveredIndex !== null ? imageUrls[hoveredIndex] : imageUrls[0]}
                        alt='' />
                    </Link>

                    <div className='info-capsule'>
                        <div className='game-title'>{title}</div>

                        <Link to={`/games/${id}`}>
                        <div className='screenshots'>
                            {imageUrls.slice(1, 5).map((imageUrl, index) => (
                                <div className='screenshot-holder' key={index}>
                                    <img
                                        className={`mini-screenshot ${hoveredIndex === index + 1 ? 'hovered' : ''}`}
                                        src={imageUrl}
                                        alt=''
                                        onMouseEnter={() => setHoveredIndex(index + 1)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    />
                                </div>
                            ))}
                        </div>
                        </Link>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className="top-seller-icon-wrap">
                            <div className='top-seller-icon'>Top Seller</div>
                        </div>

                        <div className='price'>{price === '0.0' ? 'Free to Play' :'$' + price }</div>
                    </div>
                </div>
        </div>
    )
}

export default SliderItem;