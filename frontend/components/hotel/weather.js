import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import clearSvg from '@/assets/hotel/day-clear.svg' // 引入SVG圖檔
import { BsUmbrellaFill } from 'react-icons/bs' // 引入天氣Icon
import DayCloudy from '@/assets/hotel/day-cloudy.svg'
import DayClear from '@/assets/hotel/day-clear.svg'
import DayFog from '@/assets/hotel/day-fog.svg'
import DayPartiallyClearWithRain from '@/assets/hotel/day-partially-clear-with-rain.svg'
import DayCloudyFog from '@/assets/hotel/day-cloudy-fog.svg'
import DayThunderstorm from '@/assets/hotel/day-thunderstorm.svg'

export default function Weather() {

// 定義各種天氣型態對應到的代碼
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1 ],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
  ],
};

// 定義每種天氣型態對應到的圖片
const weatherIcons = {
  day: {
    isThunderstorm: DayThunderstorm,
    isClear: DayClear,
    isCloudyFog: DayCloudyFog,
    isCloudy: DayCloudy,
    isFog: DayFog,
    isPartiallyClearWithRain: DayPartiallyClearWithRain,

  },
}

const getWeatherIcon = (code) => {
  const weatherType = getWeatherType(code);
  if (weatherType) {
    return weatherIcons.day[weatherType];
  }
  return null; // 如果找不到對應圖片，返回null
}

const getWeatherType = (code) => {
  for (let [weatherType, weatherCodes] of Object.entries(weatherTypes)) {
    if (weatherCodes.includes(Number(code))) {
      return weatherType;
    }
  }
  return null; // 如果找不到對應型態，返回null
}
// 定義元件內部的狀態以儲存取得的氣象資訊
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    comfortability: '',
    weatherCode: 0,
    isLoading: true,
    parameterValue: 1,
  })

  // 定義API金鑰以及查詢的地點名稱
  const AUTHORIZATION_KEY = 'CWB-0F550A10-2E71-4541-89FE-5D5F9CC4A337'
  const LOCATION_NAME_FORECAST = '高雄市'

  // 從元件的狀態中解構取出所需的數據
  const {
    locationName,
    wxNumber1,
    wxNumber3,
    rainPossibility1,
    rainPossibility3,
    maxTemperature1,
    maxTemperature3,
    minTemperature1,
    minTemperature3,
  } = weatherElement

  
// 使用函數
const weatherIconToday = wxNumber1 ? getWeatherIcon(wxNumber1) : null;
const weatherIconTomorrow = wxNumber3 ? getWeatherIcon(wxNumber3) : null;


  // 使用 useEffect 建立元件初次載入時需要執行的邏輯
  useEffect(() => {
    // 定義一個非同步函式用以取得資料
    const fetchData = async () => {
      // 將元件的狀態設定為載入中
      setWeatherElement((prevState) => ({
        ...prevState,
        isLoading: true,
      }))

      // 同時取得現在氣象和未來預報
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchWeatherForecast(),
      ])

      // 將取得的資料存入元件的狀態
      setWeatherElement((prevState) => ({
        ...prevState,
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      }))
    }
    // 執行取得資料的函式
    fetchData()
  }, []) // 空陣列表示只在元件初次載入時執行

  // 定義一個函式用以取得未來的氣象預報
  const fetchWeatherForecast = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          Array.isArray(data.records.location) &&
          data.records.location.length > 0
        ) {
          const locationData = data.records.location[0]

          let weatherElements = {}
         
          locationData.weatherElement.forEach((item) => {
            if (item.elementName === 'Wx') {
              weatherElements = {
                ...weatherElements,
                wxNumber1: item.time[0].parameter.parameterValue,
                wxNumber3: item.time[2].parameter.parameterValue,
              }
            }

            if (item.elementName === 'PoP') {
              weatherElements = {
                ...weatherElements,
                rainPossibility1: item.time[0].parameter.parameterName,
                rainPossibility3: item.time[2].parameter.parameterName,
              }
            }

            if (item.elementName === 'MinT') {
              weatherElements = {
                ...weatherElements,
                minTemperature1: item.time[0].parameter.parameterName,
                minTemperature3: item.time[2].parameter.parameterName,
              }
            }

            if (item.elementName === 'MaxT') {
              weatherElements = {
                ...weatherElements,
                maxTemperature1: item.time[0].parameter.parameterName,
                maxTemperature3: item.time[2].parameter.parameterName,
              }
            }
          })
          console.log('整理後的天氣資料', weatherElements);
          return weatherElements
        } else {
          console.error('Unexpected API response:', data)
        }
      })
  }
  
  // 定義元件的渲染內容
  return (
    <>
      <div className="weatherContainer">
        <div className="weather-card">
          <location className="location">{locationName}</location>
          <div className="description">高雄天氣</div>
          <div className="currentWeather">
            <div className="temperature">
              <span style={{ marginRight: '15px' }}>今天</span>
              <Image
                src={weatherIconToday || clearSvg}
                alt="Weather Icon Today"
                width={40}
                height="auto"
                style={{ marginRight: '5px' }}
              />{' '}
              {Math.round(minTemperature1)}-{Math.round(maxTemperature1)}
              <span style={{ marginRight: '15px' }}>°C</span>
              <span
                style={{
                  marginRight: '10px',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              >
                <BsUmbrellaFill />
              </span>
              {rainPossibility1} %
            </div>
          </div>
          <div className="currentWeather">
            <div className="temperature">
              <span style={{ marginRight: '15px' }}>明天</span>
              <Image
                src={weatherIconTomorrow || clearSvg}
                alt="Weather Icon Tomorrow"
                width={40}
                height="auto"
                style={{ marginRight: '5px' }}
              />{' '}
              {Math.round(minTemperature3)}-{Math.round(maxTemperature3)}
              <span style={{ marginRight: '15px' }}>°C</span>
              <span
                style={{
                  marginRight: '10px',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              >
                <BsUmbrellaFill />
              </span>
              {rainPossibility3} %
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
