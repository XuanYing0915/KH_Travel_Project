import React from 'react'

export default function FavoriteBtn({ favorite, isFavorite }) {
  return (
    <button
      // 更改樣式
      className={`col-sm-10 col-xl-4   add-f-btn rounded-pill ${
        isFavorite.love ? 'remove-f-btn' : 'add-f-btn'
      }`}
      onClick={favorite}
    >
      {isFavorite.love ? '取消收藏' : '加入收藏'}
    </button>
  )
}
