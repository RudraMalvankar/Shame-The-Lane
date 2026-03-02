export type PressureLevel = 'minimal' | 'low' | 'medium' | 'high' | 'critical';

export interface PressureInfo {
  level: PressureLevel;
  label: string;
  color: string;
  emoji: string;
  nextThreshold: number | null;
}

const THRESHOLDS: Array<{ score: number; level: PressureLevel; label: string; emoji: string; color: string }> = [
  { score: 500, level: 'critical', label: 'CRITICAL', emoji: '🚨', color: '#a855f7' },
  { score: 250, level: 'high',     label: 'HIGH',     emoji: '🔥', color: '#ef4444' },
  { score: 100, level: 'medium',   label: 'MEDIUM',   emoji: '⚡', color: '#f97316' },
  { score: 50,  level: 'low',      label: 'LOW',      emoji: '📢', color: '#eab308' },
  { score: 0,   level: 'minimal',  label: 'MINIMAL',  emoji: '💤', color: '#6b7280' },
];

export const getPressureInfo = (score: number): PressureInfo => {
  for (let i = 0; i < THRESHOLDS.length; i++) {
    if (score >= THRESHOLDS[i].score) {
      const next = i > 0 ? THRESHOLDS[i - 1].score : null;
      return {
        level: THRESHOLDS[i].level,
        label: THRESHOLDS[i].label,
        emoji: THRESHOLDS[i].emoji,
        color: THRESHOLDS[i].color,
        nextThreshold: next,
      };
    }
  }
  return {
    level: 'minimal',
    label: 'MINIMAL',
    emoji: '💤',
    color: '#6b7280',
    nextThreshold: 50,
  };
};

export const getProgressToNextThreshold = (score: number): number => {
  const info = getPressureInfo(score);
  if (!info.nextThreshold) return 100;
  const current = THRESHOLDS.find((t) => t.level === info.level)?.score ?? 0;
  return Math.min(
    ((score - current) / (info.nextThreshold - current)) * 100,
    100
  );
};
