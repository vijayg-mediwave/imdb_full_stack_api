const expres = require("express");
const db = require("../models");
const { checkForUser } = require("../middlewares/auth.middleware");
const router = expres.Router();

router.post("/", checkForUser, async (req, res, next) => {
  try {
    const ratingPayload = {
      ...req.body,
      createdByUser: res.locals.user,
    };
    const ratingData = await db.rating.create(ratingPayload);
    res.status(201).send(ratingData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
