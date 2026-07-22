export default function Watchlist() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-bold">
        🔥 Watchlist
      </h2>

      <div className="mt-4 space-y-4">

        <div>
          <p className="font-bold text-red-400">
            HOOD
          </p>
          <p className="text-gray-400 text-sm">
            Pattern: Falling Wedge
          </p>
          <p className="text-gray-400 text-sm">
            Trigger: $69.50
          </p>
          <p className="text-green-400">
            AI Score: 82/100
          </p>
        </div>


        <div>
          <p className="font-bold text-red-400">
            NVDA
          </p>
          <p className="text-gray-400 text-sm">
            Pattern: Breakout Watch
          </p>
          <p className="text-gray-400 text-sm">
            Support: $175
          </p>
          <p className="text-green-400">
            AI Score: 76/100
          </p>
        </div>


        <div>
          <p className="font-bold text-red-400">
            AMZN
          </p>
          <p className="text-gray-400 text-sm">
            Pattern: Base Formation
          </p>
          <p className="text-gray-400 text-sm">
            Key Level: $250
          </p>
          <p className="text-green-400">
            AI Score: 79/100
          </p>
        </div>


      </div>
    </div>
  );
}