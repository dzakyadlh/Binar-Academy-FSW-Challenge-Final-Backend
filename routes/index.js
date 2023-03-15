var express = require("express");
var router = express.Router();

const gamesRouter = require("./games");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/games", gamesRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
