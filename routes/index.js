var express = require("express");
var router = express.Router();

const gameListRouter = require("./gameList");
const gameDetailRouter = require("./gameDetail");
const authRouter = require("./auth")
const userRouter = require("./user")

router.use("/gamelist", gameListRouter);
router.use("/gamedetail", gameDetailRouter);
router.use("/auth", authRouter)
router.use("/user", userRouter)

module.exports = router;
