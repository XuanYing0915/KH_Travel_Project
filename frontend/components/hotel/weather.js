import React, { useState } from 'react'
// import mySvg from '@/components/hotel/daycloudy-SVG';

export default function Weather() {
    // const [currentTheme, setCurrentWrather] = useState(null);

 


    // const [currentWeather, setCurrentWeather] = useState({
    //     observationTime: '2020-12-12 22:10:00',
    //     locationName: '臺北市',
    //     description: '多雲時晴',
    //     windSpeed: 3.6,
    //     temperature: 32.1,
    //     rainPossibility: 60,
    //   });

  return (
    <>
    <h1>天氣</h1>
      <div className="container123">
        <div  className="weather-card">
            <location className="location">台北市</location>
            <div className="description">多雲時晴</div>      
            <div className="currentWeather">
                <div className="temperature">
                   23 <div className="celsius">°C</div>
                </div>
            </div>             
            {/* <img src={mySvg} alt="My SVG" />; */}
            <location className="airFlow">23 m/h</location>
            <div className="rain">48%</div>      
            <div className="refresh">最後觀測時間：上午 12:03</div>   
        </div>
      </div>
    {/* <ThemeProvider theme={theme[currentTheme]}>
        <Container>
            <WeatherCard>
                <Location>{currentWeather.locationName}</Location>
                <Description>{currentWeather.description}</Description>
                <CurrentWeather>
                    <Temperature>
                        {Math.round(currentWeather.temperature)} <Celsius>°C</Celsius>
                    </Temperature>
                    <DayCloudy />
                </CurrentWeather>
                <AirFlow>
                    <AirFlowIcon />{currentWeather.windSpeed} m/h
                </AirFlow>
                <Rain>
                    <RainIcon /> {CurrentWeather.rainPossibility}%
                </Rain>
                <Refresh>
                最後觀測時間：
                    {new Intl.DateTimeFormat('zh-TW', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(currentWeather.observationTime))} <RefreshIcon />
                </Refresh>
            </WeatherCard>
        </Container>
    </ThemeProvider> */}
    </>
  )
}
