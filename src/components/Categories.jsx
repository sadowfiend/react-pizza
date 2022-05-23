import React from "react";

function Categories(props) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li onClick={() => setActiveIndex(i)}
                        className={activeIndex === i ? 'active' : ''}
                        key={i}>{el}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;