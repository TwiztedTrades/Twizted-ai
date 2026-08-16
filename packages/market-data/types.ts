export interface MarketData {
  ticker: string;

  price: number;
  change: string;

  pattern: string;

  trigger: number;
  support: number;

  patternScore: number;
  momentum: number;
  volume: number;
  risk: number;
}
