import React, { useEffect, useState } from 'react'
import s from './Card.module.scss'

const Card = ({ name, price, image, id, addToCart, onAddToFavorite, favorited }) => {

    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const setChecked = () => {
        addToCart({ name, price, image, id })
        setIsAdded(!isAdded)
    }

    const addToFavorite = () => {
        onAddToFavorite({ name, price, image, id })
        setIsFavorite(!isFavorite)
    }

    useEffect(() => { '' }, [isAdded, isFavorite])

    return (
        <div className={s.card + ' mb-20'} onDoubleClick={addToFavorite}>
            <div className={s.favorite} onClick={addToFavorite}>
                <img width={37}
                    height={37}
                    src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                    alt="Favorite" />
            </div>
            <img width={133} height={112} src={image} alt="Sneaker-2" />
            <h5>{name}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={s.btnChecked + ' cu-p'}
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