import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartGames, getCartGames } from '../../store/cartItems';
import './StoreNavBar.css'
import SearchItem from './SearchItem';

const StoreNavBar = () => {
    const currentUser = useSelector(state => state.session.user);
    const cartItems = useSelector(getCartGames);
    const dispatch = useDispatch();
    
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(fetchCartGames());
        handleSearch(search);
    }, [dispatch, search]);

    const handleSearch = async (query) => {
        try {
          const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
          const data = await res.json();
          console.log(data)
          setSearchResults(data);
        } catch (error) {
          console.error('Error searching:', error);
        }
      };

    return (
        <div className='nav-wrap-container'>
            <div className='nav-wrap'>

                { currentUser ? <a href='/cart' className='cart-button'>cart({cartItems.length})</a> : <div id='space-holder'></div>}
                
                <div className="store-nav-bg">

                    <div className="store-nav">
                        <div className='store-nav-tab-wrap'>
                            <a href='/'>
                                <div className="store-nav-tab" id='fst-child'>Your Store</div>
                            </a>
                            <a href='/games/2'>
                                <div className="store-nav-tab">New & Noteworthy</div>
                            </a>
                            <div className="store-nav-tab">Categories</div>
                            <div className="store-nav-tab">News</div>
                        </div>

                        <div className="searchbox">
                            <input
                            className="store-search-input"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            placeholder='search'
                            />
                        </div>
                    </div>

                </div>

                {searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map((result) => (
                            <SearchItem game={result} />
                        ))}
                    </div>
                )}

            </div>
            
        </div>
    )
}

export default StoreNavBar;