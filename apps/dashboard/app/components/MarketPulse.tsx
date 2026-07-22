export default function MarketPulse() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-bold">
        📈 Market Pulse
      </h2>

      <div className="mt-4 space-y-2 text-gray-300">
        <p>
          SPY 🟢 +0.42%
        </p>

        <p>
          QQQ 🟢 +0.61%
        </p>

        <p>
          VIX 🟡 16.2
        </p>

        <p>
          BTC 🟢 +1.12%
        </p>
      </div>
    </div>
  );
}