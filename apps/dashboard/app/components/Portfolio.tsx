export default function Portfolio() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

      <h2 className="text-xl font-bold">
        💰 Portfolio
      </h2>

      <div className="mt-4 space-y-2 text-gray-300">

        <p>
          Account Value: <span className="text-green-400">$5,200</span>
        </p>

        <p>
          Positions: 18
        </p>

        <p>
          Monthly Contribution: $400
        </p>

        <p>
          Dividend Goal: $1,000/month
        </p>

        <p>
          Mission: Build Wealth Machine
        </p>

      </div>

    </div>
  );
}