const router = require("express").Router();
const games = require("../controllers/gamesController");

router.get("/", games.get);
router.get("/detail", games.getDetail);
router.post("/", games.createGame);
router.put("/", games.updateGame);

module.exports = router;
