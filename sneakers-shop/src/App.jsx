import React, { useEffect, useState } from 'react'
import './index.scss'
import Header from './components/Header/Header'
import CartDrawer from './components/CartDrawer/CartDrawer'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Favorites from './components/pages/Favorites'


const App = () => {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpener, setCartOpener] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([
    {
      "id": 1,
      "name": "Мужские Кроссовки Nike Blazer Mid Suede",
      "price": 12999,
      "image": "img/sneakers/1.png"
    },
    {
      "id": 2,
      "name": "Мужские Кроссовки Nike Air Max 270",
      "price": 15000,
      "image": "img/sneakers/2.png"
    },
  ])

  const showCart = () => {
    setCartOpener(!cartOpener)
  }

  useEffect(() => {
    axios.get(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/items`)
      .then(res => {
        setItems(res.data)
      })
    axios.get(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart`)
      .then(res => {
        setCartItems(res.data)
      })
  }, [])

  const onAddToCart = async (obj) => {
    try {
      setCartItems((prev) => [...prev, obj])
      const { data } = await axios.post(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart`, obj)
    } catch (error) {
      alert('Не удалось добавить в корзину. Попробуйте еще раз')
    }
  }

  const deleteFromCart = async (id) => {
    try {
      const { data } = await axios.delete(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Не удалось удалить из корзины. Попробуйте еще раз')

    }
  }

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const onAddToFavorite = (obj) => {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      // axios.delete(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/favorites/${obj.id}`)

    } else {
      setFavorites((prev) => [...prev, obj])
    }
    // axios.post(`https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/favorites`, obj)
  }

  return (
    <div className='wrapper clear'>

      {cartOpener && <CartDrawer
        showCart={showCart}
        cartItems={cartItems}
        deleteFromCart={deleteFromCart} />}

      <Header showCart={showCart} />
      <Routes>
        <Route path='/' element={
          <Home
            items={items}
            searchValue={searchValue}
            onChangeSearch={onChangeSearch}
            setSearchValue={setSearchValue}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart} />}
        />
        <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} />} />
      </Routes>

    </div>
  )
}

export default App


