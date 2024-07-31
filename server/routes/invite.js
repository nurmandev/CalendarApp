const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { inviteUser, rsvp } = require("../controllers/inviteController");

// Invite users to an event
router.post("/:id/invite", requireAuth, inviteUser);

// RSVP to an event
router.post("/:id/rsvp", requireAuth, rsvp);

module.exports = router;
