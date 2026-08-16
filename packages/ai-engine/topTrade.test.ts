import { selectTopTrade } from "./topTrade";

console.log("");
console.log("========================================");
console.log("     TWIZTED AI TOP TRADE SAFETY TEST");
console.log("========================================");
console.log("");

// ==================================================
// TEST 1 — REJECTED TRADE CANNOT BECOME TOP TRADE
// ==================================================

const safetyTrades = [
  {
    ticker: "DANGEROUS-TRADE",

    // Extremely strong metrics
    score: 99,
    confidence: 99,

    conviction: {
      conviction: 99,
    },

    // Approval gate rejected it
    approval: {
      approved: false,
      status: "NO TRADE",
    },
  },

  {
    ticker: "SAFE-TRADE",

    score: 82,
    confidence: 87,

    conviction: {
      conviction: 86,
    },

    approval: {
      approved: true,
      status: "APPROVED",
    },
  },
];

const safetyResult = selectTopTrade(safetyTrades);

if (safetyResult.ticker !== "SAFE-TRADE") {
  throw new Error(
    `CRITICAL SAFETY FAILURE: Expected SAFE-TRADE, got ${safetyResult.ticker}`
  );
}

if (safetyResult.approval?.approved !== true) {
  throw new Error(
    "CRITICAL SAFETY FAILURE: Top trade is not approved"
  );
}

console.log("✅ Rejected high-score trade was blocked");
console.log(`Top trade: ${safetyResult.ticker}`);


// ==================================================
// TEST 2 — NO APPROVED TRADES = NO TRADE
// ==================================================

const rejectedTrades = [
  {
    ticker: "REJECTED-1",

    score: 99,
    confidence: 99,

    conviction: {
      conviction: 99,
    },

    approval: {
      approved: false,
    },
  },

  {
    ticker: "REJECTED-2",

    score: 95,
    confidence: 95,

    conviction: {
      conviction: 95,
    },

    approval: {
      approved: false,
    },
  },
];

const noTradeResult = selectTopTrade(rejectedTrades);

if (noTradeResult.ticker !== "NONE") {
  throw new Error(
    `CRITICAL SAFETY FAILURE: Expected NONE, got ${noTradeResult.ticker}`
  );
}

console.log("✅ No approved trades correctly returned NONE");


// ==================================================
// TEST 3 — APPROVED TRADES RANK CORRECTLY
// ==================================================

const rankingTrades = [
  {
    ticker: "LOW-TRADE",

    score: 90,
    confidence: 95,

    conviction: {
      conviction: 80,
    },

    approval: {
      approved: true,
    },
  },

  {
    ticker: "TOP-TRADE",

    score: 82,
    confidence: 87,

    conviction: {
      conviction: 90,
    },

    approval: {
      approved: true,
    },
  },

  {
    ticker: "MID-TRADE",

    score: 88,
    confidence: 90,

    conviction: {
      conviction: 85,
    },

    approval: {
      approved: true,
    },
  },
];

const rankingResult = selectTopTrade(rankingTrades);

if (rankingResult.ticker !== "TOP-TRADE") {
  throw new Error(
    `Ranking failure: expected TOP-TRADE, got ${rankingResult.ticker}`
  );
}

console.log("✅ Approved trades ranked by conviction");
console.log(`Ranked top trade: ${rankingResult.ticker}`);


// ==================================================
// TEST 4 — APPROVAL IS THE FINAL AUTHORITY
// ==================================================

const authorityTrades = [
  {
    ticker: "REJECTED-BUT-PERFECT",

    score: 100,
    confidence: 100,

    conviction: {
      conviction: 100,
    },

    approval: {
      approved: false,
    },
  },

  {
    ticker: "APPROVED-TRADE",

    score: 70,
    confidence: 70,

    conviction: {
      conviction: 70,
    },

    approval: {
      approved: true,
    },
  },
];

const authorityResult = selectTopTrade(authorityTrades);

if (authorityResult.ticker !== "APPROVED-TRADE") {
  throw new Error(
    "CRITICAL: Approval gate is NOT the final authority"
  );
}

console.log("✅ Approval gate confirmed as final authority");
console.log(`Final approved trade: ${authorityResult.ticker}`);


// ==================================================
// FINAL RESULT
// ==================================================

console.log("");
console.log("========================================");
console.log("       ALL SAFETY TESTS PASSED");
console.log("========================================");
console.log("");

console.log("🛡️ Rejected trades cannot become Top Trade");
console.log("🛡️ No approved trades = NONE");
console.log("🛡️ Approved trades rank correctly");
console.log("🛡️ Approval gate is final authority");

console.log("");
console.log("🚀 Top Trade safety layer is operational.");
console.log("");
