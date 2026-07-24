import { getMarketData } from "@twizted/market-data";
import { analyzeTrade } from "@twizted/ai-engine";

export default function BattleCard() {
  const stock = getMarketData()[0];

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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-bold">
        🤖 AI Battle Card
      </h2>

      <p className="mt-4 font-bold text-lg">
        {trade.ticker}
      </p>

      <p>
        Pattern: {stock.patternScore}
      </p>

      <p>
        Momentum: {stock.momentum}
      </p>

      <p>
        Volume: {stock.volume}
      </p>

      <p>
        Risk: {stock.risk}
      </p>

      <p className="mt-4 text-green-400 font-bold">
        TWIZTED AI SCORE: {trade.score}/100
      </p>

      <p>
        Grade: {trade.grade}
      </p>

      <p>
        Confidence: {trade.confidence}%
      </p>

      <p>
        Entry: ${trade.entry}
      </p>

      <p>
        Stop: ${trade.stop}
      </p>

      <p>
        Target: ${trade.target}
      </p>

      <p>
        Risk / Reward: {trade.riskReward}:1
      </p>

      <p className="mt-2 text-emerald-400 font-bold">
        {trade.signal}
      </p>

    </div>
  );
}