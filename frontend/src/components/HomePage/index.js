import { useDispatch, useSelector } from "react-redux";
import CategoryCarousel from "../CategoryCarousel";
import MainCarousel, { shuffle } from "../MainCarousel";
import './HomePage.css'
import GridItem from "./GridItem";
import { fetchGames, getGames } from "../../store/games";
import { useEffect } from "react";
import { scrollTo } from "../GameShowPage/index";


const torque = (
    <div className="wrap">
        
        <div className="torque-capsule" id="special-offer">
            <div className="carousel-header-text">Special Offer</div>

            <iframe 
            src="https://antonjames.dev/Torque/" 
            width="100%" 
            height="1140" 
            id="scaled-frame"
            />
        </div>
    </div>
)

const summerSpotlight = (
    <div className="wrap">
        <a onClick={()=>{scrollTo('special-offer')}}>
            <div className="summer-spotlight-img"></div>
        </a>
    </div>
)

const HomePage = () => {
    const dispatch = useDispatch();
    const games = useSelector(getGames);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchGames());
    }, [dispatch]);

    const shuffledGames = shuffle(games);
    const selectedGames = shuffledGames.slice(0, 7);

    const gamesGrid = (
        <div className="wrap">
            <div className="grid-header">
                <div className="carousel-header-text">Best sellers</div>
                <div className="grid-holder">
                    {selectedGames.map((game) => {
                        return <GridItem game={game} key={game.id} />
                    })}
                </div>
            </div>
        </div>
    )


    return (
        <>
            <MainCarousel />
            {summerSpotlight}
            {gamesGrid}
            {torque}
            <CategoryCarousel />
        </>
    )
}


export default HomePage;