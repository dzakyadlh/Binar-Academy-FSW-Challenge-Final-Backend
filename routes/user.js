const router = require("express").Router();
const user = require("../controllers/userController");

router.post("/findall", user.showAll)
router.post("/findId/:id", user.findId)
router.put("/deleteacc", user.deleteacc)

module.exports = router;