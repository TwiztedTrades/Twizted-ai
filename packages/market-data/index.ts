export function getMarketData() {
  return [
    {
      ticker: "HOOD",
      price: 68.75,
      change: "+1.8%",
      pattern: "Falling Wedge",
      trigger: 69.50,
      support: 65,

      patternScore: 85,
      momentum: 78,
      volume: 90,
      risk: 70,
    },

    {
      ticker: "NVDA",
      price: 176.20,
      change: "+0.9%",
      pattern: "Breakout Watch",
      trigger: 180,
      support: 175,

      patternScore: 80,
      momentum: 82,
      volume: 88,
      risk: 75,
    },

    {
      ticker: "AMZN",
      price: 248.50,
      change: "+0.6%",
      pattern: "Base Formation",
      trigger: 250,
      support: 245,

      patternScore: 78,
      momentum: 75,
      volume: 82,
      risk: 72,
    },
  ];
}