export function calculateTarget({
  entry,
  stop,
  minimumRiskReward = 2,
}: {
  entry: number;
  stop: number;
  minimumRiskReward?: number;
}) {

  const risk = Math.abs(entry - stop);

  const target =
    entry + risk * minimumRiskReward;

  return {
    risk: Number(risk.toFixed(2)),
    target: Number(target.toFixed(2)),
    riskReward: minimumRiskReward,
  };
}
