import React from 'react'
import Card from '../Card/Card'

const Home = ({ items, searchValue, onChangeSearch, onAddToFavorite, onAddToCart }) => {
    return (
        <div className='content p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className=''>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='searchBlock d-flex'>
                    <img src="/img/search.svg" alt="Search" />
                    <input type="search" placeholder='Поиск...' onChange={onChangeSearch} value={searchValue} />
                </div>
            </div>

            <div className='d-flex cardContainer'>
                {
                    items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map(s =>
                        <Card
                            key={s.id}
                            name={s.name}
                            price={s.price}
                            image={s.image}
                            id={s.id}
                            addToCart={onAddToCart}
                            onAddToFavorite={onAddToFavorite} />)
                }
            </div>
        </div>
    )
}

export default Home