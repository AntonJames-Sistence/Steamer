

const GridItem = ({ game }) => {
    const {id, title, imageUrls, price, details} = game;

    return (
        <a href={`/games/${id}`}>
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
        </a>
    )
}

export default GridItem;