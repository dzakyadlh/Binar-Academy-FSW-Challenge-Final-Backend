const router = require("express").Router();
const games = require("../controllers/gamesController");

router.get("/", games.get);
router.get("/detail/:id", games.getDetail);
router.post("/", games.createGame);
router.put("/", games.updateGame);
router.delete("/:id", games.deleteGame);

module.exports = router;
