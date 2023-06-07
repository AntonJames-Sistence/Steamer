import './Search.css'

const SearchItem = ({ game }) => {
    const {title, id, imageUrls, price } = game;

    return (
        <>
            <a href={`/games/${id}`} className='search-result'>
                <div className='search-img'>
                    <img src={imageUrls[0]}></img>
                </div>
                <div className='name-price-wrap'>
                    <div className='search-name'> {title} </div>
                    <div className='search-price'> {price === '0.0' ? 'Free To Play' : '$'+price} </div>
                </div>
            </a>
        </>
    )
}

export default SearchItem;