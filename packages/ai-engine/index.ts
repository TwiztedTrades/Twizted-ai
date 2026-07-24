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

export function analyzeTrade({
  ticker,
  pattern,
  momentum,
  volume,
  risk,
  entry,
  stop,
  target,
}: {
  ticker: string;
  pattern: number;
  momentum: number;
  volume: number;
  risk: number;
  entry: number;
  stop: number;
  target: number;
}) {
  const score = calculateAIscore({
    pattern,
    momentum,
    volume,
    risk,
  });

  let grade = "C";
  if (score >= 90) grade = "A+";
  else if (score >= 85) grade = "A";
  else if (score >= 80) grade = "A-";
  else if (score >= 75) grade = "B+";
  else if (score >= 70) grade = "B";

  const confidence = Math.min(score + 5, 99);

  const riskReward = (
    (target - entry) /
    (entry - stop)
  ).toFixed(2);

  return {
    ticker,
    score,
    grade,
    confidence,
    signal: score >= 80 ? "BREAKOUT WATCH" : "WATCHLIST",
    entry,
    stop,
    target,
    riskReward,
  };
}