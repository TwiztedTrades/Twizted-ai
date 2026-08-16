export interface TradeResult {
  ticker: string;

  score: number;
  grade: string;
  confidence: number;

  signal: string;

  entry: number;
  stop: number;
  target: number;
  riskReward: number;

  pattern: string;
  price: number;
  change: string;

  thesis: {
    reasons: string[];
    summary: string;
  };

  optionPremium: number;

  contractSize: {
    contracts: number;
    positionCost: number;
    maxAllocation: number;
    positionApproved: boolean;
  };

  riskCheck: {
    accountSize: number;
    accountRiskPercent: number;
    allocation: number;
    contracts: number;
    premium: number;
    positionCost: number;
    maxPositionLossPercent: number;
    maxLoss: number;
    accountRiskUsed: number;
    maxAccountRiskPercent: number;
    allocationApproved: boolean;
    positionApproved: boolean;
    accountRiskApproved: boolean;
    approved: boolean;
    status: string;
  };

  conviction: {
    conviction: number;
    rank: string;
  };

  approval: {
    approved: boolean;
    status: "APPROVED" | "NO TRADE";
    reasons: string[];
    failedChecks: string[];
  };
}
