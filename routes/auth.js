const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/register", auth.register)
router.post("/login", auth.login)
router.put("/forgotpass", auth.forgotpassword)

module.exports = router;