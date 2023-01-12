const express = require("express");
const app = express();

app.listen(4567, (err) => {
  if (err) {
    console.log(`app is not running${err}`);
  } else {
    console.log(`app running successfully`);
  }
});
