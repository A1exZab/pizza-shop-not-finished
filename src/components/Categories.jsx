import React from 'react'

export default function Categories() {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые'
	]

	return (
		<div className='categories'>
			<ul>
				{
					categories.map(((category,index) => {
						return(
							<li onClick = {() => {setActiveIndex(index)}} className = {activeIndex === index ? 'active' : ''}>{category}</li>
						)
					}))
				}
			</ul>
		</div>
	);
}