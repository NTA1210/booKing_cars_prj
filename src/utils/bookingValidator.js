const checkDate = (startTime = "", endTime = "") => {
  const sTime = new Date(startTime);
  const eTime = new Date(endTime);

  return !(sTime >= eTime);
};

const paramsValidator = ({ userId, carId, startTime, endTime }) => {
  if (!userId || !carId || !startTime || !endTime) {
    throw new Error("Missing parameters");
  }

  const sTime = new Date(startTime);
  const eTime = new Date(endTime);

  if (isNaN(sTime) || isNaN(eTime)) {
    throw new Error("Invalid date format");
  }

  if (!checkDate(startTime, endTime)) {
    throw new Error("Start time must be before end time");
  }

  if (eTime - sTime < 1000 * 3600) {
    throw new Error("Rental time must be at least 1 hour");
  }

  if (eTime - sTime > 1000 * 3600 * 24 * 3) {
    throw new Error("Rental time must be at most 3 days");
  }
  return { userId, carId, sTime, eTime };
};

module.exports = { paramsValidator, checkDate };
