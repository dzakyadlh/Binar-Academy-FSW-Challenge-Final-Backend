const router = require("express").Router();
const gameDetail = require("../controllers/gameDetailController");

router.get("/get", gameDetail.get);
router.post("/create", gameDetail.createGameDetail);
router.put("/update", gameDetail.updateGameDetail);

module.exports = router;
