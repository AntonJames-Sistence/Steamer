import { useState } from 'react';
import './StoreNavBar.css'

const StoreNavBar = () => {

    const [search, setSearch] = useState('');

    return (
        <div className='nav-wrap'>
            <a href='/cart'>
                <button>cart</button>
            </a>

            <div className="store-nav-bg">

                <div className="store-nav">
                    <div className='store-nav-tab-wrap'>
                        <div className="store-nav-tab" id='fst-child'>Your Store</div>
                        <div className="store-nav-tab">New & Noteworthy</div>
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

        </div>
    )
}

export default StoreNavBar;