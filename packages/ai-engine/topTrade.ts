export interface TopTrade {
  ticker: string;
  message?: string;

  // --------------------------------
  // TRADE ANALYSIS
  // --------------------------------

  score?: number;
  grade?: string;
  confidence?: number;

  entry?: number;
  stop?: number;
  target?: number;
  riskReward?: number;

  signal?: string;
  pattern?: string;
  price?: number;
  change?: string;

  // --------------------------------
  // TRADE THESIS
  // --------------------------------

  thesis?: {
    reasons: string[];
    summary: string;
  };

  // --------------------------------
  // OPTION DATA
  // --------------------------------

  optionPremium?: number;

  // --------------------------------
  // POSITION SIZE
  // --------------------------------

  positionSize?: {
    accountSize: number;
    riskPercent: number;
    maxRisk: number;
    lossPerContract: number;
    contracts: number;
  };

  contractSize?: {
    contracts: number;
    positionCost: number;
    maxAllocation: number;
    positionApproved: boolean;
  };

  // --------------------------------
  // RISK CHECK
  // --------------------------------

  riskCheck?: {
    accountSize: number;
    accountRiskPercent: number;
    allocation: number;
    contracts: number;
    premium: number;
    positionCost: number;
    maxPositionLossPercent: number;
    plannedStopLoss: number;
    accountRiskUsed: number;
    theoreticalMaxLoss: number;
    theoreticalMaxLossPercent: number;
    maxAccountRiskPercent: number;
    allocationApproved: boolean;
    positionApproved: boolean;
    accountRiskApproved: boolean;
    approved: boolean;
    status: string;
  };

  // --------------------------------
  // CONVICTION
  // --------------------------------

  conviction?: {
    conviction: number;
    grade?: string;
    rank?: string;
  };

  // --------------------------------
  // APPROVAL
  // --------------------------------

  approval?: {
    approved: boolean;
    status?: string;
    reasons?: string[];
    failedChecks?: string[];

    tradesToday?: number;
    maxTradesPerDay?: number;
    dailyTradeLimitApproved?: boolean;
  };

  // --------------------------------
  // LEGACY / DASHBOARD DECISION
  // --------------------------------

  decision?: {
    action?: string;
    reasons?: string[];
  };
}

// --------------------------------
// TOP TRADE SELECTION
// --------------------------------

export function selectTopTrade(
  trades: TopTrade[]
): TopTrade {
  // --------------------------------
  // FINAL APPROVAL AUTHORITY
  // --------------------------------
  // Only trades explicitly approved
  // by approvalGate() can become
  // the top trade.

  const approvedTrades = trades.filter(
    (trade) => trade.approval?.approved === true
  );

  // --------------------------------
  // NO APPROVED TRADES
  // --------------------------------

  if (approvedTrades.length === 0) {
    return {
      ticker: "NONE",
      message: "No approved trades today",
    };
  }

  // --------------------------------
  // RANK APPROVED TRADES
  // --------------------------------
  // 1. Conviction
  // 2. AI Score
  // 3. Confidence

  return approvedTrades.sort((a, b) => {
    const convictionA =
      a.conviction?.conviction ?? 0;

    const convictionB =
      b.conviction?.conviction ?? 0;

    if (convictionB !== convictionA) {
      return convictionB - convictionA;
    }

    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;

    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }

    return (
      (b.confidence ?? 0) -
      (a.confidence ?? 0)
    );
  })[0];
}