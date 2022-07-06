// нужна информация о параметрах, используем useParams
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
// для фильтрации категории используем медод из API getFilteredCategory
import { getFilteredCategory } from '../api'
import Preloader from '../components/Preloader'
import MealsList from "../components/MealsList";


function Category() {
    // достаем имя из useParams
    const {name} = useParams();
    const [meals, setMeals] = useState([])
    
    // используем юзэффект и имя как зависимость для фильтрации.
    useEffect(() => {
        // передаем в функцию текущее имя, переписываем стейт при смене имени
        getFilteredCategory(name)
        // как только получим категорию, то вызовим функцию обновления стейта meals и запишем мекущий массив meals в стейт
        .then(data => setMeals(data.meals))
    }, [name])


    return (
        <>
        {/* проверяем есть ли что то в милс, ели нет то рисуем перлоадер. 
        если есть то рисуем компонент милсЛист и передаем ему текущий массив с едой милс*/}
            {!meals.length ? <Preloader /> : <MealsList meals={meals}/>}
            
        </>
    );
}

export default Category;