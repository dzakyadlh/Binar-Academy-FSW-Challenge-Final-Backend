const router = require("express").Router();
const gameDetail = require("../controllers/gameDetailController");

router.get("/", gameDetail.get);
router.post("/", gameDetail.createGameDetail);
router.put("/", gameDetail.updateGameDetail);

module.exports = router;
