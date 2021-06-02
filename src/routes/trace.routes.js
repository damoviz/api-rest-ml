const { Router } = require("express")
const router = Router()
const controller = require("../controllers/trace.controller")

// @routes POST /trace
router.post("/", controller.trace)

module.exports = router;