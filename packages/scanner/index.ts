import { getMarketData } from "@twizted/market-data";
import type { MarketData } from "@twizted/market-data";

import type { TradeResult } from "./types";
import type { TopTrade } from "@twizted/ai-engine";

import {
  analyzeTrade,
  generateTradeThesis,
  calculateRisk,
  selectTopTrade,
  calculateConviction,
  calculateTarget,
  calculateContractSize,
  approvalGate,
} from "@twizted/ai-engine";

export function runScanner(tradesToday = 0): {
  trades: TradeResult[];
  topTrade: TopTrade;
} {
  const stocks = getMarketData();

  const results = stocks.map((stock) => {
    // --------------------------------
    // ENTRY / STOP
    // --------------------------------

    const entry = stock.trigger;
    const stop = stock.support;

    // --------------------------------
    // BASE TRADE ANALYSIS
    // --------------------------------

    const trade = analyzeTrade({
      ticker: stock.ticker,
      pattern: stock.patternScore,
      momentum: stock.momentum,
      volume: stock.volume,
      risk: stock.risk,
      entry,
      stop,
      target: entry,
    });

    // --------------------------------
    // AUTOMATIC 2:1 TARGET
    // --------------------------------

    const targetData = calculateTarget({
      entry: trade.entry,
      stop: trade.stop,
      minimumRiskReward: 2,
    });

    const target = targetData.target;
    const riskReward = targetData.riskReward;

    // --------------------------------
    // TRADE THESIS
    // --------------------------------

    const thesis = generateTradeThesis({
      pattern: stock.patternScore,
      momentum: stock.momentum,
      volume: stock.volume,
      risk: stock.risk,
    });

    // --------------------------------
    // OPTION PREMIUM
    // --------------------------------

    const optionPremium = 0.26;

    // --------------------------------
    // CONTRACT SIZE
    // --------------------------------

    const contractSize = calculateContractSize({
      accountSize: 5200,
      accountRiskPercent: 1,
      premium: optionPremium,
      maxPositionLossPercent: 30,
    });

    // --------------------------------
    // RISK CHECK
    // --------------------------------

    const riskCheck = calculateRisk({
      accountSize: 5200,
      accountRiskPercent: 1,
      contracts: contractSize.contracts,
      premium: optionPremium,
      maxPositionLossPercent: 30,
      maxAccountRiskPercent: 1,
    });

// --------------------------------
// CONVICTION
// --------------------------------

const conviction = calculateConviction({
  score: trade.score,
  confidence: trade.confidence,
  riskReward,
  volume: stock.volume,
  momentum: stock.momentum,
  pattern: stock.patternScore,
  risk: stock.risk,
});

    // --------------------------------
    // FINAL APPROVAL GATE
    // --------------------------------

    const approval = approvalGate({
      score: trade.score,
      confidence: trade.confidence,
      conviction: conviction.conviction,
      riskReward,
      riskApproved: riskCheck.approved,
      positionApproved: contractSize.positionApproved,
      contracts: contractSize.contracts,
      positionCost: contractSize.positionCost,
      maxAllocation: contractSize.maxAllocation,
      tradesToday,
      maxTradesPerDay: 3,
    });

// --------------------------------
// FINAL SIGNAL
// --------------------------------

const finalSignal = approval.approved
  ? "BREAKOUT WATCH"
  : "WATCHLIST";

    // --------------------------------
    // COMPLETE TRADE
    // --------------------------------

    return {
      ticker: stock.ticker,

      score: trade.score,
      grade: trade.grade,
      confidence: trade.confidence,

      signal: finalSignal,

      entry: trade.entry,
      stop: trade.stop,
      target,
      riskReward,

      pattern: stock.pattern,
      price: stock.price,
      change: stock.change,

      thesis,

      optionPremium,

      contractSize,

      riskCheck,

      conviction,

      approval,
    };
  });

  // --------------------------------
  // RANK BY CONVICTION
  // --------------------------------

  const rankedTrades = results.sort(
    (a, b) =>
      b.conviction.conviction -
      a.conviction.conviction
  );

  // --------------------------------
  // TOP APPROVED TRADE
  // --------------------------------

  const topTrade = selectTopTrade(rankedTrades);

  return {
    trades: rankedTrades,
    topTrade,
  };
}
export type { TradeResult } from "./types";