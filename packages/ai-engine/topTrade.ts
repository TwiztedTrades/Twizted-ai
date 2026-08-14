export function selectTopTrade(trades: any[]) {
  // --------------------------------
  // ONLY APPROVED TRADES
  // approvalGate() is the single
  // source of truth.
  // --------------------------------

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

  return approvedTrades.sort((a, b) => {
    // 1. Conviction
    if (
      b.conviction?.conviction !==
      a.conviction?.conviction
    ) {
      return (
        b.conviction.conviction -
        a.conviction.conviction
      );
    }

    // 2. AI Score
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // 3. Confidence
    return b.confidence - a.confidence;
  })[0];
}
