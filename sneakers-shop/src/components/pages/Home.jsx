import React from "react"
import Card from "../Card/Card"

const Home = ({
  items,
  searchValue,
  onChangeSearch,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    // making item's title from array and input's value lower case to work with search logic
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    // working with react-content-loader. If items array is empty then fake array will be added to show loading
    return (isLoading ? [...Array(8)] : filteredItems).map((sneaker, index) => {
      return (
        <Card
          loading={isLoading}
          key={index}
          addToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
          {...sneaker}
        />
      )
    })
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="searchBlock d-flex">
          <img src="../../assets/img/search.svg" alt="Search" />
          <input
            type="search"
            placeholder="Поиск..."
            onChange={onChangeSearch}
            value={searchValue}
          />
        </div>
      </div>

      <div className="d-flex cardContainer">{renderItems()}</div>
    </div>
  )
}

export default Home
