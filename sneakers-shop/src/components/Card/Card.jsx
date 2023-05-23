import React, { useContext, useEffect, useState } from "react"

import s from "./Card.module.scss"

import ContentLoader from "react-content-loader"

import { AppContext } from "../../App"

const Card = ({
  id,
  name,
  price,
  image,
  addToCart,
  onAddToFavorite,
  favorited = false,
  loading = false,
}) => {
  //  taking boolean type from App's function that connecting cart and Home items to work with adding
  const { isItemInCart, isItemInFavorite } = useContext(AppContext)

  const [isFavorite, setIsFavorite] = useState(favorited)

  const object = { name, price, image, id, parentId: id }

  // function that returns object that assumes to be added to cart and posting to server
  const addedToCart = () => {
    addToCart(object)
  }

  // function that returns object that assumes to be added to favorites and posting to server
  const addToFavorite = () => {
    onAddToFavorite(object)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={s.card + " mb-20"} onDoubleClick={addToFavorite}>
      {/* if fetching from server is in proccess, this condition will show react-content-loader empty items that was added with fake array*/}
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={255}
          viewBox="0 0 165 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="150" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={s.favorite} onClick={addToFavorite}>
            <img
              width={37}
              height={37}
              src={
                isItemInFavorite(id)
                  ? "../../assets/img/heart-liked.svg"
                  : "../../assets/img/heart-unliked.svg"
              }
              alt="Favorite"
            />
          </div>
          <img width="100%" height={135} src={image} alt="Sneaker" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={s.btnChecked + " cu-p"}
              onClick={addedToCart}
              width={32}
              height={32}
              src={
                isItemInCart(id)
                  ? "../../assets/img/btn-checked.svg"
                  : "../../assets/img/btn-plus.svg"
              }
              alt="addToCart"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Card
