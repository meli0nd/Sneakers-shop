import React from 'react'
import Card from '../Card/Card'

const Favorites = ({ items, onAddToFavorite, onAddToCart }) => {
    console.log(items)
    return (
        <div className='content p-40'>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className=''>Ваши закладки</h1>
            </div>

            <div className='d-flex cardContainer'>
                {items.map(s => {
                    return (
                        <Card
                            key={s.id}
                            name={s.name}
                            price={s.price}
                            image={s.image}
                            id={s.id}
                            favorited={true}
                            addToCart={onAddToCart}
                            onAddToFavorite={onAddToFavorite}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Favorites