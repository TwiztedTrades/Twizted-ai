import { getMarketData } from "@twizted/market-data";
import {
  analyzeTrade,
  calculateTarget,
} from "@twizted/ai-engine";

export default function BattleCard() {
  const stock = getMarketData()[0];

  const entry = stock.trigger;
  const stop = stock.support;

  // TARGET ENGINE
  const target = calculateTarget({
    entry,
    stop,
    minimumRiskReward: 2,
  });

  const trade = analyzeTrade({
    ticker: stock.ticker,
    pattern: stock.patternScore,
    momentum: stock.momentum,
    volume: stock.volume,
    risk: stock.risk,
    entry,
    stop,
    target: target.target,
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
        Risk Quality: {stock.risk}
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
        Entry: ${entry}
      </p>

      <p>
        Stop: ${stop}
      </p>

      <p>
        Target: ${target.target}
      </p>

      <p>
        Risk / Reward: {target.riskReward.toFixed(2)}:1
      </p>

      <p className="mt-2 text-emerald-400 font-bold">
        {trade.signal}
      </p>

    </div>
  );
}
