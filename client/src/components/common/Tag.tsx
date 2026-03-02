import { ReactNode } from 'react';

const CATEGORY_COLORS: Record<string, string> = {
  road: 'bg-orange-900/50 text-orange-300',
  water: 'bg-blue-900/50 text-blue-300',
  electricity: 'bg-yellow-900/50 text-yellow-300',
  garbage: 'bg-green-900/50 text-green-300',
  sewage: 'bg-brown-900/50 text-amber-300',
  encroachment: 'bg-red-900/50 text-red-300',
  corruption: 'bg-purple-900/50 text-purple-300',
  noise: 'bg-pink-900/50 text-pink-300',
  other: 'bg-gray-800 text-gray-300',
};

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  const cat = String(children).toLowerCase();
  const colorClass = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.other;

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
}
