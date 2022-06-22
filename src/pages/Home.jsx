import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import { setCategotyId } from "../redux/slices/filterSclice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import {SearchContext} from "../App";

function Home() {
    const dispatch = useDispatch();
    const {categoryId, sort} = useSelector(state => state.filter);

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1);
    
    const onChangeCategory = (id) => {
        dispatch(setCategotyId(id))
    }


    const {searchValue} = React.useContext(SearchContext);

    const pizzas = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);


    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://628bab00667aea3a3e344015.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
                setIsLoading(false)
            })
        window.scrollTo(0,0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                            onChangeCategory={onChangeCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletons
                    : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
}

export default Home;