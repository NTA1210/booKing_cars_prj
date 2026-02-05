const availabilityScheduleChecking = (carId, startTime, endTime, bookings) => {
  const sTime = new Date(startTime);
  const eTime = new Date(endTime);

  for (const booking of bookings) {
    const s = new Date(booking.startTime);
    const e = new Date(booking.endTime);

    if (booking.carId.toString() === carId.toString()) {
      const isOverlap = !(sTime >= e || eTime <= s);

      if (isOverlap) {
        return false;
      }
    }
  }

  return true;
};

module.exports = availabilityScheduleChecking;
