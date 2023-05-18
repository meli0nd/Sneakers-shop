import React, { useEffect, useState } from 'react'
import s from './Card.module.scss'

const Card = ({ name, price, image, id, addToFavorite, addToCart }) => {

    const [isAdded, setIsAdded] = useState(false)

    const setChecked = () => {
        addToCart({ name, price, image, id })
        setIsAdded(!isAdded)
    }

    useEffect(() => { '' }, [isAdded])

    return (
        <div className={s.card + ' mb-20'}>
            <div className={s.favorite} onClick={addToFavorite}>
                <img src="/img/heart-unliked.svg" alt="Favorite" />
            </div>
            <img width={133} height={112} src={image} alt="Sneaker-2" />
            <h5>{name}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className='cu-p'
                    onClick={setChecked}
                    width={32}
                    height={32}
                    src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                    alt="addToCart" />

            </div>
        </div>
    )
}

export default Card