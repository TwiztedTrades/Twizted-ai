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
export function generateTradeThesis({
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

  const reasons: string[] = [];

  if (pattern >= 80)
    reasons.push("✓ Strong chart pattern");

  if (momentum >= 75)
    reasons.push("✓ Momentum supports continuation");

  if (volume >= 80)
    reasons.push("✓ Above-average buying volume");

  if (risk >= 70)
    reasons.push("✓ Risk remains acceptable");

  if (reasons.length === 0)
    reasons.push("Mixed technical picture");

  let summary = "";

  if (pattern >= 80 && momentum >= 75)
    summary =
      "High probability breakout if price confirms above the trigger.";

  else if (pattern >= 70)
    summary =
      "Constructive setup that needs additional confirmation.";

  else
    summary =
      "Monitor only until technical conditions improve.";

  return {
    reasons,
    summary,
  };
}
export function calculatePositionRisk({
  contractValue,
  actualLoss,
  maxRiskPercent = 30,
}: {
  contractValue: number;
  actualLoss: number;
  maxRiskPercent?: number;
}) {

  const riskPercent =
    contractValue > 0
      ? (actualLoss / contractValue) * 100
      : 100;

  const approved =
    riskPercent <= maxRiskPercent;
  return {
    contractValue,
    actualLoss,
    riskPercent: Number(riskPercent.toFixed(2)),
    maxRiskPercent,
    approved,
    status: approved
      ? "RISK APPROVED"
      : "RISK TOO HIGH",
  };
}

export { makeTradeDecision } from "./decisionEngine";

export { selectTopTrade } from "./topTrade";

export { calculatePositionSize } from "./positionSizer";

export { calculateConviction } from "./convictionEngine";

export { calculateTarget } from "./targetEngine";

export { calculateRisk } from "./riskEngine";

export { calculateContractSize } from "./contractSizer";

export { approvalGate } from "./approvalGate";

export type { TopTrade } from "./topTrade";
