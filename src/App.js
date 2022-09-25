import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import React from 'react';
import axios from 'axios';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
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
		<div className='App'>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<div className='container'>
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
