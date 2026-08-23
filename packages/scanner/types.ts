import type { ApprovalGateResult } from "@twizted/ai-engine";
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

  conviction: {
    conviction: number;
    rank: string;
  };

   approval: ApprovalGateResult;
}
