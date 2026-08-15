import { selectTopTrade } from "./topTrade";

const fakeTrades = [
  {
    ticker: "BAD-TRADE",
    score: 99,
    confidence: 99,

    decision: {
      decision: "APPROVED",
    },

    approval: {
      approved: false,
    },

    conviction: {
      conviction: 99,
    },
  },

  {
    ticker: "GOOD-TRADE",
    score: 82,
    confidence: 87,

    decision: {
      decision: "APPROVED",
    },

    approval: {
      approved: true,
    },

    conviction: {
      conviction: 86,
    },
  },
];

const result = selectTopTrade(fakeTrades);

if (result.ticker !== "GOOD-TRADE") {
  throw new Error(
    `Approval gate failed: expected GOOD-TRADE, got ${result.ticker}`
  );
}

console.log("✅ Approved trade selection test passed");
console.log(`Top trade: ${result.ticker}`);

// --------------------------------
// NO APPROVED TRADES TEST
// --------------------------------

const noApprovedTrades = [
  {
    ticker: "REJECTED-1",
    score: 99,
    confidence: 99,
    approval: {
      approved: false,
    },
    conviction: {
      conviction: 99,
    },
  },

  {
    ticker: "REJECTED-2",
    score: 95,
    confidence: 95,
    approval: {
      approved: false,
    },
    conviction: {
      conviction: 95,
    },
  },
];

const noTradeResult = selectTopTrade(noApprovedTrades);

if (noTradeResult.ticker !== "NONE") {
  throw new Error(
    `Approval gate failed: expected NONE, got ${noTradeResult.ticker}`
  );
}

console.log("✅ No-approved-trades test passed");
console.log(`Top trade: ${noTradeResult.ticker}`);

// --------------------------------
// APPROVED TRADE RANKING TEST
// --------------------------------

const approvedRankingTrades = [
  {
    ticker: "LOW-CONVICTION",
    score: 99,
    confidence: 99,
    approval: {
      approved: true,
    },
    conviction: {
      conviction: 80,
    },
  },

  {
    ticker: "TOP-TRADE",
    score: 85,
    confidence: 86,
    approval: {
      approved: true,
    },
    conviction: {
      conviction: 90,
    },
  },

  {
    ticker: "MEDIUM-CONVICTION",
    score: 95,
    confidence: 95,
    approval: {
      approved: true,
    },
    conviction: {
      conviction: 85,
    },
  },
];

const rankingResult = selectTopTrade(approvedRankingTrades);

if (rankingResult.ticker !== "TOP-TRADE") {
  throw new Error(
    `Ranking failed: expected TOP-TRADE, got ${rankingResult.ticker}`
  );
}

console.log("✅ Approved trade ranking test passed");
console.log(`Ranked top trade: ${rankingResult.ticker}`);
