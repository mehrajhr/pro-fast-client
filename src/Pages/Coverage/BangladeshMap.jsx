import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "../../../data/warehouses.json";
import { FiSearch } from "react-icons/fi";

// fly to location
const FlyToLocation = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 12, {
      duration: 1.5,
    });
  }
  return null;
};

// Custom icon
const branchIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Your full 64-district data here (shortened for brevity in this example)
const branchData = data;

const BangladeshMap = () => {
  const [searchText, setSearchText] = useState("");
  const [flyToPos, setFlyToPos] = useState(null);
  const mapRef = useRef();

  const handleSearch = () => {
    const found = branchData.find(
      (item) =>
        item.district.toLowerCase() === searchText.toLowerCase() ||
        item.city.toLowerCase() === searchText.toLowerCase()
    );
    if (found) {
      setFlyToPos([found.latitude, found.longitude]);
    } else {
      alert("District or city not found.");
    }
  };

  return (
    <div className="space-y-8">
      {/* ✅ Title & Search */}
      <div className="text-center space-y-4">
        <div className="max-w-xl mx-auto flex items-center rounded-full overflow-hidden shadow-md border border-gray-200">
          <div className="px-4 text-gray-500 text-xl">
            <FiSearch />
          </div>
          <input
            type="text"
            placeholder="Search district or city..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 py-3 px-2 outline-none"
          />
          <button onClick={handleSearch} className="bg-lime-400 hover:bg-lime-500 text-white font-semibold px-6 py-2 rounded-full mr-2 transition duration-300">
            Search
          </button>
        </div>
      </div>

      {/* ✅ Map */}
      <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-md">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />

          {/* Zoom to search location */}
          <FlyToLocation position={flyToPos} />

          {/* Markers */}
          {branchData.map((branch, index) => (
            <Marker
              key={index}
              position={[branch.latitude, branch.longitude]}
              icon={branchIcon}
            >
              <Popup>
                <h2 className="font-bold text-lg">{branch.district}</h2>
                <p>
                  <strong>City:</strong> {branch.city}
                </p>
                <p>
                  <strong>Areas:</strong> {branch.covered_area.join(", ")}
                </p>
                <a
                  href={branch.flowchart}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
