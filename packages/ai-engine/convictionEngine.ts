export function calculateConviction({
  score,
  confidence,
  riskReward,
  volume,
  momentum,
  pattern,
  risk,
}: {
  score: number;
  confidence: number;
  riskReward: number;
  volume: number;
  momentum: number;
  pattern: number;
  risk: number;
}) {
  /*
    ==========================================
    TWIZTED AI CONVICTION ENGINE v2.1
    ==========================================

    AI Score       = 25%
    Confidence     = 20%
    Momentum       = 15%
    Volume         = 15%
    Risk/Reward    = 15%
    Pattern         = 5%
    Risk Quality    = 5%

    TOTAL           = 100%
  */

  // Normalize Risk/Reward
  // 2:1 = 100
  // Anything above 2:1 gets no additional score

  const rrScore = Math.min(
    (riskReward / 2) * 100,
    100
  );

  // Keep values between 0 and 100

  const patternScore = Math.min(
    Math.max(pattern, 0),
    100
  );

  const riskScore = Math.min(
    Math.max(risk, 0),
    100
  );

  // Calculate conviction

  const conviction =
    score * 0.25 +
    confidence * 0.20 +
    momentum * 0.15 +
    volume * 0.15 +
    rrScore * 0.15 +
    patternScore * 0.05 +
    riskScore * 0.05;

  // Determine conviction rank

  let rank = "WATCH";

  if (conviction >= 90) {
    rank = "ELITE";
  } else if (conviction >= 85) {
    rank = "HIGH CONVICTION";
  } else if (conviction >= 75) {
    rank = "GOOD SETUP";
  } else if (conviction >= 65) {
    rank = "MONITOR";
  } else {
    rank = "WATCH";
  }

  return {
    conviction: Math.round(conviction),
    rank,
  };
}
