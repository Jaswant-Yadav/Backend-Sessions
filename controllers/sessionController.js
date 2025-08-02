const Session = require("../models/Session");

exports.getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

exports.getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.userId });
  res.json(sessions);
};

exports.getMySessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
  res.json(session);
};

exports.saveDraft = async (req, res) => {
  const { title, tags, json_file_url, sessionId } = req.body;

  const tagsArray =
    typeof tags === "string"
      ? tags.split(",").map((tag) => tag.trim())
      : Array.isArray(tags)
      ? tags.map((tag) => tag.trim())
      : [];

  const update = {
    title,
    tags: tagsArray,
    json_file_url,
    status: "draft",
    updated_at: Date.now(),
  };

  let session;
  if (sessionId) {
    session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.userId },
      update,
      { new: true }
    );
  } else {
    session = await Session.create({ ...update, user_id: req.userId });
  }

  res.json(session);
};


exports.publishSession = async (req, res) => {
  const { sessionId } = req.body;

  const session = await Session.findOneAndUpdate(
    { _id: sessionId, user_id: req.userId },
    { status: "published", updated_at: Date.now() },
    { new: true }
  );

  res.json(session);
};
