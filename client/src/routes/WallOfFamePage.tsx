import { useEffect, useState } from 'react';
import { http } from '../api/http';

interface FameEntry {
  _id: string;
  total: number;
  resolved: number;
  resolutionRate: number;
}

export default function WallOfFamePage() {
  const [data, setData] = useState<FameEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get<{ data: FameEntry[] }>('/admin/wall-of-fame')
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-civic-500">🏆 Wall of Fame</h1>
        <p className="text-gray-400 mt-2">
          Cities and departments leading by example in civic accountability.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-civic-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((entry, idx) => (
            <div key={entry._id} className="card flex items-center gap-4">
              <span className="text-3xl font-black text-gray-600 w-10">
                #{idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-bold text-lg">{entry._id}</p>
                <p className="text-sm text-gray-400">
                  {entry.resolved} / {entry.total} resolved
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-civic-500">
                  {(entry.resolutionRate * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500">resolution rate</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
