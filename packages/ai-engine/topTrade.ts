export function selectTopTrade(trades: any[]) {
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
    if (
      b.conviction?.conviction !==
      a.conviction?.conviction
    ) {
      return (
        b.conviction.conviction -
        a.conviction.conviction
      );
    }

    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return b.confidence - a.confidence;
  })[0];
}
