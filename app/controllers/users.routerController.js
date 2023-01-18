const express = require("express");
const db = require("../models");
const argon2 = require("argon2");
router = express.Router();
const { makeJWT } = require("../utils");
const validateSchema = require("../middlewares/validation.middleware");
const userSchemas = require("../validations/user.validation");

router.post(
  "/login",
  validateSchema(userSchemas.userSchema),
  async (req, res, next) => {
    try {
      const user = await db.user.findOne({
        where: {
          name: req.body.name,
        },
        attributes: ["id", "password", "name"],
      });
      if (!user) {
        return res.status(403).send({
          msg: "user is not present",
        });
      }
      //CAMEPARE PASSWORD
      const passwordOk = await argon2.verify(user.password, req.body.password);

      if (!passwordOk) {
        return res.status(403).send({
          msg: "user credntials invalid",
        });
      }

      const token = makeJWT({
        user: user.id,
      });

      // const postedData = await db.user.create({
      //   ...req.body,
      // });
      res.status(400).send({
        token,
      });
      //console.log(postedData);
    } catch (error) {
      return next(error);
    }
  }
);

router.post("/signup", async (req, res, next) => {
  try {
    //check if the userName is taken
    const userNameTaken = await db.user.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (userNameTaken) {
      return res.status(201).send({
        msg: "username already exist",
      });
    }
    //PASSWORD HASH
    const passwordHash = await argon2.hash(req.body.password);

    //PASSWORD VERIFICATION
    const passwordSame = await argon2.verify(passwordHash, req.body.password);

    const userPaylad = {
      name: req.body.name,
      password: passwordHash,
    };

    const newUser = await db.user.create(userPaylad);
    return res.status(400).send({
      id: newUser.id,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const getData = await db.user.findAll({});
    res.status(200).send(getData);
  } catch (error) {
    return next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const getDataById = await db.user.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(getDataById);
  } catch (error) {
    return next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const editedValue = await db.user.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(editedValue);
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "one item is deleted",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
