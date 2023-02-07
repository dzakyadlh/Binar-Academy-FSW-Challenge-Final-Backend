const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");
const createError = require("http-errors");
const session = require("express-session");
const flash = require("express-flash");

app.use(
  session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(5000, () => console.log(`listening at http://localhost:${5000}`));

module.exports = app;
