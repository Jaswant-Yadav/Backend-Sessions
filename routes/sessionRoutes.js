const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
} = require("../controllers/sessionController");

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", auth, getMySessions);
router.get("/my-sessions/:id", auth, getMySessionById);
router.post("/my-sessions/save-draft", auth, saveDraft);
router.post("/my-sessions/publish", auth, publishSession);

module.exports = router;
