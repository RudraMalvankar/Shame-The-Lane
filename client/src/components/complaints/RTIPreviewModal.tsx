import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { getRtiDraft, generateRti } from '../../api/rtiApi';
import { useAuth } from '../../hooks/useAuth';

interface RTIPreviewModalProps {
  complaintId: string;
  onClose: () => void;
}

export default function RTIPreviewModal({
  complaintId,
  onClose,
}: RTIPreviewModalProps) {
  const { user } = useAuth();
  const [draft, setDraft] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    getRtiDraft(complaintId)
      .then((data) => setDraft(data.rtiDraft ?? null))
      .finally(() => setLoading(false));
  }, [complaintId]);

  const handleGenerate = async () => {
    if (!user) return;
    setGenerating(true);
    try {
      const result = await generateRti(complaintId, { address: 'Address on file' });
      setDraft(result.rtiLetter);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (draft) navigator.clipboard.writeText(draft);
  };

  return (
    <Modal title="📋 RTI Draft" onClose={onClose}>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rage-500" />
        </div>
      ) : draft ? (
        <div className="space-y-4">
          <pre className="bg-gray-800 rounded-lg p-4 text-xs text-gray-300 whitespace-pre-wrap max-h-96 overflow-y-auto font-mono">
            {draft}
          </pre>
          <div className="flex gap-3">
            <button onClick={handleCopy} className="btn-secondary flex-1 text-sm">
              📋 Copy Text
            </button>
            <a
              href="https://rtionline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-sm text-center"
            >
              🏛️ File on RTI Portal
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-400">No RTI draft yet.</p>
          {user && (
            <button
              onClick={handleGenerate}
              className="btn-primary"
              disabled={generating}
            >
              {generating ? 'Generating with AI…' : '🤖 Generate RTI Draft'}
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}
