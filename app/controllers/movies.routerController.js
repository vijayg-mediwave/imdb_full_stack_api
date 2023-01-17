const express = require("express");
const db = require("../models/index");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const postedData = await db.movie.create({
      ...req.body,
    });
    res.status(400).send(postedData);
    //console.log(postedData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
