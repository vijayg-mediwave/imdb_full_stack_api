const express = require("express");
const env = require("dotenv");
const db = require("./models/index");
const userRouterControllerc = require("./controllers/users.routerController");
const app = express();

env.config();

app.use(express.json());

//ROUTER MIDDLEWARE
app.use("/movies", userRouterControllerc);

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
  return res.status(500).send({
    message: "internal server error",
  });
});

//DB CONNECTION
const dbConnect = async () => {
  try {
    await db.sequelize.sync(
      { force: false },
      console.log({
        message: "db connected successfully",
      })
    );
  } catch (error) {
    console.log(error);
  }
};
dbConnect();

//PATH NOT FOUND
app.use((req, res, next) => {
  return res.status(404).send({
    message: "Router Not Found",
  });
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(`app is not running${err}`);
  } else {
    console.log(`app running successfully on ${process.env.PORT}`);
  }
});
