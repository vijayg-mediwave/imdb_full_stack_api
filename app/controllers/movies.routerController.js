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

router.get("/", async (req, res, next) => {
  try {
    const movieData = await db.movie.findAll({});
    res.status(200).send(movieData);
  } catch (error) {
    return next(error);
  }
});

router.get("/:movieId", async (req, res, next) => {
  //console.log(req.params.movieId);
  try {
    const oneMovieData = await db.movie.findAll({
      where: {
        id: req.params.movieId,
      },
      include: [
        {
          model: db.user,
          as: "createdUserInfo",
        },
      ],
    });
    //console.log(oneMovieData);
    res.status(200).send(oneMovieData);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log("body ", req.body);

    const editedValue = await db.movie.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(editedValue);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
