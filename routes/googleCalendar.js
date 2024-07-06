"use strict";

const express = require("express");
const router = express.Router();
const googleCalendarController = require("../controllers/googleCalendarController");

router.get("/auth-url", googleCalendarController.getAuthURL);
router.get("/access-token/:code", googleCalendarController.getAccessToken);
router.get("/events/:access_token", googleCalendarController.getCalendarEvents);

module.exports = router;
