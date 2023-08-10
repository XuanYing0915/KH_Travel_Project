import React from 'react'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// 參考資料 : https://leafletjs.com/examples/quick-start/ & https://juejin.im/post/5cc192976fb9a032092e8e0a
class LeafletMap extends React.Component {
  componentDidMount() {
    const mymap = L.map('mapid').setView([22.6310304, 120.3003611], 15)

    const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer(OSMUrl).addTo(mymap)

    // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
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

    const marker = L.marker([25.03418, 121.564517], { icon: greenIcon }).addTo(
      mymap
    )

    marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()

    L.circle([25.03418, 121.564517], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(mymap)
  }

  render() {
    // 設定 height 顯示地圖 ( 預設值 height : 0 )
    return <div id="mapid" style={{ height: '100vh', width: '75vw',position:'absolute',right:'0',top:'0',zIndex:'0' }} />
  }
}

export default LeafletMap
