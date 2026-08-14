import MarketPulse from "./components/MarketPulse";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import BattleCard from "./components/BattleCard";
import Scanner from "./components/Scanner";
import Portfolio from "./components/Portfolio";
import TopTrade from "./components/TopTrade";

import { runScanner } from "@twizted/scanner";

export default function Home() {

  const scannerResults = runScanner();

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <Header />

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <MarketPulse />

        <TopTrade trade={scannerResults.topTrade} />

        <Watchlist />

        <BattleCard />

        <Scanner results={scannerResults} />

        <Portfolio />

      </div>

    </main>
  );
}
