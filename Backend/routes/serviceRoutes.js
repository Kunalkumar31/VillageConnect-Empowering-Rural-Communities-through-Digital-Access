const express = require("express");
const router = express.Router();
const { getAll, create } = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.get("/", getAll);
router.post("/", auth, create);

module.exports = router;
