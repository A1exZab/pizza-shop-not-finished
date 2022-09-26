import React from 'react'
import axios from 'axios'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock'

export default function Home() {
    const itemsUrl = 'https://63303dc5591935f3c88c5806.mockapi.io/items';
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		axios.get(itemsUrl).then((response) => {
			setItems(response.data);
			setIsLoading(false);
		});
	}, []);  

    return (
    <>
        <div className='content__top'>
							<Categories />
							<Sort />
						</div>
						<h2 className='content__title'>Все пиццы</h2>
						<div className='content__items'>
							{isLoading
								? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
								: items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
						</div>
    </>
  )
}


