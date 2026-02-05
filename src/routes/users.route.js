const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/view", controller.getUsersHandler);
router.get("/view/create", controller.renderCreateUser);
router.get("/view/edit/:id", controller.renderEditUser);

router.get("/", controller.getUsersHandler);
router.get("/:id", controller.getUserByIdHandler);
router.post("/", controller.createUserHandler);
router.get("/:id/bookings", controller.getUserBookingsHandler);
router.get("/owner/:id/bookings", controller.getOwnerBookingsHandler);

module.exports = router;
