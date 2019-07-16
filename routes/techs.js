const express = require("express");
const router = express.Router();

const Tech = require("../models/Tech");

// @route       GET api/techs
// @desc        Get techs from database
// @access      Public
router.get("/", async (req, res) => {
  const techs = await Tech.find()
    .select("-date")
    .select("-__v");
  res.json(techs);
});

// @route       POST api/techs
// @desc        Add technician to database
// @access      Public
router.post("/", (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    let tech = new Tech({
      firstName,
      lastName
    });

    tech.save();

    res.send(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/techs/:id
// @desc        Delete tech from database
// @access      Public
router.delete("/:id", async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: "Tech not found" });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: "Tech removed" });
  } catch (err) {
    console.error(err.message);
    res, status(500).send("Server error");
  }
});

module.exports = router;