"use strict";

const {
  oAuth2Client,
  calendar,
  SCOPES,
  CALENDAR_ID,
} = require("../models/googleCalendar");

const getAuthURL = async (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.status(200).json({
    authUrl,
  });
};

const getAccessToken = async (req, res) => {
  const code = decodeURIComponent(req.params.code);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCalendarEvents = async (req, res) => {
  const access_token = decodeURIComponent(req.params.access_token);
  oAuth2Client.setCredentials({ access_token });

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    res.status(200).json({ events: response.data.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAuthURL,
  getAccessToken,
  getCalendarEvents,
};
