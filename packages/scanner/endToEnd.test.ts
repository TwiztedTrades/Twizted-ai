import { runScanner } from "./index";
import { approvalGate } from "@twizted/ai-engine";

console.log("");
console.log("========================================");
console.log("   TWIZTED AI END-TO-END ENGINE TEST");
console.log("========================================");
console.log("");

// ----------------------------------------
// NORMAL SCANNER RUN
// ----------------------------------------

const result = runScanner();

// ----------------------------------------
// DAILY TRADE LIMIT TEST
// ----------------------------------------

// Simulate starting the day with 3 trades already taken.
const dailyLimitResult = runScanner(3);

const dailyLimitBlocked =
  dailyLimitResult.trades.every(
    (trade) =>
      trade.approval.dailyTradeLimitApproved === false
  );

if (!dailyLimitBlocked) {
  throw new Error(
    "CRITICAL: Daily 3-trade limit was not enforced"
  );
}

console.log(
  "✅ 3-trade daily limit enforced"
);

// ----------------------------------------
// BASIC OUTPUT TEST
// ----------------------------------------

if (!result) {
  throw new Error("Scanner returned no result");
}

if (!Array.isArray(result.trades)) {
  throw new Error(
    "Scanner did not return a trades array"
  );
}

if (!result.topTrade) {
  throw new Error(
    "Scanner did not return topTrade"
  );
}

console.log(
  "✅ Scanner returned valid output"
);

console.log(
  `Trades scanned: ${result.trades.length}`
);

// ----------------------------------------
// TRADE STRUCTURE TEST
// ----------------------------------------

for (const trade of result.trades) {
  if (!trade.ticker) {
    throw new Error(
      "Trade is missing ticker"
    );
  }

  if (typeof trade.score !== "number") {
    throw new Error(
      `${trade.ticker}: invalid AI score`
    );
  }

  if (typeof trade.confidence !== "number") {
    throw new Error(
      `${trade.ticker}: invalid confidence`
    );
  }

  if (!trade.conviction) {
    throw new Error(
      `${trade.ticker}: missing conviction result`
    );
  }

  if (!trade.approval) {
    throw new Error(
      `${trade.ticker}: missing approval result`
    );
  }

  if (
    typeof trade.approval.approved !== "boolean"
  ) {
    throw new Error(
      `${trade.ticker}: approval result is invalid`
    );
  }

  if (
    typeof trade.approval
      .dailyTradeLimitApproved !== "boolean"
  ) {
    throw new Error(
      `${trade.ticker}: daily trade limit result is invalid`
    );
  }
}

console.log(
  "✅ Every trade contains required AI engine outputs"
);

// ----------------------------------------
// APPROVAL GATE TEST
// ----------------------------------------

const approvedTrades =
  result.trades.filter(
    (trade) =>
      trade.approval.approved === true
  );

const rejectedTrades =
  result.trades.filter(
    (trade) =>
      trade.approval.approved === false
  );

console.log(
  `Approved trades: ${approvedTrades.length}`
);

console.log(
  `Rejected trades: ${rejectedTrades.length}`
);

// ----------------------------------------
// TOP TRADE AUTHORITY TEST
// ----------------------------------------

if (result.topTrade.ticker !== "NONE") {
  const topTrade = result.topTrade;

  if (
    topTrade.approval?.approved !== true
  ) {
    throw new Error(
      `CRITICAL: Top trade ${topTrade.ticker} was not approved`
    );
  }

  console.log(
    `✅ Top trade passed approval gate: ${topTrade.ticker}`
  );
} else {
  console.log(
    "🔴 No approved top trade"
  );
}

// ----------------------------------------
// NO-TRADE SAFETY TEST
// ----------------------------------------

if (
  approvedTrades.length === 0 &&
  result.topTrade.ticker !== "NONE"
) {
  throw new Error(
    "CRITICAL: No approved trades exist but Top Trade was selected"
  );
}

console.log(
  "✅ No-trade safety rule passed"
);

// ----------------------------------------
// APPROVAL AUTHORITY TEST
// ----------------------------------------

const topTradeExists =
  result.topTrade.ticker !== "NONE";

if (topTradeExists) {
  const matchingTrade =
    result.trades.find(
      (trade) =>
        trade.ticker ===
        result.topTrade.ticker
    );

  if (!matchingTrade) {
    throw new Error(
      "Top trade does not exist in scanner results"
    );
  }

  if (
    matchingTrade.approval?.approved !== true
  ) {
    throw new Error(
      "Top trade bypassed approval authority"
    );
  }

  console.log(
    "✅ Approval gate is the final authority"
  );
}

// ----------------------------------------
// DIRECT 3-TRADE GUARDRAIL TEST
// ----------------------------------------

const directDailyLimitTest =
  approvalGate({
    score: 90,
    confidence: 90,
    conviction: 90,
    riskReward: 2,

    riskApproved: true,
    positionApproved: true,

    contracts: 1,
    positionCost: 20,
    maxAllocation: 52,

    tradesToday: 3,
    maxTradesPerDay: 3,
  });

if (directDailyLimitTest.approved) {
  throw new Error(
    "CRITICAL: Trade approved after daily limit reached"
  );
}

if (
  directDailyLimitTest.dailyTradeLimitApproved
) {
  throw new Error(
    "CRITICAL: Daily trade limit incorrectly approved"
  );
}

console.log(
  "✅ Direct approval gate 3-trade guardrail passed"
);

// ----------------------------------------
// UNDER-LIMIT TEST
// ----------------------------------------

const underLimitTest =
  approvalGate({
    score: 90,
    confidence: 90,
    conviction: 90,
    riskReward: 2,

    riskApproved: true,
    positionApproved: true,

    contracts: 1,
    positionCost: 20,
    maxAllocation: 52,

    tradesToday: 2,
    maxTradesPerDay: 3,
  });

if (
  !underLimitTest.dailyTradeLimitApproved
) {
  throw new Error(
    "CRITICAL: Trade incorrectly blocked at 2/3 daily trades"
  );
}

console.log(
  "✅ Trade allowed below daily limit (2/3)"
);

// ----------------------------------------
// FINAL SUMMARY
// ----------------------------------------

console.log("");
console.log("========================================");
console.log(
  "          END-TO-END TEST PASSED"
);
console.log("========================================");
console.log("");

console.log(
  `Top Trade: ${result.topTrade.ticker}`
);

if (result.topTrade.ticker !== "NONE") {
  console.log(
    `AI Score: ${result.topTrade.score}`
  );

  console.log(
    `Confidence: ${result.topTrade.confidence}%`
  );

  console.log(
    `Conviction: ${
      result.topTrade.conviction?.conviction ??
      "N/A"
    }`
  );

  console.log(
    `Risk/Reward: ${
      "riskReward" in result.topTrade
        ? result.topTrade.riskReward
        : "N/A"
    }:1`
  );

  console.log(
    `Approval: ${
      result.topTrade.approval?.status ??
      "NO TRADE"
    }`
  );
}

console.log("");
console.log(
  "🛡️ Risk: 1% max planned account risk"
);
console.log(
  "🛑 Stop: 30% max planned premium loss"
);
console.log(
  "📊 Daily limit: 3 trades maximum"
);
console.log("");
console.log(
  "🚀 Twizted AI engine pipeline is operational."
);
console.log("");