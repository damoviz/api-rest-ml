const { Router } = require("express")
const router = Router()
const controller = require("../controllers/stats.controller")

// @routes GET /stats
router.get("/", controller.stats)

module.exports = router;