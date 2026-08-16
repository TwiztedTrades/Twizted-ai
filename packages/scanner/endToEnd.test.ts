import { runScanner } from "./index";

console.log("");
console.log("========================================");
console.log("   TWIZTED AI END-TO-END ENGINE TEST");
console.log("========================================");
console.log("");

const result = runScanner();

// ----------------------------------------
// BASIC OUTPUT TEST
// ----------------------------------------

if (!result) {
  throw new Error("Scanner returned no result");
}

if (!Array.isArray(result.trades)) {
  throw new Error("Scanner did not return a trades array");
}

if (!result.topTrade) {
  throw new Error("Scanner did not return topTrade");
}

console.log("✅ Scanner returned valid output");
console.log(`Trades scanned: ${result.trades.length}`);

// ----------------------------------------
// TRADE STRUCTURE TEST
// ----------------------------------------

for (const trade of result.trades) {
  if (!trade.ticker) {
    throw new Error("Trade is missing ticker");
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

  if (typeof trade.approval.approved !== "boolean") {
    throw new Error(
      `${trade.ticker}: approval result is invalid`
    );
  }
}

console.log("✅ Every trade contains required AI engine outputs");

// ----------------------------------------
// APPROVAL GATE TEST
// ----------------------------------------

const approvedTrades = result.trades.filter(
  (trade) => trade.approval.approved === true
);

const rejectedTrades = result.trades.filter(
  (trade) => trade.approval.approved === false
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

  if (topTrade.approval?.approved !== true) {
    throw new Error(
      `CRITICAL: Top trade ${topTrade.ticker} was not approved`
    );
  }

  console.log(
    `✅ Top trade passed approval gate: ${topTrade.ticker}`
  );
} else {
  console.log("🔴 No approved top trade");
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

console.log("✅ No-trade safety rule passed");

// ----------------------------------------
// APPROVAL AUTHORITY TEST
// ----------------------------------------

const topTradeExists =
  result.topTrade.ticker !== "NONE";

if (topTradeExists) {
  const matchingTrade = result.trades.find(
    (trade) =>
      trade.ticker === result.topTrade.ticker
  );

  if (!matchingTrade) {
    throw new Error(
      "Top trade does not exist in scanner results"
    );
  }

  if (matchingTrade.approval?.approved !== true) {
    throw new Error(
      "Top trade bypassed approval authority"
    );
  }

  console.log(
    "✅ Approval gate is the final authority"
  );
}

// ----------------------------------------
// FINAL SUMMARY
// ----------------------------------------

console.log("");
console.log("========================================");
console.log("          END-TO-END TEST PASSED");
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
    `Conviction: ${result.topTrade.conviction?.conviction ?? "N/A"}`
  );

  console.log(
    `Risk/Reward: ${"riskReward" in result.topTrade ? result.topTrade.riskReward : "N/A"}:1`
  );

  console.log(
    `Approval: ${result.topTrade.approval?.status ?? "NO TRADE"}`
  );
}

console.log("");
console.log("🚀 Twizted AI engine pipeline is operational.");
console.log("");
