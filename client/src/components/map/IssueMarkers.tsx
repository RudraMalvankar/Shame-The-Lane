import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor } from '../../utils/mapUtils';

interface IssueMarkersProps {
  complaints: Array<{
    _id: string;
    cleanTitle: string;
    category: string;
    pressureScore: number;
    status: string;
    location: { coordinates: [number, number]; address: string };
  }>;
}

const createIcon = (category: string, pressureScore: number) => {
  const color = getCategoryColor(category);
  const size = Math.min(20 + pressureScore / 10, 48);
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:2px solid #fff;
      border-radius:50%;
      opacity:0.9;
      box-shadow: 0 0 ${size / 2}px ${color};
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function IssueMarkers({ complaints }: IssueMarkersProps) {
  const navigate = useNavigate();

  return (
    <>
      {complaints.map((c) => {
        const [lng, lat] = c.location.coordinates;
        return (
          <Marker
            key={c._id}
            position={[lat, lng]}
            icon={createIcon(c.category, c.pressureScore)}
          >
            <Popup>
              <div className="min-w-[200px]">
                <p className="font-semibold text-sm">{c.cleanTitle}</p>
                <p className="text-xs text-gray-400 mt-1">{c.location.address}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                    {c.category}
                  </span>
                  <span className="text-xs text-rage-400 font-bold">
                    🔥 {c.pressureScore}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/issue/${c._id}`)}
                  className="mt-2 w-full text-center text-xs text-rage-400 hover:underline"
                >
                  View details →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
