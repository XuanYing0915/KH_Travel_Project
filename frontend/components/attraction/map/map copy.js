import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.js';
import 'leaflet.marker.highlight/dist/leaflet.marker.highlight.css';

function RecenterAutomatically({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
}

function LeafletMap({ chickMapData }) {
  const [mapData, setMapData] = useState([]);
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
  });

  const redIcon = new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/attraction');
        setMapData(response.data);
      } catch (error) {
        console.error('錯誤:', error);
      }
    };
    fetchData();
  }, []);

  // 地圖大小+位置
  return (
    <div style={{ height: '90vh', width: '75vw', position: 'absolute', right: '0px', top: '100px', zIndex: '0' }}>
      <MapContainer center={[chickMapData.lat, chickMapData.lng]} zoom={17} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors...'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 在這裡放置你的標記和其他元素 */}
        {chickMapData.lat !== undefined && chickMapData.lng !== undefined && (
          <Marker position={[chickMapData.lat, chickMapData.lng]} icon={redIcon} />
        )}
        {chickMapData.lat !== undefined && chickMapData.lng !== undefined && (
          <RecenterAutomatically lat={chickMapData.lat} lng={chickMapData.lng} />
        )}
      </MapContainer>
    </div>
  );
}

export default LeafletMap;