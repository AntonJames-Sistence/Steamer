const SliderItem = ({game}) => {
    const { imageUrls, title, id, price } = game

    return (
        <div className='carousel-slide'>
                <div className='slide-content'>
                    <a href={ `/games/${id}`}>
                        <img className='carousel-img' src={imageUrls[0]} alt='' />
                    </a>
                    <div className='info-capsule'>
                        <div className='game-title'>{title}</div>

                        <div className='screenshots'>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={imageUrls[1]} alt=''/>
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={imageUrls[2]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={imageUrls[3]} alt='' />
                            </div>
                            <div className='screenshot-holder'>
                                <img className='mini-screenshot' src={imageUrls[4]} alt='' />
                            </div>
                        </div>

                        <div className='avaliability'>Now Avaliable</div>

                        <div className='top-seller-icon'>Top Seller</div>

                        <div className='price'>{price === '0.0' ? 'Free to Play' : price }</div>
                    </div>
                </div>
        </div>
    )
}

export default SliderItem;