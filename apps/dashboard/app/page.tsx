export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-red-500">
        ⚡ TWIZTED AI
      </h1>

      <p className="mt-2 text-gray-400">
        Trading Command Center v0.1
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            📈 Market Pulse
          </h2>
          <p className="mt-4">SPY 🟢 +0.42%</p>
          <p>QQQ 🟢 +0.61%</p>
          <p>VIX 🟡 16.2</p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            🔥 Watchlist
          </h2>
          <p className="mt-4">HOOD</p>
          <p>NVDA</p>
          <p>AMZN</p>
          <p>AAPL</p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-xl font-bold">
            🤖 AI Battle Card
          </h2>
          <p className="mt-4 text-gray-300">
            HOOD:
            <br />
            Falling wedge setup forming.
            Watching breakout levels.
          </p>
        </div>

      </div>
    </main>
  );
}