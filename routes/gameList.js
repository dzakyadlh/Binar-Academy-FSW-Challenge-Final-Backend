const router = require("express").Router();
const gameList = require("../controllers/gameListController");

router.get("/get", gameList.get);
router.post("/create", gameList.createGame);
router.put("/update", gameList.updateGame);

module.exports = router;
