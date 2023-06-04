// helper method to parse date
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const InfoHolder = ({ game }) => {
    const { imageUrls, releaseDate, developer, publisher, genre } = game;

    return (
        <div className='info-holder'>

            <div>
                <img className='show-header-img' src={imageUrls[0]} alt="" />
            </div>

            <div className='show-game-description'>
                {game.details}
            </div>

            <div className='dev-pub-info'>
                <div className='release-date'>
                    <div>Release Date:</div>
                    <div className='show-date'>{formatDate(releaseDate)}</div>
                </div>
                <div className='developer'>
                    <div>Developer:</div>
                    <div className='show-developer'>{developer}</div>
                </div>
                <div className='publisher'>
                    <div>Publisher:</div>
                    <div className='show-publisher'>{publisher}</div>
                </div>
            </div>

            <div className='show-genre'>
                <div className='show-tags'>Popular user-defined tags for this product:</div>
                <div className='show-tags-data'>
                    <a className='show-tags-links' href='#'>{genre}</a>
                </div>
            </div>

        </div>
    )

}

export default InfoHolder;