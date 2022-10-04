import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../App';

export default function Home() {
	const { searchValue } = React.useContext(SearchContext);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	});
	const [currentPage, setCurrentPage] = React.useState(1);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	React.useEffect(() => {
		const itemsUrl = `https://63303dc5591935f3c88c5806.mockapi.io/items?page=${currentPage}&limit=4&${
			categoryId > 0 ? `category=${categoryId}` : ''
		}&sortBy=${sortType.sortProperty}&order=desc&search=${searchValue}`;
		setIsLoading(true);
		axios.get(itemsUrl).then((response) => {
			setItems(response.data);
			setIsLoading(false);
		});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
				<Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(pageNum) => setCurrentPage(pageNum)} />
		</div>
	);
}
