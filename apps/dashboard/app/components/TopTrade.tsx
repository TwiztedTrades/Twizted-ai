export default function TopTrade({ trade }: { trade: import("@twizted/ai-engine").TopTrade }) {
  if (!trade) {
    return null;
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-bold">
        🔥 TWIZTED AI PICK OF THE DAY
      </h2>

      <h1 className="text-3xl font-bold mt-4">
        🏆 {trade.ticker}
      </h1>

      <div className="mt-4 space-y-2">

        <p>
          AI Score: {trade.score}/100
        </p>

        <p>
          Grade: {trade.grade}
        </p>

        <p>
          Confidence: {trade.confidence}%
        </p>

        {trade.conviction && (
          <div className="mt-3">
            <p className="font-bold">
              🔥 Conviction: {trade.conviction.conviction}/100
            </p>

            <p className="text-emerald-400 font-bold">
              {trade.conviction.rank}
            </p>
          </div>
        )}

      </div>

      <div className="mt-5 space-y-2">

        <p>
          🎯 Entry: ${trade.entry}
        </p>

        <p>
          🛑 Stop: ${trade.stop}
        </p>

        <p>
          🚀 Target: ${trade.target}
        </p>

      </div>

      <div className="mt-5 text-emerald-400 font-bold">
        {trade.decision?.action}
      </div>

      {trade.positionSize && (
        <div className="mt-5 border-t border-zinc-800 pt-4">

          <h3 className="font-bold">
            🤖 Position Size
          </h3>

          <p>
            💰 Account: ${trade.positionSize.accountSize}
          </p>

          <p>
            ⚠️ Risk: {trade.positionSize.riskPercent}%
          </p>

          <p>
            🛑 Max Loss: ${trade.positionSize.maxRisk}
          </p>

          <p>
            📊 Loss Per Contract: $
            {trade.positionSize.lossPerContract}
          </p>

          <p className="font-bold">
            📈 Contracts: {trade.positionSize.contracts}
          </p>

        </div>
      )}

      {trade.decision?.reasons && (
        <div className="mt-5">

          {trade.decision.reasons.map(
            (reason: string) => (
              <p key={reason}>
                ✓ {reason}
              </p>
            )
          )}

        </div>
      )}

    </div>
  );
}
