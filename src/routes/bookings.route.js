const router = require("express").Router();
const controller = require("../controllers/booking.controller");

router.get("/view", controller.getBookingsHandler);
router.get("/view/create", controller.renderCreateBooking);

router.get("/", controller.getBookingsHandler);
router.get("/:id", controller.getBookingByIdHandler);
router.post("/", controller.createBookingHandler);
router.put("/:id", controller.confirmBookingHandler);
router.get("/admin/bookings/summary", controller.getBookingSummaryHandler);

module.exports = router;
