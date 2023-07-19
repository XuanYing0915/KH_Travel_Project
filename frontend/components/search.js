import React from 'react'
import { SlMagnifier } from 'react-icons/sl'

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className="search">
      <input
        className="input"
        onChange={inputHandler}
        type="text"
        value={'搜索'}
      />
      <button onClick={search}>
        <SlMagnifier />
      </button>
      <div className="texthead">
        <div>
          <p>親子旅遊</p>
          <p>寵物友善</p>
          <p>青年旅宿</p>
        </div>
        <div className="textsection">
          <p>鹽埕埔</p>
          <p>美麗島</p>
          <p>西子灣</p>
        </div>
        <div>
          <p>市議會</p>
          <p>凹子底</p>
          <p>南岡山</p>
        </div>
        <div>
          <select>
            <option value="1">鹽埕區</option>
            <option value="2">鼓山區</option>
            <option value="3">新興區</option>
            <option value="4">旗津區</option>
          </select>
        </div>
        <div className="textsection">
          <p>鹽埕區</p>
          <p>新興區</p>
          <p>前鎮區</p>
        </div>
        <div>
          <p>苓雅區</p>
          <p>鼓山區</p>
          <p>楠梓區</p>
        </div>
        <div>
          <select>
            <option value="1">鹽埕區</option>
            <option value="2">鼓山區</option>
            <option value="3">新興區</option>
            <option value="4">旗津區</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Search
