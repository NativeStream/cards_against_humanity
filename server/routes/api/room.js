const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const RoomControoler = require("../../controllers/RoomController");

router.get("/", authMiddleware, RoomControoler.index);

router.post("/create/", authMiddleware, RoomControoler.create);
router.post("/destroy/", authMiddleware, RoomControoler.destroy);
router.post("/join/", authMiddleware, RoomControoler.join);
router.post("/leave/", authMiddleware, RoomControoler.leave);

module.exports = router;
