const router = require("express").Router();
const gameList = require("../controllers/gameListController");

router.get("/", gameList.get);
router.post("/", gameList.createGame);
router.put("/", gameList.updateGame);

module.exports = router;
