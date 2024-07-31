const Invitation = require("../models/invitation");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

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
