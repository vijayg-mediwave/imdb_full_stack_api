const joi = require("joi");

const movieSchema = joi.object().keys({
  name: joi.string().required(),
  genre: joi.string().required(),
  language: joi.string().required(),
  yearOfRelease: joi.number().required(),
});

const movieUpdateSchema = joi.object().keys({
  name: joi.string().optional(),
  genre: joi.string().optional(),
  language: joi.string().optional(),
  yearOfRelease: joi.number().optional(),
});

module.exports = {
  movieSchema,
  movieUpdateSchema,
};
