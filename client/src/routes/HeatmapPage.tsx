import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_CENTER: [number, number] = [19.076, 72.8777];
const MAP_ZOOM = 12;

const CATEGORIES = ['All', 'Roads', 'Sanitation', 'Water', 'Lights', 'Encroachment'];

interface WardPoint {
  id: string;
  ward: string;
  lat: number;
  lng: number;
  pressure: number;
  count: number;
  category: string;
  topIssue: string;
}

const WARD_DATA: WardPoint[] = [
  { id: '1', ward: 'Dharavi', lat: 19.037, lng: 72.852, pressure: 94, count: 217, category: 'Sanitation', topIssue: 'Sewage overflow' },
  { id: '2', ward: 'Andheri East', lat: 19.115, lng: 72.871, pressure: 87, count: 183, category: 'Roads', topIssue: 'Pothole cluster' },
  { id: '3', ward: 'Kurla West', lat: 19.071, lng: 72.882, pressure: 72, count: 98, category: 'Lights', topIssue: 'Street lights dead' },
  { id: '4', ward: 'Ghatkopar', lat: 19.086, lng: 72.908, pressure: 81, count: 156, category: 'Sanitation', topIssue: 'Illegal garbage burning' },
  { id: '5', ward: 'Mulund East', lat: 19.172, lng: 72.952, pressure: 67, count: 74, category: 'Water', topIssue: 'No supply 9 days' },
  { id: '6', ward: 'Dadar West', lat: 19.018, lng: 72.840, pressure: 58, count: 62, category: 'Encroachment', topIssue: 'Footpath blocked' },
  { id: '7', ward: 'Bandra East', lat: 19.054, lng: 72.840, pressure: 76, count: 112, category: 'Roads', topIssue: 'Substandard repair' },
  { id: '8', ward: 'Chembur', lat: 19.062, lng: 72.899, pressure: 69, count: 88, category: 'Sanitation', topIssue: 'Nala blockage' },
  { id: '9', ward: 'Colaba', lat: 18.916, lng: 72.828, pressure: 44, count: 31, category: 'Lights', topIssue: 'Signal outage' },
  { id: '10', ward: 'Malad West', lat: 19.187, lng: 72.849, pressure: 61, count: 79, category: 'Water', topIssue: 'Pressure too low' },
];

function getPressureColor(pressure: number): string {
  if (pressure >= 80) return '#ef4444';
  if (pressure >= 60) return '#f97316';
  if (pressure >= 40) return '#eab308';
  return '#22c55e';
}

function getPressureRadius(pressure: number): number {
  return 10 + (pressure / 100) * 28;
}

function LiveCount({ count }: { count: number }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(count), 200);
    return () => clearTimeout(timer);
  }, [count]);
  return <span>{displayed.toLocaleString()}</span>;
}

export default function HeatmapPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? WARD_DATA
    : WARD_DATA.filter(w => w.category === activeCategory);

  const totalComplaints = filtered.reduce((s, w) => s + w.count, 0);

  return (
    <div className="relative h-full flex flex-col overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      {/* ── Top Control Bar ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 z-10 shrink-0"
        style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              LIVE —{' '}
              <span className="text-white font-bold">
                <LiveCount count={totalComplaints} />
              </span>{' '}
              active pressure points
            </span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pill shrink-0 text-[11px] ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map ── */}
      <div className="flex-1 relative">
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filtered.map(ward => {
            const color = getPressureColor(ward.pressure);
            const radius = getPressureRadius(ward.pressure);
            return (
              <CircleMarker
                key={ward.id}
                center={[ward.lat, ward.lng]}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.18 + (ward.pressure / 100) * 0.25,
                  color: color,
                  weight: 1.5,
                  opacity: 0.7,
                }}
              >
                {/* Outer glow ring */}
                <CircleMarker
                  center={[ward.lat, ward.lng]}
                  radius={radius * 1.6}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.05,
                    color: color,
                    weight: 0.5,
                    opacity: 0.3,
                  }}
                />
                <Popup>
                  <div
                    className="p-1"
                    style={{ fontFamily: "'Inter', sans-serif", minWidth: '200px' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {ward.ward}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-md"
                        style={{
                          background: `${color}20`,
                          color,
                          border: `1px solid ${color}40`,
                        }}
                      >
                        {ward.pressure}/100
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {ward.topIssue}
                    </p>
                    <div className="pressure-bar-track mb-2">
                      <div className="pressure-bar-fill" style={{ width: `${ward.pressure}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      <span>{ward.count} complaints</span>
                      <span style={{ color }}>{ward.category}</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* ── Pressure Legend ── */}
        <div
          className="absolute bottom-5 left-5 z-[1000] p-4 rounded-xl"
          style={{ background: 'rgba(10,10,15,0.9)', border: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
        >
          <p className="section-label mb-3">Pressure Level</p>
          <div className="space-y-2.5">
            {[
              { color: '#ef4444', label: 'Critical (80–100)', glow: true },
              { color: '#f97316', label: 'High (60–79)', glow: false },
              { color: '#eab308', label: 'Medium (40–59)', glow: false },
              { color: '#22c55e', label: 'Low (0–39)', glow: false },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    background: l.color,
                    boxShadow: l.glow ? `0 0 8px ${l.color}` : 'none',
                  }}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ward Stats Panel ── */}
        <div
          className="absolute top-4 right-4 z-[1000] w-56 p-4 rounded-xl"
          style={{ background: 'rgba(10,10,15,0.9)', border: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
        >
          <p className="section-label mb-3">Active Zones</p>
          <div className="space-y-2">
            {filtered
              .sort((a, b) => b.pressure - a.pressure)
              .slice(0, 5)
              .map(w => (
                <div key={w.id} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: getPressureColor(w.pressure),
                      boxShadow: w.pressure >= 80 ? `0 0 6px ${getPressureColor(w.pressure)}` : 'none',
                    }}
                  />
                  <span className="text-xs flex-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                    {w.ward}
                  </span>
                  <span
                    className="text-xs font-bold shrink-0"
                    style={{ color: getPressureColor(w.pressure) }}
                  >
                    {w.pressure}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
