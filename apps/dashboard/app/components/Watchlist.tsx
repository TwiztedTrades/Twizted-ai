const watchlist = [
  {
    ticker: "HOOD",
    pattern: "Falling Wedge",
    trigger: "$69.50",
    score: 82,
  },
  {
    ticker: "NVDA",
    pattern: "Breakout Watch",
    trigger: "$180",
    score: 76,
  },
  {
    ticker: "AMZN",
    pattern: "Base Formation",
    trigger: "$250",
    score: 79,
  },
];

export default function Watchlist() {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-xl font-bold">🔥 Watchlist</h2>

      {watchlist.map((stock) => (
        <div
          key={stock.ticker}
          className="mt-4 border-b border-zinc-800 pb-4"
        >
          <h3 className="font-bold text-lg">{stock.ticker}</h3>

          <p>Pattern: {stock.pattern}</p>

          <p>Trigger: {stock.trigger}</p>

          <p className="text-green-400">
            AI Score: {stock.score}/100
          </p>
        </div>
      ))}
    </div>
  );
}