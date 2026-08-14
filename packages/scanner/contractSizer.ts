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
  // Maximum dollars allocated to the trade.
  // Example:
  // $5,200 × 1% = $52
  const maxAllocation =
    accountSize * (accountRiskPercent / 100);

  // Invalid premium = no trade
  if (premium <= 0) {
    return {
      accountSize,
      accountRiskPercent,
      maxAllocation,
      premium,
      contracts: 0,
      positionCost: 0,
      maxPositionLossPercent,
      maxLoss: 0,
      allocationUsedPercent: 0,
      approved: false,
      status: "NO TRADE",
      reason: "Invalid option premium",
    };
  }

  // Options represent 100 shares per contract.
  const contractCost = premium * 100;

  // Calculate the maximum number of contracts
  // that can fit inside the account allocation.
  const contracts = Math.floor(
    maxAllocation / contractCost
  );

  // No contract fits inside the allocation.
  if (contracts < 1) {
    return {
      accountSize,
      accountRiskPercent,
      maxAllocation: Number(maxAllocation.toFixed(2)),
      premium,
      contracts: 0,
      positionCost: 0,
      maxPositionLossPercent,
      maxLoss: 0,
      allocationUsedPercent: 0,
      approved: false,
      status: "NO TRADE",
      reason:
        "Option premium exceeds maximum trade allocation",
    };
  }

  // Total amount spent on the contracts.
  const positionCost =
    contracts * contractCost;

  // Maximum allowed loss on the option position.
  const maxLoss =
    positionCost *
    (maxPositionLossPercent / 100);

  // Percentage of the account allocation actually used.
  const allocationUsedPercent =
    (positionCost / accountSize) * 100;

  // Safety check.
  const allocationApproved =
    positionCost <= maxAllocation;

  const positionApproved =
    maxLoss <= maxAllocation;

  const approved =
    allocationApproved &&
    positionApproved &&
    contracts >= 1;

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

    status: approved
      ? "RISK APPROVED"
      : "NO TRADE",

    reason: approved
      ? "Position fits account allocation and risk limits"
      : "Position exceeds risk limits",
  };
}
