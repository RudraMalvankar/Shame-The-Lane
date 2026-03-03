import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import IssueMarkers from './IssueMarkers';
import HeatmapLayer from './HeatmapLayer';
import { getNearbyComplaints } from '../../api/complaintsApi';
import { getUserLocation } from '../../utils/mapUtils';

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // India center
const DEFAULT_ZOOM = 5;

export default function RageMap() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        setCenter([coords.lat, coords.lng]);
        setZoom(12);
        return getNearbyComplaints(coords.lat, coords.lng, 10000);
      })
      .then(setComplaints)
      .catch(() => {
        // Fallback to all complaints
      });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setShowHeatmap((v) => !v)}
          className={`px-3 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors ${
            showHeatmap
              ? 'bg-rage-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔥 Heatmap
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
        />

        {showHeatmap ? (
          <HeatmapLayer complaints={complaints} />
        ) : (
          <IssueMarkers complaints={complaints} />
        )}
      </MapContainer>
    </div>
  );
}
