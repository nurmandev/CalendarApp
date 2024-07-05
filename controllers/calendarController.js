// controllers/calendarController.js
const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");

const authGoogle = (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
};

const authGoogleCallback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send("Authentication successful! You can now close this window.");
};

const syncCalendar = async (req, res) => {
  oauth2Client.setCredentials(req.body.tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  res.json(events.data.items);
};

module.exports = {
  authGoogle,
  authGoogleCallback,
  syncCalendar,
};
