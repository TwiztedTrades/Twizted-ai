import { getMarketData } from "@twizted/market-data";
import { calculateAIscore } from "@twizted/ai-engine";

export default function Watchlist() {
  const watchlist = getMarketData();

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-xl font-bold">🔥 Watchlist</h2>

      {watchlist.map((stock) => {
        const score = calculateAIscore({
          pattern: stock.patternScore,
          momentum: stock.momentum,
          volume: stock.volume,
          risk: stock.risk,
        });

        return (
          <div
            key={stock.ticker}
            className="mt-4 border-b border-zinc-800 pb-4"
          >
            <h3 className="font-bold text-lg">{stock.ticker}</h3>

            <p>Price: ${stock.price}</p>
            <p>Change: {stock.change}</p>
            <p>Pattern: {stock.pattern}</p>
            <p>Trigger: ${stock.trigger}</p>
            <p>Support: ${stock.support}</p>

            <p className="mt-2 text-green-400 font-bold">
              TWIZTED AI SCORE: {score}/100
            </p>

          </div>
        );
      })}
    </div>
  );
}