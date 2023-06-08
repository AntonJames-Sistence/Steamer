import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryGame, getCategoryGames } from "../../store/category";
import { useParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import './CategoryPage.css'


const CategoryPage = () => {
    const dispatch = useDispatch();
    const { category } = useParams();

    useEffect(() => {
        dispatch(fetchCategoryGame(category))
    }, [dispatch])

    const categoryGames = useSelector(getCategoryGames);

    if(categoryGames.length === 0) return <></>

    return (
        <div className="wrap">
            <div>
                <div className="category-header">{category} games</div>
                <div className="category-main-capsule">
                    {categoryGames.map((game) => {
                        return <CategoryItem game={game} />
                    })}
                </div> 
            </div>
        </div>
    )
}

export default CategoryPage;