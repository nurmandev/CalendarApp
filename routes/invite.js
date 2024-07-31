const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  inviteUser,
  rsvp,
  sendInvitation,
} = require("../controllers/inviteController");

// Invite users to an event
router.post("/:id/invite", requireAuth, inviteUser);

// RSVP to an event
router.post("/:id/rsvp", requireAuth, rsvp);

// Route to send an invitation (calendar or event)
router.post("/send-invitation", sendInvitation);

module.exports = router;
