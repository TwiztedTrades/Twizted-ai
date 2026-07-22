export default function BattleCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-bold">
        🤖 AI Battle Card
      </h2>

      <div className="mt-4 space-y-2 text-gray-300">

        <p className="text-red-400 font-bold">
          HOOD
        </p>

        <p>
          Setup: Falling Wedge
        </p>

        <p>
          Trigger: Break $69.50
        </p>

        <p>
          Risk: Below $67
        </p>

        <p className="text-green-400 font-bold">
          AI Score: 82/100
        </p>

      </div>

    </div>
  );
}