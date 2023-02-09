var express = require("express");
var router = express.Router();

const gameListRouter = require("./gameList");
const gameDetailRouter = require("./gameDetail");
const authRouter = require("./auth")

router.use("/gamelist", gameListRouter);
router.use("/gamedetail", gameDetailRouter);
router.use("/auth", authRouter)

module.exports = router;
