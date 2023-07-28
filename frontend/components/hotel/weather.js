import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import rainSvg from '@/assets/hotel/rain.svg'
import clearSvg from '@/assets/hotel/day-clear.svg'
import pcwrSvg from '@/assets/hotel/day-partially-clear-with-rain.svg'

export default function Weather() {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    comfortability: '',
    weatherCode: 0,
    isLoading: true,
  })

  const AUTHORIZATION_KEY = ''
  const LOCATION_NAME = '高雄市' // STEP 1：定義 LOCATION_NAME
  const LOCATION_NAME_FORECAST = '高雄市'

  const {
    locationName,
    rainPossibility1,
    rainPossibility3,
    maxTemperature1,
    maxTemperature3,
  } = weatherElement

  useEffect(() => {
    const fetchData = async () => {
      // 把取得的資料透過物件的解構賦值放入
      setWeatherElement((prevState) => ({
        ...prevState,
        isLoading: true,
      }))

      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
      ])

      setWeatherElement((prevState) => ({
        ...prevState,
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      }))
    }
    fetchData()
  }, [])

  const fetchCurrentWeather = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if data.records and data.records.location are arrays and they have at least one element
        if (
          Array.isArray(data.records) &&
          data.records.length > 0 &&
          Array.isArray(data.records.location) &&
          data.records.location.length > 0
        ) {
          const locationData = data.records.location[0]

          const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
              if (['WDSD', 'TEMP'].includes(item.elementName)) {
                // 這支 API 會回傳未來 36 小時的資料，這裡只需要取出最近 12 小時的資料，因此使用 item.time[0]
                neededElements[item.elementName] = item.elementValue
              }
              return neededElements
            },
            {}
          )

          return {
            observationTime: locationData.time.obsTime,
            locationName: locationData.locationName,
            temperature: weatherElements.TEMP,
            windSpeed: weatherElements.WDSD,
            isLoading: false,
          }
        } else {
          console.error('Unexpected API response:', data)
        }
      })
  }

  const fetchWeatherForecast = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
    )
      .then((response) => response.json())
      .then((data) => {
        // check if data.records.location is an array and it has at least one element
        if (
          Array.isArray(data.records.location) &&
          data.records.location.length > 0
        ) {
          const locationData = data.records.location[0]

          let weatherElements = {}
          locationData.weatherElement.forEach((item) => {
            if (item.elementName === 'PoP') {
              weatherElements = {
                ...weatherElements,
                rainPossibility1: item.time[0].parameter.parameterName,
                rainPossibility3: item.time[2].parameter.parameterName,
              }
            }

            if (item.elementName === 'MaxT') {
              weatherElements = {
                ...weatherElements,
                maxTemperature1: item.time[0].parameter.parameterName,
                maxTemperature3: item.time[2].parameter.parameterName,
              }
            }

            if (item.elementName === 'Wx') {
              weatherElements = {
                ...weatherElements,
                description: item.time[0].parameter.parameterName,
                weatherCode: item.time[0].parameter.parameterValue,
              }
            }

            if (item.elementName === 'CI') {
              weatherElements = {
                ...weatherElements,
                comfortability: item.time[0].parameter.parameterName,
              }
            }
          })

          return weatherElements
        } else {
          console.error('Unexpected API response:', data)
        }
      })
  }

  return (
    <>
      <div className="weatherContainer">
        <div className="weather-card">
          <location className="location">{locationName}</location>
          <div className="description">天氣資訊</div>
          <div className="currentWeather">
            <div className="temperature">
              <span style={{ marginRight: '15px' }}>今天</span>
              <Image
                src={clearSvg}
                alt="dayCloudy SVG"
                width={40}
                height={40}
                style={{ marginRight: '5px' }}
              />{' '}
              {Math.round(maxTemperature1)}
              <span style={{ marginRight: '15px' }}>°C</span>
              <Image
                src={rainSvg}
                alt="dayCloudy SVG"
                width={40}
                height={40}
                style={{ marginRight: '5px', marginLeft: '10px' }}
              />
              {rainPossibility1} %
            </div>
          </div>
          <div className="currentWeather">
            <div className="temperature">
              <span style={{ marginRight: '15px' }}>明天</span>
              <Image
                src={pcwrSvg}
                alt="dayCloudy SVG"
                width={40}
                height={40}
                style={{ marginRight: '5px' }}
              />{' '}
              {Math.round(maxTemperature3)}
              <span style={{ marginRight: '15px' }}>°C</span>
              <Image
                src={rainSvg}
                alt="dayCloudy SVG"
                width={40}
                height={40}
                style={{ marginRight: '5px', marginLeft: '10px' }}
              />
              {rainPossibility3} %
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
