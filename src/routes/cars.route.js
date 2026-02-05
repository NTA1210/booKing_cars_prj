const router = require("express").Router();
const controller = require("../controllers/car.controller");

router.get("/view", controller.getCarsHandler);
router.get("/view/create", controller.renderCreateCar);
router.get("/view/edit/:id", controller.renderEditCar);

router.get("/", controller.getCarsHandler);
router.get("/:id", controller.getCarByIdHandler);
router.post("/", controller.createCarHandler);
router.put("/:id", controller.updateCarHandler);
router.delete("/:id", controller.deleteCarHandler);

module.exports = router;
