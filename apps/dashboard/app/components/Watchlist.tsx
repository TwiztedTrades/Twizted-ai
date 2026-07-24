import { getMarketData } from "@twizted/market-data";
import { analyzeTrade } from "@twizted/ai-engine";

export default function Watchlist() {
  const watchlist = getMarketData();

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-xl font-bold">🔥 Watchlist</h2>

      {watchlist.map((stock) => {
        const trade = analyzeTrade({
          ticker: stock.ticker,
          pattern: stock.patternScore,
          momentum: stock.momentum,
          volume: stock.volume,
          risk: stock.risk,
          entry: stock.trigger,
          stop: stock.support,
          target: stock.trigger + 5,
        });

        return (
          <div
            key={stock.ticker}
            className="mt-4 border-b border-zinc-800 pb-4"
          >
            <h3 className="font-bold text-lg">
              {stock.ticker}
            </h3>

            <p>Price: ${stock.price}</p>
            <p>Change: {stock.change}</p>
            <p>Pattern: {stock.pattern}</p>
            <p>Trigger: ${stock.trigger}</p>
            <p>Support: ${stock.support}</p>

            <p className="mt-2 text-green-400 font-bold">
              Score: {trade.score}/100
            </p>

            <p>Grade: {trade.grade}</p>

            <p>Confidence: {trade.confidence}%</p>

            <p>Entry: ${trade.entry}</p>

            <p>Stop: ${trade.stop}</p>

            <p>Target: ${trade.target}</p>

            <p>
              Risk / Reward: {trade.riskReward}:1
            </p>

            <p className="text-emerald-400 font-bold">
              {trade.signal}
            </p>

          </div>
        );
      })}
    </div>
  );
}