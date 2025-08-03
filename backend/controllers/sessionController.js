const Session = require('../models/Session');

exports.getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: 'published' });
  res.json(sessions);
};

exports.getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
};

exports.getSessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ msg: 'Session not found' });
  res.json(session);
};

exports.saveDraft = async (req, res) => {
  const { title, tags, json_file_url } = req.body;
  let session = await Session.findOne({ user_id: req.user.id, status: 'draft', title });

  if (session) {
    session.tags = tags;
    session.json_file_url = json_file_url;
    session.updated_at = Date.now();
    await session.save();
  } else {
    session = new Session({ user_id: req.user.id, title, tags, json_file_url, status: 'draft' });
    await session.save();
  }
  
  res.json(session);
};

exports.publishSession = async (req, res) => {
  const { title, tags, json_file_url } = req.body;
  const session = new Session({ user_id: req.user.id, title, tags, json_file_url, status: 'published' });
  await session.save();
  res.json(session);
};
