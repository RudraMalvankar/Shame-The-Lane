export interface Coords {
  lat: number;
  lng: number;
}

/**
 * Get the user's current GPS location.
 */
export const getUserLocation = (): Promise<Coords> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000 }
    );
  });

/**
 * Returns a hex color string for a given complaint category.
 */
export const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    road: '#f97316',
    water: '#3b82f6',
    electricity: '#eab308',
    garbage: '#22c55e',
    sewage: '#a16207',
    encroachment: '#ef4444',
    corruption: '#a855f7',
    noise: '#ec4899',
    other: '#6b7280',
  };
  return map[category] ?? map.other;
};

/**
 * Calculates the bounding box for an array of coordinates.
 */
export const getBounds = (
  coords: [number, number][]
): [[number, number], [number, number]] => {
  const lats = coords.map((c) => c[0]);
  const lngs = coords.map((c) => c[1]);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
};
