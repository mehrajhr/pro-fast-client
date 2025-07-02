import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../../data/warehouses.json'

// Custom icon
const branchIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Your full 64-district data here (shortened for brevity in this example)
const branchData = data;

const BangladeshMap = () => {
  const center = [23.6850, 90.3563]; // Bangladesh center

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
      <MapContainer center={center} zoom={7} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        {branchData.map((branch, index) => (
          <Marker
            key={index}
            position={[branch.latitude, branch.longitude]}
            icon={branchIcon}
          >
            <Popup>
              <h2 className="font-bold text-lg">{branch.district}</h2>
              <p><strong>City:</strong> {branch.city}</p>
              <p><strong>Areas:</strong> {branch.covered_area.join(', ')}</p>
              <a href={branch.flowchart} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                View Flowchart
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
