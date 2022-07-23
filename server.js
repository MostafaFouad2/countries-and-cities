const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const dbConfig = require("./app/config/db.config")
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Address application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Successfully connect to MongoDB ${dbConfig.DB}`);
  })
  .catch(err => {
    console.log("Connection error", err);
    process.exit();
  });

  app.use(require('./app/routes/auth.routes'));
  app.use(require('./app/routes/address.routes'));