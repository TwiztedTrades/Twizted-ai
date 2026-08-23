export function calculateRisk({
  accountSize,
  accountRiskPercent = 1,
  contracts,
  premium,
  maxPositionLossPercent = 30,
  maxAccountRiskPercent = 1,
}: {
  accountSize: number;
  accountRiskPercent?: number;
  contracts: number;
  premium: number;
  maxPositionLossPercent?: number;
  maxAccountRiskPercent?: number;
}) {
  const allocation =
    accountSize * (accountRiskPercent / 100);

  const positionCost =
    premium * 100 * contracts;

  // Planned loss if the stop is hit.
  const plannedStopLoss =
    positionCost *
    (maxPositionLossPercent / 100);

  const accountRiskUsed =
    accountSize > 0
      ? (plannedStopLoss / accountSize) * 100
      : 100;

  // Theoretical maximum loss for a long option:
  // the entire premium paid.
  const theoreticalMaxLoss =
    positionCost;

  const theoreticalMaxLossPercent =
    accountSize > 0
      ? (theoreticalMaxLoss / accountSize) * 100
      : 100;

  const allocationApproved =
    accountRiskPercent <= maxAccountRiskPercent;

  const positionApproved =
    positionCost <= allocation;

  const accountRiskApproved =
    accountRiskUsed <= maxAccountRiskPercent;

  const approved =
    allocationApproved &&
    positionApproved &&
    accountRiskApproved;

  let status = "RISK APPROVED";

  if (!allocationApproved) {
    status = "ACCOUNT RISK TOO HIGH";
  } else if (!positionApproved) {
    status = "POSITION SIZE TOO LARGE";
  } else if (!accountRiskApproved) {
    status = "PLANNED STOP RISK EXCEEDED";
  }

  return {
    accountSize,
    accountRiskPercent,

    allocation: Number(
      allocation.toFixed(2)
    ),

    contracts,
    premium,

    positionCost: Number(
      positionCost.toFixed(2)
    ),

    maxPositionLossPercent,

    plannedStopLoss: Number(
      plannedStopLoss.toFixed(2)
    ),

    accountRiskUsed: Number(
      accountRiskUsed.toFixed(2)
    ),

    theoreticalMaxLoss: Number(
      theoreticalMaxLoss.toFixed(2)
    ),

    theoreticalMaxLossPercent: Number(
      theoreticalMaxLossPercent.toFixed(2)
    ),

    maxAccountRiskPercent,

    allocationApproved,
    positionApproved,
    accountRiskApproved,
    approved,
    status,
  };
}
