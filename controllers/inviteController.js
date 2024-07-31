const Invitation = require("../models/invitation");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/mailer");

exports.inviteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const newInvitation = new Invitation({
      event: req.params.id,
      invitee: user.id,
    });

    const invitation = await newInvitation.save();
    res.json(invitation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.rsvp = async (req, res) => {
  try {
    const invitation = await Invitation.findOne({
      event: req.params.id,
      invitee: req.user.id,
    });

    if (!invitation) {
      return res.status(404).json({ msg: "Invitation not found" });
    }

    invitation.status = "accepted";
    await invitation.save();

    res.json(invitation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.sendInvitation = async (req, res) => {
  const { email, type, details } = req.body;

  if (!email || !type || !details) {
    return res
      .status(400)
      .json({ error: "Email, type, and details are required" });
  }

  let subject;
  let message;

  switch (type) {
    case "calendar":
      subject = "You have been invited to view a calendar";
      message = `
        Hello,

        You have been invited to view the following calendar:
        
        ${details}

        Please add it to your calendar app to stay updated.

        Best regards,
        Calendar Team
      `;
      break;

    case "event":
      subject = "You are invited to an event!";
      message = `
        Hello,

        You are invited to the following event:

        ${details}

        We hope to see you there!

        Best regards,
        Event Organizer Team
      `;
      break;

    default:
      return res
        .status(400)
        .json({ error: 'Invalid type. Expected "calendar" or "event".' });
  }

  try {
    await sendEmail(email, subject, message);
    return res
      .status(200)
      .json({
        message: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } invitation sent successfully`,
      });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send invitation" });
  }
};
