import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.js'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.css'

function LeafletMap({ chickMapData, OffcanvasShow }) {
  const [mapData, setMapData] = useState([])//全部景點資料
  const [mymap, setMymap] = useState(null) //地圖
  const [chickMap, setChickMap] = useState() //點擊景點資料
  const [center, setCenter] = useState([22.61, 120.3008])  //地圖中心點

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
      const map = L.map('map').setView(center, 17) 
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
// 點擊景點卡時地圖移動到該景點
  useEffect(() => {
    console.log(chickMapData)
    if (
      chickMapData.length>0 &&
      chickMapData[0].lat !== undefined &&
      chickMapData[0].lng !== undefined &&
      mymap
    ) {
  console.log(chickMapData,mymap)
  chickMapData.forEach((data) => {
    const marker = L.marker([data.lat, data.lng], {
      icon: redIcon,
      highlight: 'permanent',
    }).addTo(mymap)
    marker.bindPopup(data.attraction_name).openPopup()    
  })
      const Chicklat = Number(chickMapData[0].lat)
      const Chicklng = Number(chickMapData[0].lng)
      mymap.flyTo([Chicklat, Chicklng])
      // mymap.flyTo([Chicklat, Chicklng], {
      //   animate: true,
      //   duration: 2,
      //   zoom: 14,
      // })
    }
  }, [chickMapData, mymap])



  // 地圖大小+位置
  return (
    <div
      id="map"
      style={{
        height: '90%',
        width: '75%',
        position: 'absolute',
        right: '0px',
        top: '100px',
        zIndex: '0',
      }}
    />
  )
}

export default LeafletMap
