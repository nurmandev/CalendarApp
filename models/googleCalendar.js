'use strict';

const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://sdncoss.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

const calendar = google.calendar("v3");

module.exports = {
  oAuth2Client,
  calendar,
  SCOPES,
  CALENDAR_ID
};
