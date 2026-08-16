export interface TopTrade {
  ticker: string;
  message?: string;

  score?: number;
  confidence?: number;

  conviction?: {
    conviction: number;
    grade?: string;
    rank?: string;
  };

  riskReward?: number;

  approval?: {
    approved: boolean;
    status?: string;
    reasons?: string[];
    failedChecks?: string[];
  };
}

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
