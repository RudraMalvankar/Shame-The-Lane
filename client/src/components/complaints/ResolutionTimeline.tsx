import { useEffect, useState } from 'react';
import { http } from '../../api/http';

interface Resolution {
  _id: string;
  description: string;
  evidenceImages: string[];
  verifiedByAdmin: boolean;
  verifiedAt?: string;
  resolvedBy: { name: string; role: string };
  createdAt: string;
}

interface ResolutionTimelineProps {
  complaintId: string;
}

export default function ResolutionTimeline({ complaintId }: ResolutionTimelineProps) {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get<{ data: Resolution[] }>(`/complaints/${complaintId}/resolutions`)
      .then((res) => setResolutions(res.data.data))
      .finally(() => setLoading(false));
  }, [complaintId]);

  if (loading) return null;

  return (
    <div className="card">
      <h2 className="font-semibold text-lg mb-4">📜 Resolution Timeline</h2>
      {resolutions.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No resolutions yet. Keep the pressure on! 🔥
        </p>
      ) : (
        <div className="space-y-4">
          {resolutions.map((r, idx) => (
            <div key={r._id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                    r.verifiedByAdmin ? 'bg-civic-500' : 'bg-yellow-500'
                  }`}
                />
                {idx < resolutions.length - 1 && (
                  <div className="w-px flex-1 bg-gray-700 mt-1" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{r.resolvedBy.name}</span>
                  <span className="text-xs text-gray-500 capitalize">
                    ({r.resolvedBy.role})
                  </span>
                  {r.verifiedByAdmin && (
                    <span className="text-xs bg-green-900 text-green-300 px-1.5 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300">{r.description}</p>
                {r.evidenceImages.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {r.evidenceImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Evidence"
                        className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                      />
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(r.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
