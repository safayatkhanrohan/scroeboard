const express = require("express");
const router = express.Router();

const {
  rootController,
  setupGetController,
  setupPostController,
  displayController,
  currentTeamController,
  scoreController,
  wicketController,
  oversController,
  liveController,
} = require("../controllers/controller");

router.get("/", rootController);
router.post("/current-team", currentTeamController);

router.get("/display", (req, res) => {
  res.send("display");
});

router.get("/score", displayController);

router.get("/setup", setupGetController);
router.post("/setup", setupPostController);
router.get("/live", liveController);

// for updating
router.post("/score", scoreController);
router.post("/wicket", wicketController);
router.post("/over", oversController);

module.exports = router;
