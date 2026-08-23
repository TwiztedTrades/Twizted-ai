import type { TradeResult } from "@twizted/scanner";

type ScannerResults = {
  trades: TradeResult[];
};

export default function Scanner({
  results,
}: {
  results: ScannerResults;
}) {
  const trades = results.trades;

  const getConvictionStyle = (rank: string) => {
    switch (rank) {
      case "ELITE":
        return "border-purple-500 bg-purple-500/10 text-purple-400";

      case "HIGH CONVICTION":
        return "border-emerald-500 bg-emerald-500/10 text-emerald-400";

      case "GOOD SETUP":
        return "border-blue-500 bg-blue-500/10 text-blue-400";

      case "MONITOR":
        return "border-yellow-500 bg-yellow-500/10 text-yellow-400";

      default:
        return "border-zinc-700 bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <div className="space-y-6 md:col-span-2">
      <h2 className="text-2xl font-bold">
        🤖 AI Market Scanner
      </h2>

      {trades.map((trade, index) => {
        const conviction =
          trade.conviction?.conviction ?? 0;

        const rank =
          trade.conviction?.rank ?? "WATCH";

        return (
          <div
            key={trade.ticker}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            {/* -------------------------------- */}
            {/* HEADER */}
            {/* -------------------------------- */}

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                #{index + 1} {trade.ticker}
              </h3>

              <div
                className={`border rounded-lg px-3 py-2 text-center ${getConvictionStyle(
                  rank
                )}`}
              >
                <div className="text-xs font-bold">
                  🔥 CONVICTION
                </div>

                <div className="text-xl font-bold">
                  {conviction}/100
                </div>

                <div className="text-xs font-bold">
                  {rank}
                </div>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* AI SCORE */}
            {/* -------------------------------- */}

            <div className="mt-4">
              <p className="text-lg">
                TWIZTED AI SCORE:{" "}
                <span className="font-bold">
                  {trade.score}/100
                </span>
              </p>

              <p>
                Grade: {trade.grade}
              </p>

              <p>
                Confidence: {trade.confidence}%
              </p>

              <p>
                Signal: {trade.signal}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* TRADE LEVELS */}
            {/* -------------------------------- */}

            <div className="mt-4 space-y-1">
              <p>
                🎯 Entry: ${trade.entry}
              </p>

              <p>
                🛑 Stop: ${trade.stop}
              </p>

              <p>
                🚀 Target: ${trade.target}
              </p>

              <p>
                ⚖️ Risk/Reward: {trade.riskReward}:1
              </p>
            </div>

            {/* -------------------------------- */}
            {/* MARKET DATA */}
            {/* -------------------------------- */}

            <div className="mt-4">
              <p>
                📊 Pattern: {trade.pattern}
              </p>

              <p>
                💵 Price: ${trade.price}
              </p>

              <p>
                📈 Change: {trade.change}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* AI TRADE THESIS */}
            {/* -------------------------------- */}

            <div className="mt-5">
              <h4 className="font-bold">
                🧠 AI Trade Thesis
              </h4>

              {trade.thesis.reasons.map(
                (reason: string, reasonIndex: number) => (
                  <p
                    key={`${trade.ticker}-thesis-${reasonIndex}`}
                  >
                    ✓ {reason}
                  </p>
                )
              )}

              <p className="mt-2">
                {trade.thesis.summary}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* RISK ENGINE */}
            {/* -------------------------------- */}

            <div className="mt-5">
              <h4 className="font-bold">
                ⚠️ Risk Engine
              </h4>

              <p>
                {trade.riskCheck.status}
              </p>

              <p>
                Risk Used:{" "}
                {trade.riskCheck.accountRiskUsed}%
              </p>

              <p>
                Account Risk:{" "}
                {trade.riskCheck.accountRiskPercent}%
              </p>

              <p>
                Position Cost: $
                {trade.riskCheck.positionCost}
              </p>

              <p>
                Max Loss: $
                {trade.riskCheck.plannedStopLoss}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* CONTRACT SIZE */}
            {/* -------------------------------- */}

            <div className="mt-5">
              <h4 className="font-bold">
                📦 Contract Size
              </h4>

              <p>
                Contracts:{" "}
                {trade.contractSize.contracts}
              </p>

              <p>
                Position Cost: $
                {trade.contractSize.positionCost}
              </p>

              <p>
                Position Approved:{" "}
                {trade.contractSize.positionApproved
                  ? "YES"
                  : "NO"}
              </p>
            </div>

            {/* -------------------------------- */}
            {/* APPROVAL GATE */}
            {/* -------------------------------- */}

            <div className="mt-5 border-t border-zinc-800 pt-4">
              <h4 className="font-bold">
                🔒 Approval Gate
              </h4>

              <p
                className={
                  trade.approval.approved
                    ? "text-emerald-400 font-bold"
                    : "text-red-400 font-bold"
                }
              >
                {trade.approval.status}
              </p>

              {/* Daily Trade Limit */}
              <p className="mt-2 text-sm text-zinc-400">
                📊 Daily Limit:{" "}
                {trade.approval.tradesToday}/
                {trade.approval.maxTradesPerDay}
              </p>

              <p className="text-sm">
                Daily Limit Status:{" "}
                {trade.approval.dailyTradeLimitApproved
                  ? "AVAILABLE"
                  : "LIMIT REACHED"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}