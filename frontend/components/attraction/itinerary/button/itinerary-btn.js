import React from 'react'

export default function ItineraryBtn({ addItinerary, isItinerary }) {
  //  ^^^函式^^^^    ^^^狀態^^^^
  return (
    <button
      // 更改樣式
      className={`col-sm-10 col-xl-4   add-i-btn rounded-pill`}
      // ${isFavorite.love ? 'remove-f-btn' : 'add-f-btn'}
      onClick={addItinerary}
    >
      {/* {isFavorite.love ? '取消收藏' : '加入收藏'} */}
      加入行程
    </button>
  )
}
