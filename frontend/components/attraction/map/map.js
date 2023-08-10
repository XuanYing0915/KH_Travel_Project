import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.js'
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.css'

function LeafletMap({ chickMapData, OffcanvasShow }) {
  const [mapData, setMapData] = useState([])
  const [mymap, setMymap] = useState(null)
  const [chickMap, setChickMap] = useState()
  const [center, setCenter] = useState([22.6, 120.3]) // 设置默认中心点坐标

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

  useEffect(() => {
    setChickMap(chickMapData)
  }, [chickMapData])

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

  useEffect(() => {
    if (mapData.length > 0 && !mymap) {
      const map = L.map('map').setView(center, 17) // 使用默认中心点坐标
      const OSMUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      L.tileLayer(OSMUrl, {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors...',
        zoomControl: true,
      }).addTo(map)

      mapData.forEach((data) => {
        const marker = L.marker([data.lat, data.lng], {
          icon: greenIcon,
          highlight: 'temporary', //點擊高亮
        }).addTo(map)
        // marker.bindPopup(data.attraction_name).openPopup();
        marker.bindTooltip(data.attraction_name, {
          direction: 'bottom', //方向
          sticky: false, // true 跟著滑鼠移動。default: false
          permanent: false, // 是滑鼠移過才出現
          opacity: 1.0,
        })
         
        marker.on('click', function (e) {
          // console.log(e.target.options.highlight)
          // console.log(e.target.options.highlight === 'temporary')
          if (e.target.options.highlight === 'temporary') {
            e.target.options.highlight = 'permanent'
            e.target.setIcon(redIcon)
          } else {
            e.target.options.highlight = 'temporary'
            e.target.setIcon(greenIcon)
          }
        }
        )
      })

      setMymap(map)
    }
  }, [mapData, mymap])

  useEffect(() => {
    if (
      chickMapData &&
      chickMapData.lat !== undefined &&
      chickMapData.lng !== undefined &&
      mymap
    ) {
      const Chicklat = chickMapData.lat
      const Chicklng = chickMapData.lng
      setCenter([Chicklat, Chicklng]) // 更新中心点坐标
      mymap.flyTo([Chicklat, Chicklng], {
        animate: true,
        duration: 2,
        zoom: 14,
      })
    }
  }, [chickMapData, mymap])

  useEffect(() => {
    if (chickMapData.length > 0 && mymap) {
      chickMapData.forEach((data) => {
        const marker = L.marker([data.lat, data.lng], {
          icon: redIcon,
          highlight: 'permanent',
        }).addTo(mymap)
        marker.bindPopup(data.attraction_name).openPopup()

        // const circle = L.circle([data.lat, data.lng], {
        //   color: '#137976',
        //   fillColor: 'gold',
        //   fillOpacity: 0.3,
        //   radius: 100,
        // }).addTo(mymap);
      })
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
