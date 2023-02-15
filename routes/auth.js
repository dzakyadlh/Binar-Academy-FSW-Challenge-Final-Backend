const router = require("express").Router();
const auth = require("../controllers/authController");

router.post("/register", auth.register)
router.post("/login", auth.login)
router.get("/findall", auth.showAll)
router.get("/findid/:id", auth.findId)
router.put("/forgotpass", auth.forgotpassword)
router.delete("/deleteacc", auth.deleteacc)

module.exports = router;