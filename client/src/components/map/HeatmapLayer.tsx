import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface HeatmapLayerProps {
  complaints: Array<{
    location: { coordinates: [number, number] };
    pressureScore: number;
  }>;
}

/**
 * Leaflet heatmap layer using pressure scores as intensity.
 * Requires leaflet.heat – loaded via CDN or installed separately.
 */
export default function HeatmapLayer({ complaints }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!complaints.length) return;

    // Build heatmap data: [lat, lng, intensity]
    const points = complaints.map((c) => [
      c.location.coordinates[1], // lat
      c.location.coordinates[0], // lng
      Math.min(c.pressureScore / 100, 1), // normalised 0–1
    ]);

    // @ts-ignore – leaflet.heat is loaded globally
    if (typeof (window as any).L?.heatLayer === 'function') {
      // @ts-ignore
      const heat = (window as any).L.heatLayer(points, {
        radius: 35,
        blur: 20,
        maxZoom: 17,
        gradient: { 0.2: '#3b82f6', 0.5: '#f59e0b', 0.8: '#ef4444', 1.0: '#7c3aed' },
      }).addTo(map);

      return () => {
        heat.remove();
      };
    }
  }, [map, complaints]);

  return null;
}
