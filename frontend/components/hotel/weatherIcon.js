import React from 'react';
import DayCloudy from '@/assets/hotel/day-cloudy.svg';
import DayClear from '@/assets/hotel/day-clear.svg';
import DayCloudyFog from '@/assets/hotel/day-cloudy-fog.svg';
import DayFog from '@/assets/hotel/day-fog.svg';
import DayPartiallyClearWithRain from '@/assets/hotel/day-partially-clear-with-rain.svg';
import DaySnowing from '@/assets/hotel/day-snowing.svg';
import DayThunderstorm from '@/assets/hotel/day-thunderstorm.svg';
import dayCloudySvg from '@/assets/hotel/day-cloudy.svg';


const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [8,9,10,11,12,13,14,19,20,29,30,31,32,38,39],
    isSnowing: [23, 37, 42],
  };

  const weatherIcons = {
    day: {
        isThunderstorm: DayThunderstorm,
        isClear: DayClear,
        isCloudyFog: DayCloudyFog,
        isCloudy: DayCloudy,
        isFog: DayFog,
        isPartiallyClearWithRain: DayPartiallyClearWithRain,
        isSnowing: DaySnowing,
    },   
};
  
  const weatherCode2Type = (weatherCode) => {
    const [weatherType] = Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
        weatherCodes.includes(Number(weatherCode))
    ) || [];
    return weatherType;
};

 // <img src={mySvg} alt="My SVG" />; 

 export default function WeatherIcon({ weatherCode }) {
    const weatherType = weatherCode2Type(weatherCode);
    const weatherIconSrc = weatherIcons.day[weatherType];

    return weatherIconSrc ? <img src={weatherIconSrc} alt={weatherType} /> : null;
}
   
  
