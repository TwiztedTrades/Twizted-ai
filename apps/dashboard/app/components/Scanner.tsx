export default function Scanner({ results }: any) {
  if (!results || !results.trades) {
    return null;
  }

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
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        🤖 AI Market Scanner
      </h2>

      {trades.map((trade: any, index: number) => {

        const conviction = trade.conviction?.conviction ?? 0;
        const rank = trade.conviction?.rank ?? "WATCH";

        return (
          <div
            key={trade.ticker}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >

            {/* HEADER */}

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


            {/* AI SCORE */}

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

            </div>


            {/* TRADE LEVELS */}

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


            {/* SIGNAL */}

            <div className="mt-4 font-bold text-emerald-400">
              {trade.signal}
            </div>


            {/* AI DECISION */}

            <div className="mt-5">

              <h4 className="font-bold">
                🤖 AI Decision
              </h4>

              <p className="mt-2 font-bold">
                {trade.decision?.decision}
              </p>

              <p>
                {trade.decision?.action}
              </p>

              {trade.decision?.reasons?.map(
                (reason: string, reasonIndex: number) => (
                  <p key={`${trade.ticker}-decision-${reasonIndex}`}>
                    ✓ {reason}
                  </p>
                )
              )}

            </div>


            {/* TRADE THESIS */}

            <div className="mt-5">

              <h4 className="font-bold">
                🧠 AI Trade Thesis
              </h4>

              {trade.thesis?.reasons?.map(
                (reason: string, reasonIndex: number) => (
                  <p key={`${trade.ticker}-thesis-${reasonIndex}`}>
                    {reason}
                  </p>
                )
              )}

              <p className="mt-2">
                {trade.thesis?.summary}
              </p>

            </div>


            {/* RISK ENGINE */}

            <div className="mt-5">

              <h4 className="font-bold">
                ⚠️ Risk Engine
              </h4>

              <p>
                {trade.riskCheck?.status}
              </p>

              <p>
                Risk Used: {trade.riskCheck?.riskPercent}%
              </p>

              <p>
                Max Allowed: {trade.riskCheck?.maxRiskPercent}%
              </p>

            </div>


            {/* POSITION SIZE */}

            {trade.positionSize && (
              <div className="mt-5">

                <h4 className="font-bold">
                  🤖 Position Size
                </h4>

                <p>
                  Account: $
                  {trade.positionSize.accountSize}
                </p>

                <p>
                  Max Risk: $
                  {trade.positionSize.maxRisk}
                </p>

                <p>
                  Loss Per Contract: $
                  {trade.positionSize.lossPerContract}
                </p>

                <p className="font-bold">
                  Contracts: {trade.positionSize.contracts}
                </p>

              </div>
            )}

          </div>
        );
      })}

    </div>
  );
}
