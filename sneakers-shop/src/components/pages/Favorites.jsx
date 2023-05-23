import React, { useContext, useEffect } from "react"
import Card from "../Card/Card"
import { AppContext } from "../../App"

const Favorites = ({ onAddToCart }) => {
  const { favorites, onAddToFavorite } = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои закладки</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="d-flex cardContainer">
          {favorites.map((s) => {
            return (
              <Card
                key={s.id}
                name={s.name}
                price={s.price}
                image={s.image}
                id={s.id}
                favorited
                addToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            )
          })}
        </div>
      ) : (
        <div>
          <h1>У вас нет закладок</h1>
        </div>
      )}
    </div>
  )
}

export default Favorites
