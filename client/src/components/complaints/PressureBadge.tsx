interface PressureBadgeProps {
  score: number;
}

const getLevel = (score: number) => {
  if (score >= 500) return { label: 'CRITICAL', color: 'text-purple-400 bg-purple-900/40 border-purple-700' };
  if (score >= 250) return { label: 'HIGH', color: 'text-red-400 bg-red-900/40 border-red-700' };
  if (score >= 100) return { label: 'MEDIUM', color: 'text-orange-400 bg-orange-900/40 border-orange-700' };
  if (score >= 50)  return { label: 'LOW', color: 'text-yellow-400 bg-yellow-900/40 border-yellow-700' };
  return { label: 'MINIMAL', color: 'text-gray-400 bg-gray-800 border-gray-600' };
};

export default function PressureBadge({ score }: PressureBadgeProps) {
  const { label, color } = getLevel(score);

  return (
    <div className={`border rounded-xl px-3 py-2 text-center ${color}`}>
      <p className="text-2xl font-black leading-none">{score}</p>
      <p className="text-[10px] font-bold tracking-widest mt-0.5">{label}</p>
    </div>
  );
}
