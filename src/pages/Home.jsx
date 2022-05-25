import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home(props) {
    let [items, setItems] = React.useState([])
    let [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        fetch('https://628bab00667aea3a3e344015.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setItems(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
                }
            </div>
        </>
    );
}

export default Home;