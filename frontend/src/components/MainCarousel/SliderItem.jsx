import { useState } from "react";

const SliderItem = ({game}) => {
    const { imageUrls, title, id, price } = game;

    const [hoveredIndex, setHoveredIndex] = useState(null);


    return (
        <div className='carousel-slide'>
                <div className='slide-content'>
                    <a href={ `/games/${id}`}>
                        <img className='carousel-img' 
                        src={hoveredIndex !== null ? imageUrls[hoveredIndex] : imageUrls[0]}
                        alt='' />
                    </a>

                    <div className='info-capsule'>
                        <div className='game-title'>{title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img
                                    className={`mini-screenshot ${hoveredIndex === 1 ? 'hovered' : ''}`}
                                    src={imageUrls[1]}
                                    alt=''
                                    onMouseEnter={() => setHoveredIndex(1)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            </div>

                            <div className='screenshot-holder'>
                                <img
                                    className={`mini-screenshot ${hoveredIndex === 2 ? 'hovered' : ''}`}
                                    src={imageUrls[2]}
                                    alt=''
                                    onMouseEnter={() => setHoveredIndex(2)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            </div>

                            <div className='screenshot-holder'>
                                <img
                                    className={`mini-screenshot ${hoveredIndex === 3 ? 'hovered' : ''}`}
                                    src={imageUrls[3]}
                                    alt=''
                                    onMouseEnter={() => setHoveredIndex(3)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            </div>

                            <div className='screenshot-holder'>
                                <img
                                    className={`mini-screenshot ${hoveredIndex === 4 ? 'hovered' : ''}`}
                                    src={imageUrls[4]}
                                    alt=''
                                    onMouseEnter={() => setHoveredIndex(4)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                />
                            </div>
                        </div>

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