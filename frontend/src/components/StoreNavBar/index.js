import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchCartGames, getCartGames } from '../../store/cartItems';
import './StoreNavBar.css';
import SearchItem from './SearchItem';

const StoreNavBar = () => {
    const currentUser = useSelector(state => state.session.user);
    const cartItems = useSelector(getCartGames);
    const dispatch = useDispatch();
    
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const searchRef = useRef();

    useEffect(() => {
        dispatch(fetchCartGames());
        handleSearch(search);
    }, [dispatch, search]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (query) => {
        try {
          const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
          const data = await res.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error searching:', error);
        }
        setShowDropdown(true)
    };
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
    };

    return (
        <div className='nav-wrap-container'>
            <div className='nav-wrap'>

                { currentUser ? <a href='/cart' className='cart-button'>cart({cartItems.length})</a> : <div id='space-holder'></div>}
                
                <div className="store-nav-bg">

                    <div className="store-nav">
                        <div className='store-nav-tab-wrap'>
                            <Link to='/'>
                                <div className="store-nav-tab" id='fst-child'>Your Store</div>
                            </Link>
                            <Link to='/games/2'>
                                <div className="store-nav-tab">New & Noteworthy</div>
                            </Link>
                            <Link to='/category/All'>
                                <div className="store-nav-tab">Categories</div>
                            </Link>
                            {/* <div className="store-nav-tab">News</div> */}
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

                {showDropdown && (
                    <div className='search-dropdown-show' ref={searchRef}>
                        {searchResults.map((result) => (
                            <SearchItem game={result} key={result.id} />
                        ))}
                    </div>
                )}
                
            </div>
            
        </div>
    )
}

export default StoreNavBar;