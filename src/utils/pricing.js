const calculateRentalCost = (startDate, endDate, pricePerDay) => {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  const ONE_DAY = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(eDate - sDate);
  const diffDays = diffTime / ONE_DAY;

  return (diffDays * pricePerDay).toFixed(2);
};

module.exports = calculateRentalCost;
