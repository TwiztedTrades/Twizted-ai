export function calculatePositionSize({

  accountSize,
  riskPercent,
  lossPerContract,

}: {

  accountSize: number;
  riskPercent: number;
  lossPerContract: number;

}) {

  const maxRisk =
    accountSize * (riskPercent / 100);

  const contracts = Math.floor(
    maxRisk / lossPerContract
  );

  return {

    accountSize,
    riskPercent,
    maxRisk,
    lossPerContract,
    contracts,

  };

}
