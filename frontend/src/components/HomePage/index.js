import CategoryCarousel from "../CategoryCarousel";
import MainCarousel from "../MainCarousel";
import './HomePage.css'


const torque = (
    <div className="wrap">
        
        <div className="torque-capsule">
            <div className="carousel-header-text">Special Offer</div>

            <iframe 
            src="https://antonjames-sistence.github.io/Torque/" 
            width="100%" 
            height="1140" 
            id="scaled-frame"
            />
        </div>
    </div>
)

const summerSpotlight = (
    <div className="wrap">
        <a href="/category/All">
            <div className="summer-spotlight-img"></div>
        </a>
    </div>
)

const HomePage = () => {
    return (
        <>
            <MainCarousel />
            {summerSpotlight}
            {torque}
            <CategoryCarousel />
        </>
    )
}


export default HomePage;