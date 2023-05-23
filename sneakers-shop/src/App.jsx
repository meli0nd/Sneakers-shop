import React, { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";

export const AppContext = createContext({});

const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpener, setCartOpener] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // show - hide cart function
  const showCart = () => {
    setCartOpener(!cartOpener);
  };

  // fetching, not subscribed to update
  useEffect(() => {
    async function fetchDataAPI() {
      setIsLoading(true);
      const fetchCartItems = await axios.get(
        `https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart`
      );
      //const fetchFavorites  = await axios.get(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/favorites`)
      const fetchFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const fetchItems = await axios.get(
        `https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/items`
      );

      setFavorites(fetchFavorites);
      setCartItems(fetchCartItems.data);
      setItems(fetchItems.data);
      setIsLoading(false);
    }

    fetchDataAPI();
  }, []);

  // function that posting items to server or deleting if there is similar two
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          `https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart`,
          obj
        );
      }
    } catch (error) {
      alert("Не удалось добавить в корзину. Попробуйте еще раз");
    }
  };
  // function that delete items from server with catching errors
  const deleteFromCart = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart/${id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Не удалось удалить из корзины. Попробуйте еще раз");
      window.location.reload();
    }
  };

  // function that making controlled "search" input
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // function that assumes to post favorite items to server, instead is posting to local storage or deleting if there is similar two
  const onAddToFavorite = (obj) => {
    // API server not allowing add more than 2 endpoints so i decided to push the array to the local storage instead...
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      // axios.delete(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/favorites/${obj.id}`)
      addToLS("favorites", obj);
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      setFavorites((prev) => [...prev, obj]);
      addToLS("favorites", obj);
    }
    // axios.post(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/favorites`, obj)
  };

  // function that taking items from cart state and called to compare ids
  const isItemInCart = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  // function that taking items from favorite state and called to compare ids
  const isItemInFavorite = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  // flexible function that posting items to local storage if there's no similar in there
  const addToLS = (name, object) => {
    const fetchFromLS = JSON.parse(localStorage.getItem(name)) || [];
    if (fetchFromLS.find((item) => item.id === object.id)) {
      const LSArray = fetchFromLS.filter((item) => item.id !== object.id);
      localStorage.setItem(name, JSON.stringify(LSArray));
    } else {
      localStorage.setItem(name, JSON.stringify([...fetchFromLS, object]));
    }
  };

  // orders

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemInCart,
        onAddToFavorite,
        isItemInFavorite,
        setCartOpener,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpener && (
          <CartDrawer showCart={showCart} deleteFromCart={deleteFromCart} />
        )}

        <Header showCart={showCart} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoading={isLoading}
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                onChangeSearch={onChangeSearch}
                setSearchValue={setSearchValue}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites onAddToCart={onAddToCart} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
