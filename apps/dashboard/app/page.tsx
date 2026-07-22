import MarketPulse from "./components/MarketPulse";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import BattleCard from "./components/BattleCard";
import Portfolio from "./components/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">

      <Header />

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <MarketPulse />

        <Watchlist />

        <BattleCard />

        <Portfolio />

      </div>

    </main>
  );
}