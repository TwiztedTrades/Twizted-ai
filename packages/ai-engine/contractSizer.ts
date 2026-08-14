export function calculateContractSize({
  accountSize,
  accountRiskPercent = 1,
  premium,
  maxPositionLossPercent = 30,
}: {
  accountSize: number;
  accountRiskPercent?: number;
  premium: number;
  maxPositionLossPercent?: number;
}) {
  // --------------------------------
  // ACCOUNT ALLOCATION
  // --------------------------------

  const maxAllocation =
    accountSize * (accountRiskPercent / 100);

  // --------------------------------
  // OPTION CONTRACT COST
  // --------------------------------
  // Options are quoted per share.
  // One contract = 100 shares.

  const contractCost = premium * 100;

  // --------------------------------
  // MAX CONTRACTS
  // --------------------------------

  const contracts =
    contractCost > 0
      ? Math.floor(maxAllocation / contractCost)
      : 0;

  // --------------------------------
  // POSITION COST
  // --------------------------------

  const positionCost =
    contracts * contractCost;

  // --------------------------------
  // MAX POSITION LOSS
  // --------------------------------
  // Example:
  // $52 allocation × 30% = $15.60 max loss

  const maxLoss =
    positionCost * (maxPositionLossPercent / 100);

  // --------------------------------
  // ACCOUNT ALLOCATION USED
  // --------------------------------

  const allocationUsedPercent =
    accountSize > 0
      ? (positionCost / accountSize) * 100
      : 0;

  // --------------------------------
  // APPROVAL CHECKS
  // --------------------------------

  const allocationApproved =
    positionCost <= maxAllocation;

  const positionApproved =
    contracts > 0 &&
    maxLoss <= maxAllocation *
      (maxPositionLossPercent / 100);

  const approved =
    contracts > 0 &&
    allocationApproved &&
    positionApproved;

  // --------------------------------
  // STATUS
  // --------------------------------

  const status =
    approved
      ? "RISK APPROVED"
      : "NO TRADE";

  const reason =
    approved
      ? "Position fits account allocation and risk limits"
      : contractCost > maxAllocation
        ? "Option premium exceeds maximum trade allocation"
        : "Position fails risk limits";

  return {
    accountSize,
    accountRiskPercent,

    maxAllocation: Number(
      maxAllocation.toFixed(2)
    ),

    premium,

    contracts,

    contractCost: Number(
      contractCost.toFixed(2)
    ),

    positionCost: Number(
      positionCost.toFixed(2)
    ),

    maxPositionLossPercent,

    maxLoss: Number(
      maxLoss.toFixed(2)
    ),

    allocationUsedPercent: Number(
      allocationUsedPercent.toFixed(2)
    ),

    allocationApproved,

    positionApproved,

    approved,

    status,

    reason,
  };
}
