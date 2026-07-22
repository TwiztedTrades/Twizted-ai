export function calculateAIscore({
  pattern,
  momentum,
  volume,
  risk,
}: {
  pattern: number;
  momentum: number;
  volume: number;
  risk: number;
}) {

  const score =
    pattern * 0.35 +
    momentum * 0.25 +
    volume * 0.25 +
    risk * 0.15;

  return Math.round(score);
}