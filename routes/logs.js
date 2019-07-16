const express = require("express");
const router = express.Router();

const Log = require("../models/Log");

// @route       GET api/logs
// @desc        Get logs from database
// @access      Public
router.get("/", async (req, res) => {
  const logs = await Log.find()
    .select("-__v");

  res.json(logs);
});

// @route       POST api/logs
// @desc        Add new log to database
// @access      Public
router.post("/", (req, res) => {
  const { message, attention, tech, date } = req.body;

  try {
    let log = new Log({
      message,
      attention,
      tech,
      date
    });

    log.save();

    // Send the log to client
    res.send(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/logs/:id
// @desc        Delete log from database
// @access      Public
router.delete("/:id", async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log deleted" });
  } catch (err) {
    console.error(err.message);
    res, status(500).send("Server error");
  }
});

// @route       PUT api/logs/:id
// @desc        Update log on database
// @access      Public
router.put("/:id", async (req, res) => {
  const { id, message, attention, tech, date } = req.body;

  // Build logs object
  const logFields = {};
  if (id) logFields.id = id;
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;
  if (date) logFields.date = date;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
    // res.send(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;