const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const app = express();

let urlMongo = "mongodb://localhost:27017/doommeter";

// if (process.env.NODE_ENV == "dev") {
//   urlMongo = "mongodb://localhost:27017/whitelabel";
// } else if (process.env.NODE_ENV == "ci") {
//   urlMongo = `mongodb://mongo-ci:27017/whitelabel`;
// } else {
//   urlMongo = `mongodb://mongo-prod:27017/whitelabel`;
// }

mongoose.connect(urlMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const QuestionController = require("./controllers/QuestionController");
const QuestionService = require("./services/QuestionService");
const QuestionInstance = new QuestionController(new QuestionService());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/question/create", (req, res) => {
  console.log(res);
  return QuestionInstance.create(req, res);
});

app.put("/question/update", (req, res) => {
  return QuestionInstance.modifyMood(req, res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
