import { useRef } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoryCarousel.css'

import story_rich from '../../resources/carousel/category_slider_img/story_rich.png'
import rpg from '../../resources/carousel/category_slider_img/rpg.png'
import action from '../../resources/carousel/category_slider_img/action.png'
import horror from '../../resources/carousel/category_slider_img/horror.png'


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
        nextArrow: null, //<NextArrow />,
        prevArrow: null //<PrevArrow />,
    };

    return (
        <>
        

        <div className="otside-slider-wrap">

            <div className="title-slider-wrap">
            <div className="carousel-header-text" id="category-browse-text">Browse By Category</div>
                <Slider {...settings} ref={sliderRef}>

                    <a href="#" className="transform">
                        <img id="category-image" src={story_rich} alt="story_rich"/>
                        <div className="red-category-item">
                            <div className="category-text-capsule">
                                <span className="category-text">Story-Rich</span>
                            </div>
                        </div>
                    </a>

                    <a href="#" className="transform">
                        <img id="category-image" src={rpg} alt="rpg"/>
                        <div className="blue-category-item">
                            <div className="category-text-capsule">
                                <span className="category-text">Role-playing</span>
                            </div>
                        </div>
                    </a>

                    <a href="#" className="transform">
                        <img id="category-image" src={action} alt="action"/>
                        <div className="yellow-category-item">
                            <div className="category-text-capsule">
                                <span className="category-text">Action</span>
                            </div>
                        </div>
                    </a>

                    <a href="#" className="transform">
                        <img id="category-image" src={horror} alt="horror"/>
                        <div className="green-category-item">
                            <div className="category-text-capsule">
                                <span className="category-text">Horror</span>
                            </div>
                        </div>
                    </a>

                </Slider>
            </div>
        </div>
        </>
    )
}

export default CategoryCarousel;