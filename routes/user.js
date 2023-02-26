const router = require("express").Router();
const user = require("../controllers/userController");
const restrict = require("../middleware/restrict")

router.get("/findall", user.showAll)
router.get("/findId/:id", user.findId)
router.delete("/deleteacc",restrict, user.deleteacc)
router.put("/updateacc", restrict, user.userUpdate)

module.exports = router;