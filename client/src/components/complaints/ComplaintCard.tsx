import { Link } from 'react-router-dom';
import PressureBadge from './PressureBadge';
import Tag from '../common/Tag';

interface ComplaintCardProps {
  complaint: {
    _id: string;
    cleanTitle: string;
    cleanDescription: string;
    category: string;
    status: string;
    pressureScore: number;
    voteCount: number;
    location: { city: string; address: string };
    author?: { name: string };
    isAnonymous: boolean;
    createdAt: string;
  };
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  const authorName = complaint.isAnonymous
    ? 'Anonymous'
    : complaint.author?.name ?? 'Unknown';

  return (
    <Link to={`/issue/${complaint._id}`} className="block">
      <div className="card hover:border-gray-600 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Tag>{complaint.category}</Tag>
              <span className={`badge-${complaint.status} capitalize`}>
                {complaint.status.replace('_', ' ')}
              </span>
            </div>
            <h3 className="font-semibold text-base truncate">
              {complaint.cleanTitle}
            </h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {complaint.cleanDescription}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span>📍 {complaint.location.city}</span>
              <span>👤 {authorName}</span>
              <span>
                📅{' '}
                {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <PressureBadge score={complaint.pressureScore} />
            <p className="text-center text-xs text-gray-500 mt-1">
              {complaint.voteCount} votes
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
