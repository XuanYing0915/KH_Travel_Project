import React, { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.js'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.css'
// import { Numbers } from '@mui/icons-material'

function LeafletMap({ chickMapData, OffcanvasShow }) {
  const [mapData, setMapData] = useState([]) //全部景點資料
  const [mymap, setMymap] = useState(null) //地圖
  const mapRef = useRef(null) // 用來保存地圖的參考
  const [chickMap, setChickMap] = useState() //點擊景點資料
  const [center, setCenter] = useState([22.6, 120.3008]) //地圖中心點

  // 畫線
  const [newPoint, setnewPoint] = useState(null) // 目前第點的座標
  const [prePoint, setPrePoint] = useState(null) // 上一地點的座標
  const [linePoint, setLinePoint] = useState([]) // 用來保存畫線條的座標

  // 保存地圖大小改變
  const [windowHeight, setWindowHeight] = useState('')
  const [windowWidth, setwindowWidth] = useState('')

  // 定義圖標
  const greenIcon = new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
  // 點擊景點圖標
  const redIcon = new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
  // 設定點擊景點時傳入資料
  useEffect(() => {
    setChickMap(chickMapData)
  }, [chickMapData])
  // 抓全部景點資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/attraction')
        setMapData(response.data)
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
    fetchData()
  }, [])
  // 建立地圖
  useEffect(() => {
    if (mapData.length > 0 && !mymap) {
      const map = L.map('map').setView(center, 14)
      const OSMUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      L.tileLayer(OSMUrl, {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors...',
        zoomControl: true,
      }).addTo(map)
      // 設立全部景點的marker
      mapData.forEach((data) => {
        const marker = L.marker([data.lat, data.lng], {
          icon: greenIcon,
          highlight: 'temporary', //點擊高亮
        }).addTo(map)
        // marker.bindPopup(data.attraction_name).openPopup();
        // 增加提示框
        marker.bindTooltip(data.attraction_name, {
          direction: 'bottom', //方向
          sticky: false, // true 跟著滑鼠移動。default: false
          permanent: false, // 是滑鼠移過才出現
          opacity: 1.0,
        })
        //  點即景點把綠標切換成紅標
        // marker.on('click', function (e) {
        //   // console.log(e.target.options.highlight)
        //   // console.log(e.target.options.highlight === 'temporary')
        //   if (e.target.options.highlight === 'temporary') {
        //     e.target.options.highlight = 'permanent'
        //     e.target.setIcon(redIcon)
        //   } else {
        //     e.target.options.highlight = 'temporary'
        //     e.target.setIcon(greenIcon)
        //   }
        // }
        // )
      })

      setMymap(map)
    }
  }, [mapData, mymap])
  let Chicklat, Chicklng, aName
  const linePoints = [] // 建立新的線條座標陣列

  // 點擊景點卡時地圖移動到該景點
  useEffect(() => {
    if (
      chickMapData.length > 0 &&
      chickMapData[0].lat !== undefined &&
      chickMapData[0].lng !== undefined &&
      mymap
    ) {
      // console.log('點擊景點資料:', chickMapData)
      // console.log('點擊景點資料長度:', chickMapData[0].attraction_name)
      //增加點擊景點的marker
      {
        chickMapData.map((v, i) => {
          const marker = L.marker([v.lat, v.lng], {
            icon: redIcon,
            highlight: 'temporary',
          }).addTo(mymap)
          // 增加提示框
          marker.bindPopup(v.attraction_name).openPopup()

          //存起始座標
          // setNewPoint([chickMapData[i].lat, chickMapData[i].lng])
          // console.log(
          //   '第一步取起始座標:',
          //   chickMapData[i].attraction_name,
          //   chickMapData[i].lat,
          //   chickMapData[i].lng
          // )
          // 抓取點擊景點的經緯度
          Chicklat = chickMapData[i].lat
          Chicklng = chickMapData[i].lng
          aName = chickMapData[i].attraction_name

          // linePoints.push({ lat: Chicklat, lng: Chicklng })
          linePoints.push([Chicklat, Chicklng])
          // setLinePoint((prevData) => [...prevData, ...lineNewPoint])
        })

        setPrePoint([Chicklat, Chicklng])
        // console.log('最後一步修改終點座標' + aName, Chicklat, Chicklng)
      }
      // console.log('線條參考:' + lineLayer[0])
      // 將地圖移動到點擊景點的位置
      mymap.flyTo([Chicklat, Chicklng])

      // 畫線
      // setPrePoint([Chicklat, Chicklng])
      // console.log('終點座標陣列' + prePoint)
    }
  }, [chickMapData, mymap])

  let lineGroup = []
  // 畫線
  useEffect(() => {
    if (linePoints.length > 1 && mymap) {
      if (lineGroup) {
        // console.log('清除線條')
        lineGroup.forEach((line) => {
          mymap.removeLayer(line)
        })
      }
      // 清除原本畫的線條
      // console.log('畫線座標陣列' + linePoints)
      lineGroup = linePoints.map((v, i) => {
        // console.log('畫線座標陣列' + v.lat)
        const line = L.polyline([linePoints], {
          // 樣式 金色線條
          color: 'orange',
          weight: 5,
          opacity: 0.5,
          smoothFactor: 1,
        }).addTo(mymap)
      })
      // console.log('畫出來的線條集合' + lineGroup)
    }
  }, [linePoints, mymap])

  // 地圖rwd設定長寬
  const changeWidth = () => {
    // 取得視窗寬度
    const windowWidth = window.innerWidth
    if (windowWidth > 1200) {
      document.getElementById('map').style.height = '90%'
      document.getElementById('map').style.width = '75%'
    } else if (windowWidth > 768) {
      document.getElementById('map').style.height = '90%'
      document.getElementById('map').style.width = '68%'
      document.getElementById('map').style.zIndex = '1'
    } else {
      document.getElementById('map').style.height = '40%'
      document.getElementById('map').style.width = '100%'
      document.getElementById('map').style.zIndex = '3'
    }
    if (mymap) {
      mymap.invalidateSize(true)
    }
  }

  // 監聽視窗寬度的變化
  useEffect(() => {
    // 初始設置
    changeWidth()

    // 監聽視窗大小變化
    window.addEventListener('resize', changeWidth)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  // 地圖大小+位置
  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        height: '90%',
        width: '75%',
        position: 'absolute',
        right: '0px',
        top: '100px',
        zIndex: '1',
      }}
    />
  )
}

export default LeafletMap
