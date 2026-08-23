export interface ApprovalGateInput {
  score: number;
  confidence: number;
  conviction: number;
  riskReward: number;

  riskApproved: boolean;
  positionApproved: boolean;

  contracts: number;
  positionCost: number;
  maxAllocation: number;

  tradesToday?: number;
  maxTradesPerDay?: number;
}

export interface ApprovalGateResult {
  approved: boolean;
  status: "APPROVED" | "NO TRADE";
  reasons: string[];
  failedChecks: string[];

  tradesToday: number;
  maxTradesPerDay: number;
  dailyTradeLimitApproved: boolean;
}

export function approvalGate(
  input: ApprovalGateInput
): ApprovalGateResult {
  const reasons: string[] = [];
  const failedChecks: string[] = [];

  const tradesToday = input.tradesToday ?? 0;
  const maxTradesPerDay = input.maxTradesPerDay ?? 3;

  // --------------------------------
  // DAILY TRADE LIMIT
  // --------------------------------

  const dailyTradeLimitApproved =
    tradesToday < maxTradesPerDay;

  if (dailyTradeLimitApproved) {
    reasons.push(
      `Daily trade limit available (${tradesToday}/${maxTradesPerDay})`
    );
  } else {
    failedChecks.push(
      `Daily trade limit reached (${tradesToday}/${maxTradesPerDay})`
    );
  }

  // --------------------------------
  // AI SCORE
  // --------------------------------

  if (input.score >= 80) {
    reasons.push("AI score meets minimum requirement");
  } else {
    failedChecks.push(
      `AI score below 80 (${input.score})`
    );
  }

  // --------------------------------
  // CONFIDENCE
  // --------------------------------

  if (input.confidence >= 85) {
    reasons.push("Confidence is strong");
  } else {
    failedChecks.push(
      `Confidence below 85% (${input.confidence}%)`
    );
  }

  // --------------------------------
  // CONVICTION
  // --------------------------------

  if (input.conviction >= 80) {
    reasons.push("Conviction meets minimum requirement");
  } else {
    failedChecks.push(
      `Conviction below 80 (${input.conviction})`
    );
  }

  // --------------------------------
  // RISK / REWARD
  // --------------------------------

  if (input.riskReward >= 2) {
    reasons.push("Reward meets minimum 2:1 requirement");
  } else {
    failedChecks.push(
      `Risk/reward below 2:1 (${input.riskReward}:1)`
    );
  }

  // --------------------------------
  // RISK ENGINE
  // --------------------------------

  if (input.riskApproved) {
    reasons.push("Risk is controlled");
  } else {
    failedChecks.push("Risk engine rejected position");
  }

  // --------------------------------
  // POSITION SIZE
  // --------------------------------

  if (input.positionApproved) {
    reasons.push("Position size is approved");
  } else {
    failedChecks.push("Position size rejected");
  }

  // --------------------------------
  // CONTRACT COUNT
  // --------------------------------

  if (input.contracts >= 1) {
    reasons.push(
      `${input.contracts} contract${
        input.contracts === 1 ? "" : "s"
      } available`
    );
  } else {
    failedChecks.push("No affordable contracts");
  }

  // --------------------------------
  // ALLOCATION
  // --------------------------------

  if (input.positionCost <= input.maxAllocation) {
    reasons.push("Position fits account allocation");
  } else {
    failedChecks.push(
      `Position cost exceeds allocation ($${input.positionCost} > $${input.maxAllocation})`
    );
  }

  // --------------------------------
  // FINAL DECISION
  // --------------------------------

  const approved =
    failedChecks.length === 0;

  return {
    approved,

    status: approved
      ? "APPROVED"
      : "NO TRADE",

    reasons,
    failedChecks,

    tradesToday,
    maxTradesPerDay,
    dailyTradeLimitApproved,
  };
}