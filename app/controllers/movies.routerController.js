const express = require("express");
const db = require("../models/index");
const { checkForUser } = require("../middlewares/auth.middleware");
const router = express.Router();

const validateSchema = require("../middlewares/validation.middleware");
const movieSchemas = require("../validations/movie.validation");

router.post(
  "/",
  checkForUser,
  validateSchema(movieSchemas.movieSchema),
  async (req, res, next) => {
    try {
      //BODY OF MOVIE PAYLOAD
      const moviePayload = {
        ...req.body,
        createdByUser: res.locals.user,
      };
      const newMovie = await db.movie.create(moviePayload);

      res.status(400).send(newMovie);
      //console.log(postedData);
    } catch (error) {
      return next(error);
    }
  }
);

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

router.put(
  "/:movieId",
  checkForUser,
  validateSchema(movieSchemas.movieUpdateSchema),
  async (req, res, next) => {
    try {
      console.log(res.locals.user);

      //console.log("body ", req.body);
      const movie = await db.movie.findOne({
        where: {
          id: req.params.movieId,
        },
      });

      if (!movie) {
        return res.status(404).send({
          msg: "movie not found",
        });
      }

      if (req.body.genre) {
        movie.genre = req.body.genre;
        //await movie.save();
        // await db.movie.update(req.body, {
        //   where: {
        //     id: req.params.movieId,
        //   },
        // });
      }

      if (req.body.name) {
        movie.name = req.body.name;
        //await movie.save();
      }

      if (req.body.language) {
        movie.language = req.body.language;
      }

      if (req.body.yearOfRelease) {
        movie.yearOfRelease = req.body.yearOfRelease;
      }

      if (req.body.createdByUser) {
        movie.createdByUser = req.body.createdByUser;
      }

      await movie.save();

      return res.send(movie);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/:movieId", checkForUser, async (req, res, next) => {
  try {
    const deleteCount = await db.movie.destroy({
      where: {
        id: req.params.movieId,
        createdByUser: res.locals.user,
      },
    });
    if (deleteCount === 0) {
      return res.status(404).send({
        msg: "movie not found",
      });
    }
    res.send({
      delete: deleteCount,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
