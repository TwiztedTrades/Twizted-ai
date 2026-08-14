export function calculateRisk({
  accountSize,
  accountRiskPercent = 1,
  contracts,
  premium,
  maxPositionLossPercent = 30,
  maxAccountRiskPercent = 2,
}: {
  accountSize: number;
  accountRiskPercent?: number;
  contracts: number;
  premium: number;
  maxPositionLossPercent?: number;
  maxAccountRiskPercent?: number;
}) {
  // -----------------------------
  // ACCOUNT RISK
  // -----------------------------

  const allocation =
    accountSize * (accountRiskPercent / 100);

  // -----------------------------
  // POSITION COST
  // Options = premium × 100 × contracts
  // -----------------------------

  const positionCost =
    premium * 100 * contracts;

  // -----------------------------
  // MAX POSITION LOSS
  // Example:
  // $52 position × 30% = $15.60
  // -----------------------------

  const maxLoss =
    positionCost * (maxPositionLossPercent / 100);

  // -----------------------------
  // ACCOUNT RISK USED
  // -----------------------------

  const accountRiskUsed =
    accountSize > 0
      ? (maxLoss / accountSize) * 100
      : 100;

  // -----------------------------
  // CHECKS
  // -----------------------------

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

  // -----------------------------
  // STATUS
  // -----------------------------

  let status = "RISK APPROVED";

  if (!allocationApproved) {
    status = "ACCOUNT RISK TOO HIGH";
  } else if (!positionApproved) {
    status = "POSITION SIZE TOO LARGE";
  } else if (!accountRiskApproved) {
    status = "MAX ACCOUNT RISK EXCEEDED";
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

    maxLoss: Number(
      maxLoss.toFixed(2)
    ),

    accountRiskUsed: Number(
      accountRiskUsed.toFixed(2)
    ),

    maxAccountRiskPercent,

    allocationApproved,

    positionApproved,

    accountRiskApproved,

    approved,

    status,
  };
}
