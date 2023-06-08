import { useRef } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoryCarousel.css'

import story_rich from '../../resources/carousel/story_rich.png'
import rpg from '../../resources/carousel/rpg.png'
import action from '../../resources/carousel/action.png'
import indie from '../../resources/carousel/horror.png'


const CategoryCarousel = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        fade: false,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: null,
        prevArrow: null,
    };

    const categories = [
        { name: 'All', image: story_rich, color: 'red', text: 'All Games' },
        { name: 'RPG', image: rpg, color: 'blue', text: 'Role-playing' },
        { name: 'Action', image: action, color: 'yellow', text: 'Action' },
        { name: 'Indie', image: indie, color: 'green', text: 'Indie' }
      ];
      
    const CategoryItems = () => {
        return categories.map((category, index) => (
            <a href={`/category/${category.name}`} className="transform" key={index}>
            <img id="category-image" src={category.image} alt={category.name} />
            <div className={`${category.color}-category-item`}>
                <div className="category-text-capsule">
                    <span className="category-text">{category.text}</span>
                </div>
            </div>
            </a>
        ));
    };

    return (
        <>
        

        <div className="otside-slider-wrap">

            <div className="title-slider-wrap">
                <div className="carousel-header-text" id="category-browse-text">Browse By Category</div>
                <div className="category-carousel-capsule">
                    <Slider {...settings} ref={sliderRef}>

                        {CategoryItems()}

                    </Slider>
                </div>
            </div>
        </div>
        </>
    )
}

export default CategoryCarousel;