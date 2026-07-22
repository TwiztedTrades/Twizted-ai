import { calculateAIscore } from "@twizted/ai-engine";

export default function BattleCard() {

  const score = calculateAIscore({
    pattern: 85,
    momentum: 78,
    volume: 90,
    risk: 70,
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-bold">
        🤖 AI Battle Card
      </h2>

      <p className="mt-4 font-bold">
        HOOD
      </p>

      <p>
        Pattern: 85
      </p>

      <p>
        Momentum: 78
      </p>

      <p>
        Volume: 90
      </p>

      <p>
        Risk: 70
      </p>

      <p className="mt-4 text-green-400 font-bold">
        TWIZTED AI SCORE: {score}/100
      </p>

    </div>
  );
}