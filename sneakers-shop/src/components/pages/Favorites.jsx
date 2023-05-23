import React, { useContext, useEffect } from "react";
import Card from "../Card/Card";
import { AppContext } from "../../App";

const Favorites = ({ onAddToCart }) => {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  useEffect(() => {
    "";
  }, [favorites]);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои закладки</h1>
      </div>

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
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
