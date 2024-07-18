const mongoose = require("mongoose");

const InvitationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  invitee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Invitation", InvitationSchema);
