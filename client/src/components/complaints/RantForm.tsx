import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComplaint } from '../../api/complaintsApi';
import { useAuth } from '../../hooks/useAuth';
import { getUserLocation } from '../../utils/mapUtils';

export default function RantForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rant, setRant] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locating, setLocating] = useState(false);

  const autoLocate = async () => {
    setLocating(true);
    try {
      const coords = await getUserLocation();
      // Reverse geocode (simplified – use a real geocoding API in production)
      setAddress(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
    } finally {
      setLocating(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setError('');
    setLoading(true);
    try {
      const complaint = await createComplaint({
        rawRant: rant,
        location: {
          type: 'Point',
          coordinates: [0, 0], // TODO: real geocoding
          address,
          city,
          state,
        },
        isAnonymous,
      });
      navigate(`/issue/${complaint._id}`);
    } catch (err: any) {
      setError(err.message ?? 'Failed to post rant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Your Rant <span className="text-rage-500">*</span>
        </label>
        <textarea
          value={rant}
          onChange={(e) => setRant(e.target.value)}
          className="input min-h-[160px] resize-y"
          placeholder="The road outside my house has more craters than the moon and nobody cares!! It's been 6 months..."
          required
          maxLength={5000}
        />
        <p className="text-xs text-gray-500 mt-1 text-right">{rant.length}/5000</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Address <span className="text-rage-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input flex-1"
              placeholder="Street / area"
              required
            />
            <button
              type="button"
              onClick={autoLocate}
              className="btn-secondary text-sm shrink-0"
              disabled={locating}
            >
              {locating ? '…' : '📍'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            City <span className="text-rage-500">*</span>
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
            placeholder="Mumbai"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            State <span className="text-rage-500">*</span>
          </label>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input"
            placeholder="Maharashtra"
            required
          />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 rounded"
        />
        <span className="text-sm text-gray-300">Post anonymously</span>
      </label>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            AI is processing your rant…
          </span>
        ) : (
          '🚀 Submit Rant → AI will clean it up'
        )}
      </button>
    </form>
  );
}
