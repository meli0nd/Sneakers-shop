import React, { useEffect, useState } from 'react'
import './index.scss'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import CartDrawer from './components/CartDrawer/CartDrawer'



const App = () => {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpener, setCartOpener] = useState(false)

  const showCart = () => {
    setCartOpener(!cartOpener)
  }

  useEffect(() => {
    fetch('https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/items')
      .then(res => {
        return res.json()
      })
      .then((items) => {
        setItems(items)
      })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj])
  }

  const deleteFromCart = (id) => {
    setCartItems((prev) => {
      if (cartItems) {
        return [...prev.filter(item => item.id != id)]
      }
    })
  }


  return (
    <div className='wrapper clear'>

      {cartOpener && <CartDrawer
        showCart={showCart}
        cartItems={cartItems}
        deleteFromCart={deleteFromCart} />}

      <Header showCart={showCart} />

      <div className='content p-40'>
        <div className='d-flex align-center mb-40 justify-between'>
          <h1 className=''>Все кроссовки</h1>
          <div className='searchBlock d-flex'>
            <img src="/img/search.svg" alt="Search" />
            <input type="search" placeholder='Поиск...' />
          </div>
        </div>

        <div className='d-flex cardContainer'>
          {
            items.map(s =>
              <Card
                key={s.id}
                name={s.name}
                price={s.price}
                image={s.image}
                id={s.id}
                addToFavorite={() => console.log('first')}
                addToCart={onAddToCart} />)
          }
        </div>
      </div>
    </div>
  )
}

export default App


