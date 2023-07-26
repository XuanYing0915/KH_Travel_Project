import React, { useState, useEffect } from 'react'
import Card from '@/components/food/food-cart' // 引入Card組件，注意路徑可能需要根據你的項目結構調整

// import './FoodPage.css' // 引入FoodPage的css檔案，注意路徑可能需要根據你的項目結構調整

function FoodPage() {
  // 假設你有一個狀態來存儲食品的列表
  const [foods, setFoods] = useState([])

  // 假設你有一個狀態來存儲用戶的收藏
  const [favorites, setFavorites] = useState([])

  // 當頁面加載時，獲取食品數據
  useEffect(() => {
    fetchFoods()
    fetchFavorites()
  }, [])

  // 這裡只是一個假設的fetchFoods函數，你需要根據你的API或數據庫實現它
  const fetchFoods = async () => {
    const data = await fetch('/api/foods') // 你的API路徑
    const foods = await data.json()
    setFoods(foods)
  }

  // 這裡只是一個假設的fetchFavorites函數，你需要根據你的API或數據庫實現它
  const fetchFavorites = async () => {
    const data = await fetch('/api/favorites') // 你的API路徑
    const favorites = await data.json()
    setFavorites(favorites)
  }

  // 當用戶點擊收藏按鈕時，添加或移除該食品
  const handleFavoriteClick = async (food) => {
    if (favorites.includes(food.id)) {
      await removeFromFavorites(food)
      fetchFavorites()
    } else {
      await addToFavorites(food)
      fetchFavorites()
    }
  }

  // 這裡只是一個假設的addToFavorites和removeFromFavorites函數，你需要根據你的API或數據庫實現它
  const addToFavorites = async (food) => {
    /*...*/
  }
  const removeFromFavorites = async (food) => {
    /*...*/
  }

  // 返回頁面元件
  return (
    <>
      <div className="food-page">
      <Card
            key= {1}
            image= "sfkj"
            title="測試"
            content="測試"
            isFavorite= {true}
            onFavoriteClick={() => handleFavoriteClick(1)}
          />
        {/* {foods.map((food) => (
        
         
        ))} */}
      </div>
    </>
  )
}
// key={food.id}
// image={food.image}
// title={food.name}
// content={food.description}
// isFavorite={favorites.includes(food.id)}
// onFavoriteClick={() => handleFavoriteClick(food)}
export default FoodPage
