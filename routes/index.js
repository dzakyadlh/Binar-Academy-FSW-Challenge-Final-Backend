var express = require("express");
var router = express.Router();

const gameListRouter = require("./gameList");
const gameDetailRouter = require("./gameDetail");

router.use("/gamelist", gameListRouter);
router.use("/gamedetail", gameDetailRouter);

module.exports = router;
