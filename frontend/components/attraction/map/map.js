import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

function LeafletMap({ chickMapData }) {
  const [mapData, setMapData] = useState([]);
  const [mymap, setMymap] = useState(null);
  const [chickMap, setChickMap] = useState();

  useEffect(() => {
    setChickMap(chickMapData);
  }, [chickMapData]);

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

  useEffect(() => {
    if (mapData.length > 0 && !mymap) {
      const center = [22.6, 120.3];
      const mapInstance = L.map('map').setView(center, 17);
      const OSMUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
      L.tileLayer(OSMUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors...',
        zoomControl: true,
      }).addTo(mapInstance);

      const greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      mapData.forEach(data => {
        const marker = L.marker([data.lat, data.lng], { icon: greenIcon }).addTo(mapInstance);
        marker.bindPopup(data.attraction_name).openPopup();
        const circle = L.circle([data.lat, data.lng], {
          color: '#137976',
          fillColor: 'gold',
          fillOpacity: 0.4,
          radius: 100,
        }).addTo(mapInstance);
      });

      setMymap(mapInstance);
    }
  }, [mapData, mymap]);

  useEffect(() => {
    if (chickMapData && mymap) {
      const { lat, lng } = chickMapData;
      mymap.setView([lat, lng], 17);
    }
  }, [chickMapData, mymap]);

  useEffect(() => {
    if (chickMapData.length > 0 && mymap) {
      chickMapData.forEach(data => {
        const marker = L.marker([data.lat, data.lng], { icon: greenIcon }).addTo(mymap);
        marker.bindPopup(data.attraction_name).openPopup();
        const circle = L.circle([data.lat, data.lng], {
          color: '#137976',
          fillColor: 'gold',
          fillOpacity: 0.4,
          radius: 100,
        }).addTo(mymap);
      });
    }
  }, [chickMapData, mymap]);

  return <div id="map" style={{ height: '100vh', width: '75vw', position: 'absolute', right: '0', top: '0', zIndex: '0' }} />;
}

export default LeafletMap;