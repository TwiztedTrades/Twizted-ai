export function makeTradeDecision({
  score,
  confidence,
  riskPercent,
  riskReward,
}: {
  score: number;
  confidence: number;
  riskPercent: number;
  riskReward: number;
}) {

  const MIN_SCORE = 80;
  const MIN_CONFIDENCE = 85;
  const MAX_RISK_PERCENT = 30;
  const MIN_RISK_REWARD = 2.0;

  const reasons: string[] = [];

  if (score < MIN_SCORE) {
    reasons.push("AI score below requirement");
  }

  if (confidence < MIN_CONFIDENCE) {
    reasons.push("Confidence too low");
  }

  if (riskPercent > MAX_RISK_PERCENT) {
    reasons.push("Risk is too high");
  }

  if (riskReward < MIN_RISK_REWARD) {
    reasons.push("Risk/Reward below 2:1 requirement");
  }

  const approved =
    score >= MIN_SCORE &&
    confidence >= MIN_CONFIDENCE &&
    riskPercent <= MAX_RISK_PERCENT &&
    riskReward >= MIN_RISK_REWARD;

  if (approved) {
    return {
      decision: "APPROVED",
      action: "ENTER TRADE",
      reasons: [
        "AI score meets minimum requirement",
        "Confidence is strong",
        "Risk is controlled",
        "Reward meets minimum 2:1 requirement",
      ],
    };
  }

  return {
    decision: "PASS",
    action: "NO TRADE",
    reasons,
  };
}
