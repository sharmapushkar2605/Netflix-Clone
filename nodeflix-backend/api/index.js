const router = require("express").Router();
router.use("/auth", require("./auth"));
router.use("/movies", require("./movies"));
module.exports = router;
