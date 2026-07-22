export default function Header() {
  return (
    <header className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
      <h1 className="text-4xl font-bold text-red-500">
        ⚡ TWIZTED AI
      </h1>

      <p className="text-gray-400 mt-2">
        Trading Command Center v0.2
      </p>

      <div className="mt-4 inline-flex items-center gap-2">
        <span className="text-green-400">
          🟢
        </span>

        <span>
          Market Status: OPEN
        </span>
      </div>
    </header>
  );
}